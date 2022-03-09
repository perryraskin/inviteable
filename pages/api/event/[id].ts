import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../middleware/prismaClient"
import { User } from "@prisma/client"
import auth from "../../../middleware/auth"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id }
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
          Guests: true,
          Settings: true
        }
      })

      // if no userId, event has not been claimed (and has only a title)
      if (!event.userId) {
        res.status(200)
        res.json({ authorized: true, event })
      }
      // otherwise, check for logged-in host or guest
      else {
        const userAuth = await auth(req, res)
        const user = userAuth as User

        const isGuest = event.Guests
          ? event.Guests.some(g => g.userId === user.id)
          : false
        console.log(event.Host, user)
        if (event.Host.issuer !== user.issuer && !isGuest) {
          res.status(401)
          res.json({ authorized: false })
        } else {
          res.status(200)
          res.json({ authorized: true, event })
        }
      }
    } catch (err) {
      res.status(500)
      res.json({ authorized: false, error: err.message })
    } finally {
      await prisma.$disconnect()
    }
  }
  // UPDATE
  else if (req.method === "PUT") {
    const userAuth = await auth(req, res)
    const user = userAuth as User

    const eventRef = await prisma.event.findUnique({
      where: {
        id: parseInt(eventIdString)
      },
      include: {
        Address: true,
        Host: true
      }
    })

    if (eventRef.Host.issuer !== user.issuer) {
      res.status(401)
      res.json({ authorized: false })
    }
    // Only update if authenticated
    else {
      const { event } = req.body
      const {
        userId,
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
        details
      } = event
      try {
        const eventResponse = await prisma.event.update({
          where: {
            id: parseInt(eventIdString)
          },
          data: {
            title,
            dateTimeStart: new Date(dateTimeStart),
            dateTimeEnd: new Date(dateTimeEnd),
            price,
            imageUrl,
            details
          }
        })

        const addressResponse = await prisma.address.update({
          where: {
            id: eventRef.Address[0].id
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
        res.json({ authorized: false, error: err.message })
      } finally {
        await prisma.$disconnect()
      }
    }
  }
}
