import React, { useState, useEffect, useContext } from "react"
import { NextPage } from "next"
import HomeLayout from "../components/Home/HomeLayout"
import Home from "../components/Home/Home"

interface Props {}

const HomePage: NextPage<Props> = ({}) => {
  return <HomeLayout />
}

export default HomePage
