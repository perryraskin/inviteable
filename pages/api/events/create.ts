import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, User } from "@prisma/client"
import auth from "../../../middleware/auth"

export default async function(req, res) {
  // const userAuth = await auth(req, res)
  // const user = userAuth as User

  req = req as NextApiRequest
  const prisma = new PrismaClient({ log: ["query"] })
  const { event } = req.body
  const { userId, title } = event
  try {
    const { event } = req.body
    const { userId, title } = event
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
        dateTimeEnd: new Date()
      }
    }

    if (!userId) {
      eventData = {
        data: {
          Host: undefined,
          title,
          dateTimeStart: new Date(),
          dateTimeEnd: new Date()
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

    res.status(201)
    res.json({ eventResponse, addressResponse })
  } catch (err) {
    res.status(500)
    res.json({ error: err.message })
    console.log(err.message)
  } finally {
    await prisma.$disconnect()
  }
}
