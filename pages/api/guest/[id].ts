import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../middleware/prismaClient"
import { getAuth } from "@clerk/nextjs/server"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req)

  const {
    method,
    query: { id },
    body
  } = req
  let guest
  try {
    switch (method) {
      case "GET":
        guest = await prisma.guest.findUnique({
          where: {
            id: parseInt(id as string)
          },
          include: {
            Event: true,
            User: true
          }
        })
        if (userId === guest.clerkUserId) {
          res.status(200)
          res.json({ authorized: true, guest })
        }
        break
      case "PUT":
        const { response, isHost } = body
        guest = await prisma.guest.findUnique({
          where: {
            id: parseInt(id as string)
          },
          include: {
            Event: true,
            User: true
          }
        })

        if (userId === guest.clerkUserId) {
          const guestResponse = await prisma.guest.update({
            where: {
              id: parseInt(id as string)
            },
            data: {
              response: response
                ? parseInt((response as unknown) as string)
                : undefined,
              isHost: isHost
                ? ((isHost as unknown) as string) === "true"
                : undefined
            }
          })
          res.status(200)
          res.json({ authorized: true, guestResponse })
        }
        break

      case "POST":
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
