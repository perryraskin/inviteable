import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../middleware/prismaClient"
import { getAuth } from "@clerk/nextjs/server"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req)

  const {
    query: { id, tab }
  } = req

  // console.log("ssr:", ssr)
  const requestedUserId = (id as unknown) as string
  let events
  if (req.method === "GET") {
    try {
      if (requestedUserId === userId) {
        events = await prisma.event.findMany({
          where: {
            dateTimeStart: {
              gt: tab === "upcoming" ? new Date() : undefined,
              lt: tab === "past" ? new Date() : undefined
            },
            Guests: {
              some: {
                clerkUserId: userId
              }
            }
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
            dateTimeStart: tab === "upcoming" ? "asc" : "desc"
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
