import React from "react"
import { NextPage } from "next"
import { ClerkUser, Guest } from "../models/interfaces"

interface Props {
  guestList: Guest[]
  clerkUserMap: { [clerkUserId: string]: ClerkUser }
}

const AvatarGroupStack: NextPage<Props> = ({ guestList, clerkUserMap }) => {
  return (
    <>
      <div className="flex -space-x-2 relative z-0 overflow-hidden">
        {/* <Avatar
          name="Jane Doe"
          className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white"
        /> */}
        {guestList.map((guest, index) => {
          if (index < 5) {
            return (
              <img
                key={index}
                className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src={clerkUserMap[guest.clerkUserId]?.imageUrl}
                // alt={clerkUserMap[guest.clerkUserId]?.firstName + " " + clerkUserMap[guest.clerkUserId]?.lastName}
                title={
                  clerkUserMap[guest.clerkUserId]?.firstName +
                  " " +
                  clerkUserMap[guest.clerkUserId]?.lastName
                }
              />
            )
          }
        })}
        {/* <div
          className="cursor-pointer z-30 font-bold w-6 h-6 bg-blue-300 text-xs
            text-white flex items-center justify-center rounded-full border-2 border-white"
        >
          {guestList.length - 5}
        </div> */}
      </div>
      {guestList.length > 5 && (
        <span className="mt-1 ml-1 text-xs text-gray-400 tracking-wider font-bold">
          +{guestList.length - 5}
        </span>
      )}
    </>
  )
}

export default AvatarGroupStack
