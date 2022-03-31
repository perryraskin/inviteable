import React, { Fragment, useState } from "react"
import { SearchIcon } from "@heroicons/react/solid"
import { Combobox, Dialog, Transition } from "@headlessui/react"

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

export default function LocationSearch({
  open,
  setOpen,
  event,
  refreshData,
  setMapBoxReset
}) {
  const [locationResults, setLocationResults] = useState("")
  const [query, setQuery] = useState("")

  React.useEffect(() => {
    fetch(`/api/locationSearch?query=${query}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setLocationResults(data.locations)
      })
  }, [query])

  function setEventLocation(location) {
    setOpen(false)
    fetch(`/api/event/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event: {
          locationName: location.name,
          address1: location.address,
          city: location.place,
          state: location.region,
          zip: location.postcode,
          country: location.country,
          latitude: location.latitude,
          longitude: location.longitude
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        setMapBoxReset(false)
        // console.log(data)
        refreshData()
        setTimeout(() => {
          setMapBoxReset(true)
        }, 2000)
      })
  }

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery("")}>
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
            onChange={location => setEventLocation(location)}
          >
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                onChange={event => setQuery(event.target.value)}
              />
            </div>

            {locationResults.length > 0 && (
              <Combobox.Options
                static
                className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
              >
                {locationResults.map(location => (
                  <Combobox.Option
                    key={location.id}
                    value={location}
                    className={({ active }) =>
                      classNames(
                        "cursor-default select-none px-4 py-2 font-semibold",
                        active && "bg-black text-white"
                      )
                    }
                  >
                    {location.name}
                    <br></br>
                    <span className="font-normal">
                      {location.place ? location.place + ", " : ""}
                      {location.region ? location.region + ", " : ""}
                      {location.postcode ? location.postcode + ", " : ""}
                      {location.country}
                    </span>
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {query !== "" && locationResults.length === 0 && (
              <p className="p-4 text-sm text-gray-500">No people found.</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
