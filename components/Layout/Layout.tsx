import { NextPage } from "next"
import Head from "next/head"
import React, { useState, useEffect, useContext } from "react"

import MenuBar from "./MenuBar"
import Footer from "./Footer"

interface Props {
  children: any
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <div className="antialiased text-gray-900 bg-gray-100">
      <div className="flex">
        <div className="flex-1 flex-col relative z-0 overflow-y-auto">
          {/* <MenuBar /> */}
          {/* <br /> */}
          {children}
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  )
}

export default Layout
