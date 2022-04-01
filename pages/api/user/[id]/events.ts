import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../middleware/prismaClient"
import { User } from "@prisma/client"
import auth from "../../../../middleware/auth"
import { EventAccess, GuestResponse } from "../../../../models/interfaces"
import dayjs from "dayjs"
import e from "express"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const userAuth = await auth(req, res)
  const user = userAuth as User

  const {
    query: { id }
  } = req

  // console.log("ssr:", ssr)
  const userId = id as unknown
  const userIdString = userId as string
  let events
  if (req.method === "GET") {
    try {
      if (parseInt(userIdString) === user.id) {
        events = await prisma.event.findMany({
          where: {
            userId: user.id
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
          },
          orderBy: {
            dateTimeStart: "asc"
          }
        })

        res.status(200)
        res.json({ authorized: true, events })
      } else {
        res.status(401)
        res.json({ authorized: false })
      }
    } catch (err) {
      res.status(500)
      res.json({ authorized: false, error: err.message })
    }
  } else {
    return
  }
}
