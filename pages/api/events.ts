import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../middleware/prismaClient"
import auth from "../../middleware/auth"
import { v4 as uuidv4 } from "uuid"
import { EventAccess, GuestResponse } from "../../models/interfaces"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)

export default async function(req: NextApiRequest, res: NextApiResponse) {
  // const userAuth = await auth(req, res)
  // const userUnknown = userAuth as unknown
  // const user = userUnknown as User

  const {
    method,
    body: { event }
  } = req
  const { userId, title } = event
  const userIdString = (userId as unknown) as string
  const userIdInt = parseInt(userIdString)

  const inviteCode = uuidv4()

  try {
    switch (method) {
      case "GET":
        break
      case "PUT":
        break

      case "POST":
        console.log(req.body)

        let eventData = {
          data: {
            userId: userIdInt,
            title,
            imageUrl: "https://source.unsplash.com/1600x900/?celebration",
            detailsText: "Join us for a celebration!",
            detailsHtml: "<p>Join us for a celebration!</p>",
            dateTimeStart: new Date(
              dayjs()
                .add(1, "day")
                .format("YYYY-MM-DD") + "T20:00:00.000Z"
            ),
            dateTimeEnd: new Date(
              dayjs()
                .add(1, "day")
                .format("YYYY-MM-DD") + "T22:00:00.000Z"
            )
          }
        }

        if (!userId) {
          eventData = {
            data: {
              userId: undefined,
              title,
              imageUrl: "https://source.unsplash.com/1600x900/?celebration",
              detailsText: "Join us for a celebration!",
              detailsHtml: "<p>Join us for a celebration!</p>",
              dateTimeStart: new Date(
                dayjs()
                  .add(1, "day")
                  .format("YYYY-MM-DD") + "T20:00:00.000Z"
              ),
              dateTimeEnd: new Date(
                dayjs()
                  .add(1, "day")
                  .format("YYYY-MM-DD") + "T22:00:00.000Z"
              )
            }
          }
        }

        const eventResponse = await prisma.event.create(eventData)

        const addressResponse = await prisma.address.create({
          data: {
            Event: {
              connect: {
                id: eventResponse.id
              }
            }
          }
        })

        const eventSettingsResponse = await prisma.eventSettings.create({
          data: {
            eventId: eventResponse.id,
            access: EventAccess.Private,
            showGuestList: true,
            allowComments: true
          }
        })

        // const inviteUrl = await createShortUrl(eventResponse, inviteCode)

        const eventInviteResponse = await prisma.eventInvite.create({
          data: {
            eventId: eventResponse.id,
            code: inviteCode
            // url: inviteUrl
          }
        })

        let guestResponse
        if (userId) {
          guestResponse = await prisma.guest.create({
            data: {
              userId: userIdInt,
              eventId: eventResponse.id,
              isHost: true,
              response: GuestResponse.Accepted
            }
          })
        }

        res.status(201)
        res.json({
          eventResponse,
          eventSettingsResponse,
          addressResponse,
          eventInviteResponse,
          guestResponse
        })
        break
      default:
      // res.setHeader("Allow", ["GET", "POST"])
      // res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (err) {
    res.status(500)
    res.json({ authorized: false, error: err.message })
  }
}

async function createShortUrl(event, inviteCode) {
  // post to rebrandly
  const res = await fetch(`https://api.rebrandly.com/v1/links`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      apikey: process.env.REBRANDLY_API_KEY,
      workspace: process.env.REBRANDLY_WORKSPACE_ID
    },
    body: JSON.stringify({
      destination: `https://www.inviteable.app/events/${event.id}?inviteCode=${inviteCode}`,
      domain: {
        id: process.env.REBRANDLY_DOMAIN_ID
      },
      title: `${event.title}`
    })
  })

  const { shortUrl } = await res.json()

  return shortUrl
}
