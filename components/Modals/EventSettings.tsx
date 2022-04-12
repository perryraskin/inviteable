import React, { Fragment, useState, useEffect } from "react"
import { NextPage } from "next"

import { Dialog, Transition, RadioGroup } from "@headlessui/react"
import {
  CheckCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
  GlobeIcon
} from "@heroicons/react/solid"
import { Event, Guest } from "../../models/interfaces"
import { spinner } from "../Elements/Icons"

const accessLevels = [
  {
    id: 0,
    title: "Private",
    description: "Only invited guests can access this event",
    icon: LockClosedIcon
  },
  {
    id: 1,
    title: "Unlisted",
    description: "Anyone with the invite URL can access this event",
    icon: LockOpenIcon
  },
  {
    id: 2,
    title: "Public",
    description: "Anyone can find and access this event",
    icon: GlobeIcon
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  event: Event
  guest: Guest
  refreshData: () => void
}

const EventSettings: NextPage<Props> = ({
  open,
  setOpen,
  event,
  guest,
  refreshData
}) => {
  const [showGuestList, setShowGuestList] = useState(
    event.Settings.showGuestList
  )
  const [allowComments, setAllowComments] = useState(
    event.Settings.allowComments
  )
  const [selectedAccessLevel, setSelectedAccessLevel] = useState(
    accessLevels[event.Settings.access]
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSaveEventSettings() {
    setIsSubmitting(true)
    const res = await fetch(`/api/event/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event: {
          showGuestList,
          allowComments,
          eventAccess: selectedAccessLevel.id
        }
      })
    })

    const data = await res.json()
    if (!data.error) {
      setOpen(false)
      setIsSubmitting(false)
      refreshData()
    } else {
      console.log("error:", data.error)
    }
  }
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
              className="sm:relative absolute sm:top-16 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left 
            overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6"
            >
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Event Settings
                  </Dialog.Title>
                </div>
              </div>
              {/* <p className="text-base font-medium text-gray-900 ml-2">
                Options
              </p> */}
              <div className="ml-1 relative flex items-start mt-6">
                <div className="flex items-center h-5">
                  <input
                    checked={showGuestList}
                    onChange={() => setShowGuestList(!showGuestList)}
                    id="show-guests"
                    type="checkbox"
                    className="cursor-pointer focus:ring-transparent h-4 w-4 text-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="show-guests"
                    className="font-medium text-gray-700 cursor-pointer"
                  >
                    Show guest list
                  </label>
                  <p id="show-guests-description" className="text-gray-500">
                    The list of guests is displayed below the event details.
                  </p>
                </div>
              </div>
              <div className="ml-1 relative flex items-start mt-6">
                <div className="flex items-center h-5">
                  <input
                    checked={allowComments}
                    onChange={() => setAllowComments(!allowComments)}
                    id="allow-comments"
                    type="checkbox"
                    className="cursor-pointer focus:ring-transparent h-4 w-4 text-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="allow-comments"
                    className="font-medium text-gray-700 cursor-pointer"
                  >
                    Allow comments
                  </label>
                  <p id="allow-comments-description" className="text-gray-500">
                    Guests can have discussions in the Comments tab.
                  </p>
                </div>
              </div>
              {/* <RadioGroup
                className={`mt-6 pl-3 pr-3`}
                value={selectedAccessLevel}
                onChange={setSelectedAccessLevel}
              >
                <RadioGroup.Label className="text-base font-medium text-gray-900">
                  Access
                </RadioGroup.Label>

                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {accessLevels.map(accessLevel => {
                    if (accessLevel.id !== 1) {
                      return (
                        <RadioGroup.Option
                          key={accessLevel.id}
                          value={accessLevel}
                          className={({ checked, active }) =>
                            classNames(
                              accessLevel.id === selectedAccessLevel?.id
                                ? "border-transparent"
                                : "border-gray-300",
                              accessLevel.id === selectedAccessLevel?.id
                                ? "border-blue-500 ring-2 ring-blue-500"
                                : "",
                              "relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <div className="flex-1 flex">
                                <div className="flex flex-col">
                                  <RadioGroup.Label
                                    as="span"
                                    className="flex text-sm font-medium text-gray-900"
                                  >
                                    <accessLevel.icon
                                      className={classNames(
                                        accessLevel.id ===
                                          selectedAccessLevel?.id
                                          ? "text-blue-600"
                                          : "text-gray-400",
                                        "h-5 w-5 mr-1"
                                      )}
                                    />
                                    {accessLevel.title}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className="mt-1 flex items-center text-sm text-gray-500"
                                  >
                                    {accessLevel.description}
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              <div
                                className={classNames(
                                  active ? "border" : "border-2",
                                  "absolute -inset-px rounded-lg pointer-events-none"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      )
                    }
                  })}
                </div>
              </RadioGroup> */}
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 
                  shadow-sm px-4 py-2 bg-blue-500 text-base font-medium 
                  text-white hover:bg-blue-600 focus:outline-none sm:text-sm"
                  onClick={handleSaveEventSettings}
                >
                  {spinner(isSubmitting)}
                  Save
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex justify-center w-full rounded-md border border-gray-300 
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

export default EventSettings
