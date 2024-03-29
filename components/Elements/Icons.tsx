import { NextPage } from "next"
import { useContext, useState, useEffect } from "react"

interface IconsProps {}

const Icons: NextPage<IconsProps> = ({}) => {
  return <a className="w-full px-2 my-2 overflow-visible h-65"></a>
}

export default Icons

export const spinner = (doSpin: boolean, color = "text-white") => {
  return (
    <svg
      className={`${
        doSpin ? "animate-spin" : "hidden"
      } -ml-1 mr-3 h-5 w-5 ${color}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
        strokeWidth={4}
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
