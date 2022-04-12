import React from "react"
import { NextPage } from "next"
import Router from "next/router"

import Avatar from "react-avatar"
import { Guest } from "../models/interfaces"

interface Props {
  guestList: Guest[]
}

const AvatarGroupStack: NextPage<Props> = ({ guestList }) => {
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
                src={guest.User.imageUrl}
                // alt={guest.User.firstName + " " + guest.User.lastName}
                title={guest.User.firstName + " " + guest.User.lastName}
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
