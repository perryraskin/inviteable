import React from "react"
import { MagicContext } from "../Store"
import { ExclamationCircleIcon, XIcon } from "@heroicons/react/outline"
import { spinner } from "../Elements/Icons"

export default function PendingBanner({ user, eventId }) {
  const [magic] = React.useContext(MagicContext)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  async function claimEvent() {
    setIsSubmitting(true)
    if (user) {
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
          if (!data.error) {
            window.location.reload()
          }
        })
    } else {
      localStorage.setItem(
        "authRedirectUrl",
        `${window.location.origin}/events/${eventId}?claim=true`
      )
      // Start the Google OAuth 2.0 flow!
      const didToken = await magic.oauth.loginWithRedirect({
        provider: "google",
        redirectURI: `${window.location.origin}/callback`
      })
    }
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
              <a
                href="#"
                onClick={claimEvent}
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-orange-600 bg-white hover:bg-orange-50"
              >
                {spinner(isSubmitting, "text-orange-600")}Claim now
              </a>
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
