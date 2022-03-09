import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../middleware/prismaClient"
import auth from "../../../middleware/auth"
import { includes } from "lodash"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const userAuth = await auth(req, res)
  //const user = userAuth as User

  const {
    query: { id }
  } = req

  const userId = id as unknown
  const userIdString = userId as string
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userIdString)
      }
    })

    res.status(200)
    res.json({ authorized: true, user })
  } catch (err) {
    res.status(500)
    res.json({ authorized: false, error: err.message })
  } finally {
    await prisma.$disconnect()
  }
}
