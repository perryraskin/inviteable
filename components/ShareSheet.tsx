import React, { Fragment, useState, useEffect } from "react"
import { NextPage } from "next"

import { Dialog, Transition } from "@headlessui/react"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  eventTitle: string
  inviteUrl: string
}

const ShareSheet: NextPage<Props> = ({
  open,
  setOpen,
  eventTitle,
  inviteUrl
}) => {
  let navigator: any

  const [shareSheetAvailable, setShareSheetAvailable] = useState(false)

  function copy() {
    var copyText: HTMLInputElement = document.querySelector("#event_url")
    copyText.select()
    document.execCommand("copy")

    var copyButton = document.querySelector("#copy_btn")
    copyButton.innerHTML = "Copied!"
  }

  function handleClickShare() {
    if (navigator && navigator.share) {
      navigator
        .share({
          title: eventTitle,
          url: inviteUrl
        })
        .then(() => {
          console.log("Thanks for sharing!")
        })
        .catch(console.error)
    }
  }

  useEffect(() => {
    navigator = window.navigator
    if (navigator && navigator.share) setShareSheetAvailable(true)
    else setShareSheetAvailable(false)
  }, [])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="sm:relative absolute top-16 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left 
            overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
            >
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Invite
                  </Dialog.Title>
                  <div className="mt-4">
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <button
                        id="copy_btn"
                        onClick={copy}
                        className="inline-flex items-center px-3 rounded-l-md 
                      border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm focus:outline-none"
                      >
                        Copy
                      </button>
                      <input
                        type="text"
                        name="event_url"
                        id="event_url"
                        value={inviteUrl}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-white focus:border-gray-300 sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-center">
                    <a
                      className="inline-flex justify-center px-4 py-2 border border-gray-300 
                    shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-300 
                    focus:outline-none"
                      href={`sms:&body=${inviteUrl}`}
                    >
                      {ChatIcon()}
                    </a>
                    <a
                      className="inline-flex ml-2 justify-center px-4 py-2 border border-gray-300 
                    shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-400 
                    focus:outline-none"
                      href={`whatsapp://send?text=${inviteUrl}`}
                    >
                      {WhatsAppIcon()}
                    </a>
                    {shareSheetAvailable ? (
                      <button
                        type="button"
                        className="inline-flex ml-2 justify-center px-4 py-2 border border-gray-300 
                    shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-400 
                    focus:outline-none"
                        onClick={handleClickShare}
                      >
                        {ShareIcon()}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 
                  shadow-sm px-4 py-2 bg-white text-base font-medium 
                  text-gray-700 hover:bg-gray-50 focus:outline-none sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ShareSheet

function ChatIcon() {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width={24}
      height={24}
      viewBox="0 0 233.058 233.058"
      style={{
        fill: "currentColor"
      }}
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M116.538,4.05C52.284,4.05,0,45.321,0,96.043c0,28.631,16.729,55.208,45.889,72.911c4.525,2.737,7.635,7.283,8.572,12.478
		c2.876,16.045-0.991,32.948-6.758,47.576c19.239-9.134,39.064-23.161,54.8-36.63c3.879-3.314,9.055-4.701,14.087-4.354h0.023
		c64.191,0,116.445-41.259,116.445-91.987C233.058,45.321,180.792,4.05,116.538,4.05z"
        />
      </g>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      style={{
        fill: "currentColor"
      }}
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-share"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1={12} y1={2} x2={12} y2={15} />
    </svg>
  )
}
