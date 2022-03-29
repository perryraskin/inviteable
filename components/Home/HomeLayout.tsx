import React from "react"
import { NextPage } from "next"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import withLayout from "../../hocs/withLayout"
import utilities from "../../utilities"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
import { MagicContext, LoggedInContext, LoadingContext } from "../Store"

import Landing from "./Landing"
// import Dashboard from "./Dashboard"
import Section from "../Layout/Section"
// import Login from "../Forms/Login"

interface Props {}

const HomeLayout: NextPage<Props> = ({}) => {
  const [isLoading, setIsLoading] = React.useContext(LoadingContext)

  if (isLoading) {
    return (
      <Section>
        <img
          className="ml-auto mr-auto block text-center rounded-3xl"
          width="350"
          src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
        ></img>
      </Section>
    )
  } else if (false) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p>Logged in! This page will display your events :D</p>
        </div>
      </div>
    )
  } else
    return (
      <React.Fragment>
        <Landing />
        {/* <Login /> */}
      </React.Fragment>
    )
}

export default withLayout(HomeLayout)
