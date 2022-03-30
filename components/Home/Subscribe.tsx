import React from "react"
import { spinner } from "../Elements/Icons"

export default function Subscribe() {
  const [email, setEmail] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  async function subscribeEmail(e) {
    setIsLoading(true)
    e.preventDefault()

    const res = await fetch(`/api/subscribe?email_address=${email}`)
    const json = await res.json()

    try {
      // console.log(res)
      if (json.error) {
        setErrorMessage(json.error.message)
        setIsLoading(false)
      } else {
        setSuccess(true)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="relative mt-14 sm:py-16">
      <div aria-hidden="true" className="hidden sm:block">
        <div className="absolute inset-y-0 left-0 w-1/2 rounded-r-3xl bg-gray-50" />
        <svg
          className="absolute top-8 left-1/2 -ml-3"
          width={404}
          height={392}
          fill="none"
          viewBox="0 0 404 392"
        >
          <defs>
            <pattern
              id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={392}
            fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
          />
        </svg>
      </div>
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-red-500 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
          >
            <svg
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 1463 360"
            >
              <path
                className="text-red-400 text-opacity-40"
                fill="currentColor"
                d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
              />
              <path
                className="text-red-600 text-opacity-40"
                fill="currentColor"
                d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
              />
            </svg>
          </div>
          <div className="relative">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Subscribe to product updates
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-red-100">
                There are tons of more features on the roadmap. To follow the
                journey, subscribe for updates by leaving your email below.
              </p>
            </div>
            <p
              className={`emailoctopus-success-message mt-4 text-center text-white font-bold ${
                success ? "" : "hidden"
              }`}
            >
              Thanks for subscribing!
            </p>
            <p
              className={`emailoctopus-error-message text-white ${
                errorMessage ? "" : "hidden"
              }`}
            >
              {errorMessage}
            </p>
            <form
              action="#"
              className={`mt-12 sm:mx-auto sm:max-w-lg ${
                success ? "hidden" : "sm:flex"
              }`}
            >
              <div className="min-w-0 flex-1">
                <label htmlFor="cta_email" className="sr-only">
                  Email address
                </label>
                <input
                  id="cta_email"
                  type="email"
                  className="block w-full rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-500"
                  placeholder="Enter your email"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-3">
                <button
                  onClick={subscribeEmail}
                  className="w-full rounded-md border border-transparent 
                  bg-gray-900 px-5 py-3 text-base font-medium text-white shadow 
                  hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 
                  focus:ring-offset-red-500 sm:flex sm:px-10"
                >
                  {spinner(isLoading)}Subscribe
                </button>
              </div>
            </form>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-red-100">
              Have a feature request? Shoot me an email at{" "}
              <a
                href="mailto:feedback@inviteable.app"
                className="font-semibold hover:underline"
              >
                feedback@inviteable.app
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
