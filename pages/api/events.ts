import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../middleware/prismaClient"
import auth from "../../middleware/auth"
import { v4 as uuidv4 } from "uuid"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  // const userAuth = await auth(req, res)
  // const userUnknown = userAuth as unknown
  // const user = userUnknown as User

  const {
    method,
    body: { event }
  } = req
  const { userId, title } = event
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
            Host: {
              connect: {
                id: userId
              }
            },
            title,
            dateTimeStart: new Date(),
            dateTimeEnd: new Date(),
            inviteCode
          }
        }

        if (!userId) {
          eventData = {
            data: {
              Host: undefined,
              title,
              dateTimeStart: new Date(),
              dateTimeEnd: new Date(),
              inviteCode
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

        const inviteUrl = await createShortUrl(eventResponse, inviteCode)

        const eventUpdateResponse = await prisma.event.update({
          where: {
            id: eventResponse.id
          },
          data: {
            inviteUrl
          }
        })

        res.status(201)
        res.json({ eventResponse, addressResponse, eventUpdateResponse })
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
      }
    })
  })

  const { shortUrl } = await res.json()

  return shortUrl
}
