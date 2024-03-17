import { NextApiRequest, NextApiResponse } from "next"
import { getAuth } from "@clerk/nextjs/server"
import { clerkClient } from "@clerk/nextjs"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req)

  const {
    body: { userIdList }
  } = req

  if (req.method === "POST") {
    try {
      if (
        !userIdList ||
        !Array.isArray(userIdList) ||
        userIdList.some(userId => typeof userId !== "string")
      ) {
        throw new Error("Invalid userIdList provided")
      }
      const users = await clerkClient.users.getUserList({ userId: userIdList })
      const usersDict = users.reduce((acc, user) => {
        acc[user.id] = user
        return acc
      }, {})
      return res.status(200).json(usersDict)
    } catch (err) {
      return res.status(500).json({ authorized: false, error: err.message })
    }
  } else {
    return
  }
}
