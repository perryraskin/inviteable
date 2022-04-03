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

import EventList from "./EventList"
import Section from "../Layout/Section"
import Tabs from "../Elements/Tabs"

interface Props {}

const EventsLayout: NextPage<Props> = ({}) => {
  const [magic] = React.useContext(MagicContext)
  const [loggedIn, setLoggedIn] = React.useContext(LoggedInContext)
  const [isLoading, setIsLoading] = React.useContext(LoadingContext)
  const [currentEvents, setCurrentEvents] = React.useState([])

  React.useEffect(() => {
    getEvents()
  }, [loggedIn])

  async function getEvents(tab = "upcoming") {
    if (loggedIn) {
      // console.log(loggedIn)
      const res = await fetch(`/api/user/${loggedIn.id}/events?tab=${tab}`)
      const data = await res.json()
      console.log(data)
      const { authorized, events } = data
      if (authorized) {
        setCurrentEvents(events)
      }
    }
  }

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
  } else
    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <Link href="/">
            <a>
              <img
                className="mb-6 h-16 inline"
                src="https://res.cloudinary.com/raskin-me/image/upload/v1622141056/inviteable/inviteable-logo-2-alt-1_cpqw0x.png"
                alt="Inviteable"
              />
            </a>
          </Link>
        </div>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">My Events</h1>
            <Tabs tabs={tabs} refreshData={getEvents} />
            <EventList user={loggedIn} events={currentEvents} />
          </div>
        </div>
      </React.Fragment>
    )
}

const tabs = [
  {
    name: "Upcoming",
    href: "?tab=upcoming",
    current: true
  },
  { name: "Past", href: "?tab=past", current: false }
]

export default withLayout(EventsLayout)
