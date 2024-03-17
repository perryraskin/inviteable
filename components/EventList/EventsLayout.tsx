import React from "react"
import { NextPage } from "next"
import Link from "next/link"
import withLayout from "../../hocs/withLayout"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

import EventList from "./EventList"
import Section from "../Layout/Section"
import Tabs from "../Elements/Tabs"
import PopupInput from "../Elements/PopupInput"
import { PlusIcon } from "@heroicons/react/solid"
import { UserButton, useUser } from "@clerk/nextjs"

interface Props {}

const EventsLayout: NextPage<Props> = ({}) => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [currentEvents, setCurrentEvents] = React.useState([])
  const [popupInputOpen, setPopupInputOpen] = React.useState(false)

  React.useEffect(() => {
    if (isSignedIn) {
      getEvents()
    }
  }, [isSignedIn, user])

  async function getEvents(tab = "upcoming") {
    try {
      const res = await fetch(`/api/user/${user.id}/events?tab=${tab}`)
      const data = await res.json()
      const { authorized, events } = data
      if (authorized && Array.isArray(events)) {
        setCurrentEvents(events)
      } else {
        setCurrentEvents([])
      }
    } catch (error) {
      console.error("Failed to fetch events:", error)
      setCurrentEvents([])
    }
  }

  // async function handleLogin() {
  //   localStorage.setItem("authRedirectUrl", `${window.location.origin}/events`)
  //   // Start the Google OAuth 2.0 flow!
  //   const didToken = await magic.oauth.loginWithRedirect({
  //     provider: "google",
  //     redirectURI: `${window.location.origin}/callback`
  //   })
  // }

  if (isLoaded && !isSignedIn) {
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
            // onClick={handleLogin}
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
  } else if (!isLoaded) {
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
        <div className="p-4">
          <div className="w-fit ml-auto">
            <UserButton />
          </div>
        </div>
        <div className="text-center mt-4">
          <Link href="/">
            <img
              className="mb-6 h-16 inline"
              src="https://res.cloudinary.com/raskin-me/image/upload/v1622141056/inviteable/inviteable-logo-2-alt-1_cpqw0x.png"
              alt="Inviteable"
            />
          </Link>
        </div>
        <PopupInput
          userId={user.id}
          open={popupInputOpen}
          setOpen={setPopupInputOpen}
        />

        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b pb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 text-center sm:text-left">
                  My Events
                </h1>
              </div>
              <div className="mt-4 flex space-x-3 md:mt-0">
                <button
                  type="button"
                  className="w-full md:w-auto inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  onClick={() => setPopupInputOpen(true)}
                >
                  <PlusIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>New Event</span>
                </button>
              </div>
            </div>
            <Tabs tabs={tabs} refreshData={getEvents} />
            <EventList events={currentEvents} />
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
