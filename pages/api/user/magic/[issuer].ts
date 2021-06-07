import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, User } from "@prisma/client"
import auth from "../../../../middleware/auth"
import { includes } from "lodash"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const userAuth = await auth(req, res)
  //const user = userAuth as User

  const prisma = new PrismaClient({ log: ["query"] })
  const {
    query: { issuer }
  } = req

  const magicIssuer = issuer as unknown
  const magicIssuerString = magicIssuer as string
  try {
    const user = await prisma.user.findUnique({
      where: {
        issuer: magicIssuerString
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
