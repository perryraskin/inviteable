import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] })
  const {
    query: { id }
  } = req

  const eventId = id as unknown
  const eventIdInt = eventId as string
  try {
    // const event = await prisma.event.findUnique({
    //   where: {
    //     id: parseInt(eventIdInt)
    //   },
    // })

    res.status(200)
    // res.json({ event })
    res.json({ message: "hi" })
  } catch (err) {
    res.status(500)
    res.json({ error: err.message })
  } finally {
    await prisma.$disconnect()
  }
}
