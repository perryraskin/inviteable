import React, { Fragment, useState } from "react"
import { Router, useRouter } from "next/router"
import { SearchIcon } from "@heroicons/react/solid"
import { Combobox, Dialog, Transition } from "@headlessui/react"
import useGlobalKeyDown from "react-global-key-down-hook"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

// interface Props {
//   open: boolean
//   setOpen: (open: boolean) => void
//   event: Event
//   isSubmitting: boolean
//   errorMessage: string
// }

export default function PopupInput({ user, open, setOpen }) {
  const router = useRouter()
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false)
  const [eventTitle, setEventTitle] = React.useState("")

  useGlobalKeyDown(() => {
    if (eventTitle) {
      createEvent()
    }
  }, ["Enter"])

  async function createEvent() {
    const data = { event: { userId: user?.id, title: eventTitle } }
    // console.log(data)
    if (!isSubmittingForm) {
      setIsSubmittingForm(true)

      let apiUrl = "/api/events"
      let fetchMethod = "POST"
      const res = await fetch(apiUrl, {
        method: fetchMethod,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (res) {
        console.log(res)
        res.json().then(res => {
          console.log(res)
          const { eventResponse } = res
          if (eventResponse) router.push(`/events/${eventResponse.id}`)
        })
      }
    }
  }

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setEventTitle("")}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20 mt-auto mb-auto h-1/2"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            onChange={createEvent}
          >
            <div className="relative">
              {/* <SearchIcon
                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                aria-hidden="true"
              /> */}
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                // placeholder="Search..."
                onChange={event => setEventTitle(event.target.value)}
              />
            </div>
            {eventTitle && (
              <Combobox.Options
                static
                className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
              >
                <Combobox.Option
                  value={eventTitle}
                  className={({ active }) =>
                    classNames(
                      "select-none px-4 py-2 font-semibold",
                      true && "bg-black text-white cursor-pointer"
                    )
                  }
                >
                  Create event "{eventTitle}"
                </Combobox.Option>
              </Combobox.Options>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
