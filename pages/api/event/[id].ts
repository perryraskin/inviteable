import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../middleware/prismaClient"
import { User } from "@prisma/client"
import auth from "../../../middleware/auth"
import { GuestResponse } from "../../../models/interfaces"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, inviteCode, ssr }
  } = req

  const eventId = id as unknown
  const eventIdString = eventId as string
  if (req.method === "GET") {
    try {
      const event = await prisma.event.findUnique({
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

      // only return title and image for URL preview
      if (ssr) {
        res.status(200)
        res.json({
          authorized: true,
          event: {
            title: event.title,
            imageUrl: event.imageUrl
          }
        })
      }
      // if no userId, event has not been claimed (and has only a title)
      else if (!event.userId || event.id === 1) {
        console.log(event)
        res.status(200)
        res.json({ authorized: true, event })
      }
      // otherwise, check for logged-in host or guest
      else {
        const userAuth = await auth(req, res)
        const user = userAuth as User
        // console.log(user)

        const isGuest = event.Guests
          ? event.Guests.some(g => g.userId === user.id && g.isHost === false)
          : false

        const isHost =
          event.userId === user.id ||
          (event.Guests
            ? event.Guests.some(g => g.userId === user.id && g.isHost === true)
            : false)
        // console.log(event.Host, user)
        if (isHost || isGuest) {
          res.status(200)
          res.json({ authorized: true, event })
        } else if (
          user.id > 0 &&
          inviteCode &&
          inviteCode === event.Invites[0].code
        ) {
          console.log(inviteCode, event.Invites[0].code)
          let guest = await prisma.guest.findFirst({
            where: {
              eventId: parseInt(eventIdString),
              userId: user.id
            }
          })
          if (!guest) {
            guest = await prisma.guest.create({
              data: {
                userId: user.id,
                eventId: parseInt(eventIdString)
              }
            })
          }
          res.status(200)
          res.json({ authorized: true, event, guest })
        } else {
          // console.log("Not authorized to view event")
          res.status(401)
          res.json({ authorized: false })
        }
      }
    } catch (err) {
      res.status(500)
      res.json({ authorized: false, error: err.message })
    }
  }
  // UPDATE
  else if (req.method === "PUT") {
    const userAuth = await auth(req, res)
    const user = userAuth as User

    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(eventIdString)
      },
      include: {
        Address: true,
        Host: true,
        Guests: true
      }
    })

    const isHost =
      event.userId === user.id ||
      (event.Guests
        ? event.Guests.some(g => g.userId === user.id && g.isHost === true)
        : false)
    if (event.userId && !isHost) {
      res.status(401)
      res.json({ authorized: false })
    }
    // Claim the un-claimed event
    else if (!event.userId) {
      const eventResponse = await prisma.event.update({
        where: {
          id: parseInt(eventIdString)
        },
        data: {
          userId: user.id
        }
      })

      const guestResponse = await prisma.guest.create({
        data: {
          userId: user.id,
          eventId: parseInt(eventIdString),
          isHost: true,
          response: GuestResponse.Accepted
        }
      })

      res.json({ authorized: true, eventResponse, guestResponse })
    }
    // Only update if authenticated
    else {
      const { event } = req.body
      const {
        title,
        dateTimeStart,
        dateTimeEnd,
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
        detailsText,
        detailsHtml
      } = event
      try {
        const eventResponse = await prisma.event.update({
          where: {
            id: parseInt(eventIdString)
          },
          data: {
            title: title ?? undefined,
            dateTimeStart: dateTimeStart ? new Date(dateTimeStart) : undefined,
            dateTimeEnd: dateTimeEnd ? new Date(dateTimeEnd) : undefined,
            price: price ? parseFloat(price) : undefined,
            imageUrl: imageUrl ?? undefined,
            detailsText: detailsText ?? undefined,
            detailsHtml: detailsHtml ?? undefined
          }
        })

        const addressResponse = await prisma.address.update({
          where: {
            id: event.Address[0].id
          },
          data: {
            locationName,
            latitude,
            longitude,
            address1,
            address2,
            city,
            state,
            zip,
            country
          }
        })

        res.json({ authorized: true, eventResponse, addressResponse })
      } catch (err) {
        res.status(500)
        res.json({ error: err.message })
      }
    }
  }
}
