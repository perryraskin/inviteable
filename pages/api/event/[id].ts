import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../middleware/prismaClient"
import { EventAccess, GuestResponse } from "../../../models/interfaces"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { getAuth } from "@clerk/nextjs/server"
dayjs.extend(utc)
dayjs.extend(timezone)

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, inviteCode, ssr }
  } = req

  // console.log("ssr:", ssr)
  const eventId = id as unknown
  const eventIdString = eventId as string
  let event
  if (req.method === "GET") {
    try {
      event = await prisma.event.findUnique({
        where: {
          id: parseInt(eventIdString)
        },
        include: {
          Host: true,
          Address: true,
          Guests: {
            include: {
              User: true
            }
          },
          Settings: true,
          Invites: true
        }
      })

      if (!event) {
        return res.status(404).json({
          code: 404,
          error: "Event not found",
          event: {
            title: "Not found"
          }
        })
        return
      }

      const eventInvite = await prisma.eventInvite.findFirst({
        where: {
          eventId: parseInt(eventIdString),
          code: (inviteCode as unknown) as string
        }
      })

      // only return title and image for URL preview
      // if event is public
      if (ssr && event.Settings.access === EventAccess.Public) {
        // console.log("SSR & event is public")
        res.status(200)
        res.json({
          authorized: true,
          event: {
            id: event.id,
            access: event.Settings.access,
            title: event.title,
            imageUrl: event.imageUrl,
            designImageUrl: event.designImageUrl
          }
        })
      }
      // or if invite code is valid
      else if (ssr && eventInvite) {
        // console.log("SSR & event is private")
        return res.status(200).json({
          authorized: true,
          event: {
            id: event.id,
            access: event.Settings.access,
            title: event.title,
            imageUrl: event.imageUrl,
            designImageUrl: event.designImageUrl
          }
        })
      }
      // if no userId, event has not been claimed (and has only a title)
      else if (!event.clerkUserId || event.id === 1000001) {
        console.log(event)
        return res.status(200).json({ authorized: true, event })
      }
      // otherwise, check for logged-in host or guest
      else {
        const { userId } = getAuth(req)
        // console.log(user)

        const isGuest = event.Guests
          ? event.Guests.some(
              g => g.clerkUserId === userId && g.isHost === false
            )
          : false

        const isHost =
          event.clerkUserId === userId ||
          (event.Guests
            ? event.Guests.some(
                g => g.clerkUserId === userId && g.isHost === true
              )
            : false)
        // console.log(event.Host, user)
        // if host or guest or event is public, return event
        if (isHost || isGuest || event.Settings.access === EventAccess.Public) {
          return res.status(200).json({ authorized: true, event })
        }
        // if not host or guest, check for invite code
        else if (userId && inviteCode && inviteCode === event.Invites[0].code) {
          console.log(inviteCode, event.Invites[0].code)
          let guest = await prisma.guest.findFirst({
            where: {
              eventId: parseInt(eventIdString),
              clerkUserId: userId
            }
          })
          if (!guest) {
            guest = await prisma.guest.create({
              data: {
                clerkUserId: userId,
                eventId: parseInt(eventIdString)
              }
            })
          }

          const updatedEvent = await prisma.event.findUnique({
            where: {
              id: parseInt(eventIdString)
            },
            include: {
              Host: true,
              Address: true,
              Guests: {
                include: {
                  User: true
                }
              },
              Settings: true,
              Invites: true
            }
          })

          return res
            .status(200)
            .json({ authorized: true, event: updatedEvent, guest })
        } else {
          // console.log("Not authorized to view event")
          return res.status(401).json({ authorized: false })
        }
      }
    } catch (err) {
      return res.status(500).json({ authorized: false, error: err.message })
    }
  }
  // UPDATE
  else if (req.method === "PUT") {
    const { userId } = getAuth(req)

    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(eventIdString)
      },
      include: {
        Address: true,
        Host: true,
        Guests: true,
        Settings: true
      }
    })

    const isHost =
      event.clerkUserId === userId ||
      (event.Guests
        ? event.Guests.some(g => g.clerkUserId === userId && g.isHost === true)
        : false)

    const isGuest = event.Guests
      ? event.Guests.some(g => g.clerkUserId === userId)
      : false

    // Record new guest response
    if (!isGuest && event.Settings.access === EventAccess.Public) {
      const response = req.body.response as GuestResponse
      const guestResponse = await prisma.guest.create({
        data: {
          clerkUserId: userId,
          eventId: parseInt(eventIdString),
          isHost: false,
          response
        }
      })

      return res.status(200).json({ authorized: true, guestResponse })
    }
    // Not authorized to update event if not host
    else if (event.clerkUserId && !isHost) {
      res.status(401)
      res.json({ authorized: false })
    }
    // Claim the un-claimed event
    else if (!event.clerkUserId) {
      const eventResponse = await prisma.event.update({
        where: {
          id: parseInt(eventIdString)
        },
        data: {
          clerkUserId: userId
        }
      })

      const guestResponse = await prisma.guest.create({
        data: {
          clerkUserId: userId,
          eventId: parseInt(eventIdString),
          isHost: true,
          response: GuestResponse.Accepted
        }
      })

      res.json({ authorized: true, eventResponse, guestResponse })
    }
    // Only update if authenticated
    else {
      const { event: eventRequest } = req.body
      const {
        title,
        dateTimeStart,
        dateTimeEnd,
        timeZone,
        locationName,
        latitude,
        longitude,
        address1,
        address2,
        city,
        state,
        zip,
        country,
        price,
        imageUrl,
        designImageUrl,
        detailsText,
        detailsHtml,
        eventAccess,
        showGuestList,
        allowComments,
        locationUrl
      } = eventRequest
      try {
        // only allow hosts to update event settings
        if (eventAccess || showGuestList || allowComments) {
          if (!isHost) {
            res.status(401)
            res.json({ authorized: false })
            return
          }
        }

        // console.log(eventRequest)
        // console.log(timeZone, dateTimeStart)
        // console.log(dayjs(dateTimeStart).tz(timeZone))
        const eventResponse = await prisma.event.update({
          where: {
            id: parseInt(eventIdString)
          },
          data: {
            title: title ?? undefined,
            dateTimeStart: dateTimeStart
              ? dayjs(dateTimeStart).toISOString()
              : undefined,
            // dateTimeEnd: dateTimeEnd ? new Date(dateTimeEnd) : undefined,
            dateTimeEnd: dateTimeStart
              ? dayjs(dateTimeStart)
                  .add(2, "hour")
                  .toISOString()
              : undefined,
            price: price ? parseFloat(price) : undefined,
            imageUrl: imageUrl ?? undefined,
            designImageUrl: designImageUrl ?? undefined,
            detailsText: detailsText ?? undefined,
            detailsHtml: detailsHtml ?? undefined,
            timeZone,
            locationUrl: locationUrl ?? undefined
          }
        })

        let addressResponse

        if (latitude && longitude) {
          addressResponse = await prisma.address.update({
            where: {
              id: event.Address[0].id
            },
            data: {
              locationName: locationName ?? undefined,
              latitude: latitude ? parseFloat(latitude) : undefined,
              longitude: longitude ? parseFloat(longitude) : undefined,
              address1: address1 ? address1 : null,
              address2: address2 ? address2 : null,
              city: city ?? null,
              state: state ?? null,
              zip: zip ?? null,
              country: country ?? null
            }
          })
        } else {
          addressResponse = await prisma.address.update({
            where: {
              id: event.Address[0].id
            },
            data: {
              locationName,
              address2
            }
          })
        }

        const settingsResponse = await prisma.eventSettings.update({
          where: {
            eventId: parseInt(eventIdString)
          },
          data: {
            access: Number.isInteger(eventAccess)
              ? parseInt(eventAccess)
              : undefined,
            showGuestList,
            allowComments
          }
        })

        return res.json({
          authorized: true,
          eventResponse,
          addressResponse,
          settingsResponse
        })
      } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
      }
    }
  }
}
