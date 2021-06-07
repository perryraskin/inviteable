import React from "react"
import { NextPage } from "next"
import Link from "next/link"
import Router from "next/router"
import withLayout from "../../hocs/withLayout"
import utilities from "../../utilities"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
import { MagicContext, LoggedInContext, LoadingContext } from "../Store"

import Landing from "../Home/Landing"
import EventDetail from "./EventDetail"
import Section from "../Layout/Section"
// import Login from "../Forms/Login"

import { Event } from "../../models/interfaces"

interface Props {
  eventid: string
}

const HomeLayout: NextPage<Props> = ({ eventid }) => {
  const [loggedIn, setLoggedIn] = React.useContext(LoggedInContext)
  const [isLoading, setIsLoading] = React.useContext(LoadingContext)
  const [currentEvent, setCurrentEvent] = React.useState(null)

  React.useEffect(() => {
    fetchEventRequest()
  }, [])

  async function fetchEventRequest() {
    const res = await fetch(`/api/event/${eventid}`)
    const data = await res.json()
    console.log(data)
    const { authorized, event } = data
    if (!authorized) Router.push("/")
    else {
      setCurrentEvent(event)
    }
  }

  if (isLoading || !currentEvent) {
    return (
      <Section>
        <img
          className="ml-auto mr-auto block text-center rounded-3xl"
          width="350"
          src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
        ></img>
      </Section>
    )
  } else {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <EventDetail event={currentEvent} />
        </div>
      </div>
    )
  }
}

export default withLayout(HomeLayout)
