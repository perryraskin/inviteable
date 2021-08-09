import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { magic } from "../../../utilities/magic"
import { encryptCookie, cookie } from "../../../utilities/cookie"
import { serialize } from "cookie"
// import Cors from "cors"

// const cors = Cors({
//   methods: ["GET", "HEAD"],
// })

// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result)
//       }

//       return resolve(result)
//     })
//   })
// }

export default async function(req: NextApiRequest, res: NextApiResponse) {
  // await runMiddleware(req, res, cors)

  const prisma = new PrismaClient({ log: ["query"] })
  const body = JSON.parse(req.body)
  const firstName = body.firstName
  const lastName = body.lastName
  const imageUrl = body.imageUrl
  console.log(firstName, lastName, imageUrl)
  try {
    /* strip token from Authorization header */
    let DIDT = magic.utils.parseAuthorizationHeader(req.headers.authorization)

    /* validate token to ensure request came from the issuer */
    await magic.token.validate(DIDT)

    /* decode token to get claim obj with data */
    let claim = magic.token.decode(DIDT)[1]
    console.log("claim:", claim)

    /* get user data from Magic */
    const userMetadata = await magic.users.getMetadataByIssuer(claim.iss)
    console.log("userMetadata", userMetadata)

    /* check if user is already in */
    const existingUser = await prisma.user.findUnique({
      where: {
        issuer: claim.iss
      }
    })

    /* Create new user if doesn't exist */
    if (!existingUser) {
      const { email, issuer } = userMetadata
      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          imageUrl,
          email,
          issuer
        }
      })
    }

    /* encrypted cookie details */
    const token = await encryptCookie(userMetadata)

    /* set cookie */
    await res.setHeader("Set-Cookie", serialize("auth", token, cookie))

    /* send back response with user obj */
    return res.json({ authorized: true, user: userMetadata })

    // res.status(201)
    // res.json({ newUser })
  } catch (err) {
    res.status(500)
    res.json({ error: err.message })
    console.error(err.message, err.data ? err.data : "")
  } finally {
    await prisma.$disconnect()
  }
}
