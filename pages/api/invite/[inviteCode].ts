import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../middleware/prismaClient"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { inviteCode }
  } = req

  let inviteCodeStr = (inviteCode as unknown) as string
  if (req.method === "GET") {
    try {
      const eventInvite = await prisma.eventInvite.findFirst({
        where: {
          code: inviteCodeStr
        },
        include: {
          Event: {
            include: {
              Settings: true
            }
          }
        }
      })

      console.log("eventInvite", eventInvite)

      if (!eventInvite) {
        return res.status(404).json({
          code: 404,
          error: "Event not found",
          event: {
            title: "Not found"
          }
        })
      }
      res.status(200).json({
        authorized: true,
        event: {
          id: eventInvite.Event.id,
          access: eventInvite.Event.Settings.access,
          title: eventInvite.Event.title,
          imageUrl: eventInvite.Event.imageUrl,
          designImageUrl: eventInvite.Event.designImageUrl
        }
      })
    } catch (err) {
      return res.status(500).json({ authorized: false, error: err.message })
    }
  }
}
