import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { decryptCookie } from "../utilities/cookie"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] })
  const {
    query: { id }
  } = req

  let userFromCookie

  try {
    /* extract user from cookie */
    userFromCookie = await decryptCookie(req.cookies.auth)
  } catch (error) {
    /* if there's no valid auth cookie, user is not logged in */
    return res.status(401).json({ authorized: false, error: "Not logged in" })
  }

  try {
    /* extract user from cookie */
    userFromCookie = await decryptCookie(req.cookies.auth)

    /* check if user is already in */
    const existingUser = await prisma.user.findUnique({
      where: {
        issuer: userFromCookie.issuer
      }
    })

    if (!existingUser) {
      res.status(400)
      res.json({ message: "User not found" })
    }

    /* send back response with user obj */
    return existingUser
  } catch (error) {
    /* if there's no valid auth cookie, user is not logged in */
    return res.status(401).json({ authorized: false, error })
  } finally {
    await prisma.$disconnect()
  }
}
