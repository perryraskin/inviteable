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

interface Props {}

const EventsLayout: NextPage<Props> = ({}) => {
  const [magic] = React.useContext(MagicContext)
  const [loggedIn, setLoggedIn] = React.useContext(LoggedInContext)
  const [isLoading, setIsLoading] = React.useContext(LoadingContext)
  const [currentEvents, setCurrentEvents] = React.useState([])

  React.useEffect(() => {
    getEvents()
  }, [loggedIn])

  async function getEvents() {
    if (loggedIn) {
      console.log(loggedIn)
      const res = await fetch(`/api/user/${loggedIn.id}/events`)
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
        <EventList user={loggedIn} events={currentEvents} />
        {/* <p className="text-center pt-40">
          This is where your events page will be!
        </p> */}
      </React.Fragment>
    )
}

export default withLayout(EventsLayout)
