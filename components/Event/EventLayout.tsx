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
import PendingBanner from "./PendingBanner"

import { Event } from "../../models/interfaces"

interface Props {
  eventId: string
  inviteCode?: string
  claim?: boolean
}

const EventLayout: NextPage<Props> = ({ eventId, inviteCode, claim }) => {
  const [magic] = React.useContext(MagicContext)
  const [loggedIn, setLoggedIn] = React.useContext(LoggedInContext)
  const [isLoading, setIsLoading] = React.useContext(LoadingContext)
  const [currentEvent, setCurrentEvent] = React.useState(null)
  const [responseCompleted, setResponseCompleted] = React.useState(false)
  const [isClaiming, setIsClaiming] = React.useState(false)

  /**
   * Log user out of of the session with our app (clears the `auth` cookie)
   * Log the user out of their session with Magic
   */
  const handleLogout = async () => {
    fetch(`/api/user/logout`, {
      method: "GET"
    })
    setLoggedIn(false)
    await magic.user.logout()
    // magic.user.logout().then(res => (window.location.href = "/"))
  }

  React.useEffect(() => {
    // handleLogout()
    console.log("loggedIn user:", loggedIn)
    if (loggedIn && claim) {
      setIsClaiming(true)
      fetch(`/api/event/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event: {
            userId: loggedIn.id
          }
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (!data.error) {
            window.location.href = `${window.location.origin}/events/${eventId}`
          }
        })
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (inviteCode) {
      localStorage.setItem(
        "authRedirectUrl",
        `${window.location.origin}/events/${eventId}?inviteCode=${inviteCode}`
      )
    } else {
      localStorage.setItem(
        "authRedirectUrl",
        `${window.location.origin}/events/${eventId}`
      )
    }
    if (!claim) getEvent()
  }, [])

  async function getEvent() {
    const res = await fetch(`/api/event/${eventId}?inviteCode=${inviteCode}`)
    const data = await res.json()
    console.log(data)
    const { authorized, event } = data
    if (authorized) {
      setResponseCompleted(true)
      setCurrentEvent(event)
    } else {
      setResponseCompleted(true)
    }
  }

  async function handleLogin() {
    // Start the Google OAuth 2.0 flow!
    const didToken = await magic.oauth.loginWithRedirect({
      provider: "google",
      redirectURI: `${window.location.origin}/callback`
    })
  }

  if (!isLoading && responseCompleted && !currentEvent) {
    return (
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 sm:w-1/2 sm:ml-auto sm:mr-auto">
        <div className="text-center">
          <Link href="/">
            <img
              className="mb-6 h-16 inline"
              src="https://res.cloudinary.com/raskin-me/image/upload/v1622141056/inviteable/inviteable-logo-2-alt-1_cpqw0x.png"
              alt="Inviteable"
            />
          </Link>
        </div>

        <div className="mt-6">
          <a
            href="#"
            onClick={handleLogin}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Sign in with Google</span>
            {/* <img
                  className="w-24 p-1"
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                ></img> */}
            <img
              src="https://inviteable.s3.amazonaws.com/images/google-logo.png"
              className="w-6"
            ></img>
            <span className="px-2 text-gray-900 text-base align-middle font-semibold ml-2">
              Continue with Google
            </span>
          </a>
        </div>
      </div>
    )
  } else if (isLoading || !currentEvent || isClaiming) {
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
          {!currentEvent.userId && (
            <PendingBanner user={loggedIn} eventId={currentEvent.id} />
          )}
          <EventDetail
            user={loggedIn}
            event={currentEvent}
            inviteCode={inviteCode}
            refreshData={getEvent}
            handleLogin={handleLogin}
          />
        </div>
      </div>
    )
  }
}

export default withLayout(EventLayout)
