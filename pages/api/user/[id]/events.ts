import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../middleware/prismaClient"
import { User } from "@prisma/client"
import auth from "../../../../middleware/auth"
import { EventAccess, GuestResponse } from "../../../../models/interfaces"
import dayjs from "dayjs"

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
      events = await prisma.event.findMany({
        where: {
          userId: parseInt(userIdString)
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
          dateTimeStart: "desc"
        }
      })

      res.status(200)
      res.json({ authorized: true, events })
    } catch (err) {
      res.status(500)
      res.json({ authorized: false, error: err.message })
    }
  } else {
    return
  }
}
