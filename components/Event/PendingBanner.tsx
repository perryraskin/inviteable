import React from "react"
import { ExclamationCircleIcon, XIcon } from "@heroicons/react/outline"
import { spinner } from "../Elements/Icons"
import { useUser } from "@clerk/nextjs"
import { SignInButton } from "@clerk/clerk-react"
import { claimEvent } from "./event.util"

export default function PendingBanner({ eventId }) {
  const { isSignedIn, user } = useUser()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  async function handleClaimEvent() {
    setIsSubmitting(true)
    await claimEvent(user.id, eventId)
  }

  return (
    <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-10">
      <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="p-2 rounded-lg bg-orange-600 shadow-lg sm:p-3">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-orange-800">
                <ExclamationCircleIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </span>
              <p className="ml-3 font-medium text-white">
                <span className="inline">
                  Claim this event to add details and invite guests.
                </span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              {isSignedIn ? (
                <a
                  role="button"
                  onClick={handleClaimEvent}
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-orange-600 bg-white hover:bg-orange-50"
                >
                  {spinner(isSubmitting, "text-orange-600")}Claim now
                </a>
              ) : (
                <SignInButton
                  redirectUrl={`${window.location.origin}/events/${eventId}?claim=true`}
                >
                  <button
                    type="button"
                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-orange-600 bg-white hover:bg-orange-50"
                  >
                    {spinner(isSubmitting, "text-orange-600")}Claim now
                  </button>
                </SignInButton>
              )}
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button
                type="button"
                className="-mr-1 flex p-2 rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-white"
              >
                {/* <span className="sr-only">Dismiss</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" /> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
