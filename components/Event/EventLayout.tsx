import React, { useEffect } from "react"
import { NextPage } from "next"
import Link from "next/link"
import withLayout from "../../hocs/withLayout"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

import EventDetail from "./EventDetail"
import Section from "../Layout/Section"
import PendingBanner from "./PendingBanner"
import { useUser } from "@clerk/nextjs"
import { SignInButton, SignUpButton } from "@clerk/clerk-react"
import { ClerkUser, EventAccess } from "../../models/interfaces"
import {
  BellIcon,
  CalendarIcon,
  CheckCircleIcon,
  ShareIcon,
  UserAddIcon,
  UserIcon
} from "@heroicons/react/outline"
import { Event } from "../../models/interfaces"
import { ClickableImage } from "../Elements/CickableImage"

interface Props {
  eventId: string
  inviteCode?: string
  claim?: boolean
  access?: EventAccess
}

const EventLayout: NextPage<Props> = ({
  eventId,
  inviteCode,
  claim,
  access
}) => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [eventTitleAndDesign, setEventTitleAndDesign] = React.useState<{
    title: string
    designImageUrl: string
  } | null>(null)
  const [currentEvent, setCurrentEvent] = React.useState<Event | null>(null)
  const [clerkUserMap, setClerkUserMap] = React.useState<{
    [clerkUserId: string]: ClerkUser
  }>({})

  const [responseCompleted, setResponseCompleted] = React.useState(false)
  const [unauthorized, setUnauthorized] = React.useState(false)
  const [isClaiming, setIsClaiming] = React.useState(false)
  const [signInRequired, setSignInRequired] = React.useState(false)

  React.useEffect(() => {
    if (isLoaded && !isSignedIn && access !== EventAccess.Public) {
      setSignInRequired(true)
    }
  }, [isLoaded, isSignedIn])

  React.useEffect(() => {
    // handleLogout()
    console.log("loggedIn user:", user)
    if (isSignedIn && user && claim) {
      setIsClaiming(true)
      fetch(`/api/event/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event: {
            userId: user.id
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
  }, [isSignedIn])

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
    // temp solution to get the event title and design image
    const ress = await fetch(
      `/api/event/${eventId}?inviteCode=${inviteCode}&ssr=true`
    )
    const dataa = await ress.json()
    if (dataa.authorized) {
      setEventTitleAndDesign({
        title: dataa.event.title,
        designImageUrl: dataa.event.designImageUrl
      })
    }

    const res = await fetch(`/api/event/${eventId}?inviteCode=${inviteCode}`)
    const data = await res.json()
    console.log(data)
    const { authorized, event } = data
    if (authorized) {
      setResponseCompleted(true)
      setCurrentEvent(event)
      if (event?.Guests) {
        const userIdList = event.Guests.map(guest => guest.clerkUserId)
        fetch("/api/clerk/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userIdList })
        })
          .then(res => res.json())
          .then((guests: { [clerkUserId: string]: ClerkUser }) => {
            setClerkUserMap(guests ?? {})
          })
      }
    } else {
      setResponseCompleted(true)
      setUnauthorized(true)
    }
  }

  console.log({ signInRequired, inviteCode, currentEvent })
  if (!inviteCode && unauthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-100 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center">
              <Link href="/">
                <img
                  className="h-10 inline"
                  src="https://res.cloudinary.com/raskin-me/image/upload/v1622141056/inviteable/inviteable-logo-2-alt-1_cpqw0x.png"
                  alt="Inviteable"
                />
              </Link>
            </div>
            <h1 className="mt-4 text-xl font-semibold text-center text-gray-900">
              Hmm, that's not right...
            </h1>
            <p className="text-center text-base mt-2 text-gray-600">
              <Link href="/" className="text-red-600 hover:underline">
                Go back home
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  } else if (signInRequired && inviteCode && eventTitleAndDesign) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-100 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900">
              You're Invited!
            </h1>
            <p className="text-center text-lg mt-2 text-gray-600">
              Sign in to respond to this event
            </p>
          </div>
          <div className="px-8 pb-8">
            {eventTitleAndDesign?.designImageUrl ? (
              <ClickableImage
                className="sm:mt-6 sm:w-[34rem] sm:px-6 lg:px-8"
                src={eventTitleAndDesign.designImageUrl}
                title={eventTitleAndDesign.title + " - Card Design"}
              />
            ) : (
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {eventTitleAndDesign.title}
              </h2>
            )}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <FeatureItem
                icon={<CheckCircleIcon className="h-6 w-6 text-red-500" />}
                title="Respond Easily"
                description="Quickly respond to the invitation and let the host know you're coming."
              />
              <FeatureItem
                icon={<CalendarIcon className="h-6 w-6 text-blue-500" />}
                title="Add to Calendar"
                description="Automatically add the event to your preferred calendar app."
              />
            </div>
          </div>
          <div className="px-8 pb-8 space-y-4">
            <SignInButton
              redirectUrl={`${window.location.origin}/events/${eventId}?inviteCode=${inviteCode}`}
            >
              <button className="w-full bg-red-600 text-white text-lg font-semibold py-3 px-4 rounded-lg hover:bg-red-700 transition duration-300">
                Sign In to Respond
              </button>
            </SignInButton>
            <SignUpButton
              redirectUrl={`${window.location.origin}/events/${eventId}?inviteCode=${inviteCode}`}
            >
              <button className="w-full bg-white text-red-600 text-lg font-semibold py-3 px-4 rounded-lg border border-red-600 hover:bg-red-50 transition duration-300">
                Create an Account
              </button>
            </SignUpButton>
            {/* <p className="text-sm text-gray-600 text-center mt-4">
          By signing in or creating an account, you agree to our{" "}
          <Link href="/terms" className="text-red-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-red-600 hover:underline">
            Privacy Policy
          </Link>
        </p> */}
          </div>
        </div>
      </div>
    )
  }
  // else if (signInRequired) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-b from-red-100 to-white flex items-center justify-center p-4">
  //       <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
  //         <div className="p-8">
  //           <h1 className="text-xl sm:text-3xl font-bold text-center text-gray-900">
  //             Your Event is Almost Ready!
  //           </h1>
  //           <p className="text-center text-base sm:text-lg mt-2 text-gray-600">
  //             Sign in or create an account to manage your event and unlock more
  //             features.
  //           </p>
  //         </div>
  //         <div className="px-8 pb-8">
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //             <FeatureItem
  //               icon={<CalendarIcon className="h-6 w-6 text-blue-500" />}
  //               title="Event Management"
  //               description="Easily edit and update your event details anytime."
  //             />
  //             <FeatureItem
  //               icon={<UserAddIcon className="h-6 w-6 text-green-500" />}
  //               title="Invite Guests"
  //               description="Send invitations and track RSVPs effortlessly."
  //             />
  //             <FeatureItem
  //               icon={<ShareIcon className="h-6 w-6 text-purple-500" />}
  //               title="Social Sharing"
  //               description="Promote your event across social media platforms."
  //             />
  //             <FeatureItem
  //               icon={<BellIcon className="h-6 w-6 text-yellow-500" />}
  //               title="Reminders"
  //               description="Set up automated reminders for you and your guests. (Coming soon.)"
  //             />
  //           </div>
  //         </div>
  //         <div className="px-8 pb-8">
  //           <SignUpButton
  //             redirectUrl={`${window.location.origin}/events/${eventId}?inviteCode=${inviteCode}`}
  //           >
  //             <button className="w-full bg-red-600 text-white text-lg font-semibold py-3 px-4 rounded-lg hover:bg-red-700 transition duration-300">
  //               Create Your Account
  //             </button>
  //           </SignUpButton>
  //           <p className="text-sm text-gray-600 text-center mt-4">
  //             Already have an account?{" "}
  //             <SignInButton
  //               redirectUrl={`${window.location.origin}/events/${eventId}?inviteCode=${inviteCode}`}
  //             >
  //               <a role="button" className="text-red-600 hover:underline">
  //                 Sign in here
  //               </a>
  //             </SignInButton>
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
  else if (!isLoaded && responseCompleted && !currentEvent) {
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
            href={"/signin"}
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
  } else if (!isLoaded || !currentEvent || isClaiming) {
    return (
      <Section>
        <iframe
          className="mx-auto"
          height={600}
          src="https://lottie.host/embed/a5f6cc39-aa31-4450-a00c-fb22ff7b4dea/Am02a0joXZ.json"
        ></iframe>
      </Section>
    )
  } else {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {!currentEvent.clerkUserId && (
            <PendingBanner eventId={currentEvent.id} />
          )}
          <EventDetail
            event={currentEvent}
            clerkUserMap={clerkUserMap}
            inviteCode={inviteCode}
            refreshData={getEvent}
          />
        </div>
      </div>
    )
  }
}

export default withLayout(EventLayout)

interface FeatureItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start space-x-3">
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}
