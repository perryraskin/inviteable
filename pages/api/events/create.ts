import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

export default async function(req, res) {
  req = req as NextApiRequest
  const prisma = new PrismaClient({ log: ["query"] })

  try {
    const { event } = req.body
    const {
      userId,
      title,
      eventDateTime,
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
      details
    } = event
    console.log(req.body)
    const eventResponse = await prisma.event.create({
      data: {
        Host: {
          connect: {
            id: userId
          }
        },
        title,
        eventDateTime: new Date(eventDateTime),
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
        details
      }
    })

    res.status(201)
    res.json({ eventResponse })
  } catch (err) {
    res.status(500)
    res.json({ error: err.message })
    console.log(err.message)
  } finally {
    await prisma.$disconnect()
  }
}
