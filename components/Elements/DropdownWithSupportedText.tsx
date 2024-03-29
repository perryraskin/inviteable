import { NextPage } from "next"
import React from "react"
import { Fragment, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid"
import { EventAccess } from "../../models/interfaces"

const accessOptions = [
  {
    title: "Private",
    description: "This event is only visible to invited guests.",
    current: true,
    access: EventAccess.Private
  },
  //  {
  //     title: "Unlisted",
  //     description: "This event is visible to anyone with the link.",
  //     current: false,
  //     access: EventAccess.Unlisted
  //   },
  {
    title: "Public",
    description: "This event is visible to anyone with the link.",
    current: false,
    access: EventAccess.Public
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  selectedEventAccess: EventAccess
  setEventAccess: (access: EventAccess) => void
}

export const DropdownWithSupportedText: NextPage<Props> = ({
  selectedEventAccess,
  setEventAccess
}) => {
  console.log("selectedEventAccess", selectedEventAccess)
  const [selected, setSelected] = useState(
    accessOptions.find(a => a.access === selectedEventAccess)
  )

  React.useEffect(() => {
    console.log("selected", selected)
    setEventAccess(selected.access)
  }, [selectedEventAccess])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Change event access</Listbox.Label>
          <div className="inline-flex shadow-sm rounded-md divide-x divide-blue-600">
            <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-blue-600">
              <div className="relative inline-flex items-center bg-blue-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                <p className="ml-2.5 text-sm font-medium">{selected.title}</p>
              </div>
              <Listbox.Button className="relative inline-flex items-center bg-blue-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-blue-600 focus:outline-none">
                <span className="sr-only">Change event access</span>
                <ChevronDownIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </Listbox.Button>
            </div>
          </div>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="origin-top-right absolute z-10 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {accessOptions.map(option => (
                <Listbox.Option
                  key={option.title}
                  className={({ active }) =>
                    classNames(
                      active ? "text-white bg-blue-500" : "text-gray-900",
                      "cursor-default select-none relative p-4 text-sm"
                    )
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <p
                          className={selected ? "font-semibold" : "font-normal"}
                        >
                          {option.title}
                        </p>
                        {selected ? (
                          <span
                            className={active ? "text-white" : "text-blue-500"}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                      <p
                        className={classNames(
                          active ? "text-blue-200" : "text-gray-500",
                          "mt-2"
                        )}
                      >
                        {option.description}
                      </p>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  )
}
