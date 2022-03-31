import React, { Fragment } from "react"
import { NextPage } from "next"
import dayjs from "dayjs"

import { Dialog, Transition } from "@headlessui/react"
import { spinner } from "../Elements/Icons"
import { Event } from "../../models/interfaces"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  event: Event
  isSubmitting: boolean
  errorMessage: string
}

const EventEdit: NextPage<Props> = ({
  open,
  setOpen,
  event,
  isSubmitting,
  errorMessage
}) => {
  // const [productId, setProductId] = React.useState(null)
  const [title, setTitle] = React.useState(event.title)
  const [price, setPrice] = React.useState("0.00")
  const [dateStart, setDateStart] = React.useState(
    dayjs(event.dateTimeStart).format("YYYY-MM-DD")
  )
  const [timeStart, setTimeStart] = React.useState(
    dayjs(event.dateTimeStart).format("HH:mm")
  )
  const [priceError, setPriceError] = React.useState("")
  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    if (parseFloat(price).toString() === "NaN") {
      setPriceError("Price must be a number")
    } else setPriceError("")
  }, [price])

  function updateEventDetails(name) {
    fetch(`/api/event/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if (!data.error) setProducts(data.products)
      })
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        open={open}
        onClose={setOpen}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
            className="hidden sm:inline-block sm:h-screen sm:align-top"
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
              className="absolute top-16 inline-block w-11/12 transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 
            text-left align-bottom shadow-xl transition-all sm:relative sm:my-8 sm:p-6 sm:align-middle"
            >
              <h3 className="text-center text-lg">Edit event details</h3>
              <div>
                <div className="mt-3 sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Name
                  </Dialog.Title>
                  <div className="mt-4">
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        list="product-names"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 px-3 py-2 focus:border-gray-300 focus:ring-white sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-3 sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </Dialog.Title>
                  <div className="mt-4 w-1/3">
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-2 text-gray-500 sm:text-sm">
                        $
                      </span>
                      <input
                        type="text"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="block w-full min-w-0 flex-1 rounded-r-md border-gray-300 px-3 py-2 focus:border-gray-300 focus:ring-white sm:text-sm"
                      />
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-red-600">{priceError}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
              <div className="mt-5 sm:mt-10">
                <button
                  type="button"
                  className={`${
                    priceError !== ""
                      ? "cursor-not-allowed border-gray-300 bg-gray-300"
                      : "border-cyan-600 bg-cyan-600 hover:bg-cyan-700"
                  } focus:outline-none mb-4 inline-flex w-full justify-center 
                  rounded-md border px-4 py-2 text-base font-semibold
                  text-white shadow-sm sm:text-sm`}
                  onClick={() => null}
                >
                  {spinner(isSubmitting)} Add to orders
                </button>
                <button
                  type="button"
                  className="focus:outline-none inline-flex w-full justify-center rounded-md border 
                  border-gray-300 bg-white px-4 py-2 text-base font-medium 
                  text-gray-700 shadow-sm hover:bg-gray-50 sm:text-sm"
                  onClick={() => {
                    setOpen(false)
                    setTitle("")
                    setPrice("0.00")
                    setPriceError("")
                  }}
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

export default EventEdit
