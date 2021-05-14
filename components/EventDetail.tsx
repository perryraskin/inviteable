import React, { useState } from "react"
import { NextPage } from "next"
import Router from "next/router"
import withLayout from "../hocs/withLayout"
import utilities from "../utilities"

import dayjs from "dayjs"
import {
  CheckCircleIcon,
  XCircleIcon,
  UsersIcon,
  CalendarIcon,
  FlagIcon,
  ClockIcon,
  TicketIcon,
  GlobeIcon,
  LocationMarkerIcon,
  LockClosedIcon
} from "@heroicons/react/solid"

import AvatarGroupStack from "./AvatarGroupStack"

interface Props {
  event?: any
}

const EventDetail: NextPage<Props> = ({ event }) => {
  const now = dayjs()
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <main className="flex-1 rounded-xl shadow-lg relative z-0 overflow-y-auto focus:outline-none xl:order-last bg-white">
      <article>
        {/* Profile header */}
        <div>
          <div>
            <img
              className="h-32 w-full object-cover lg:h-48"
              src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80"
              alt=""
            />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="flex">
                <div
                  className="h-24 w-24 rounded-xl shadow-lg border-red-500 bg-white"
                  style={{ borderTopWidth: "26px" }}
                >
                  <span className="flex items-center justify-center h-16 font-bold text-6xl">
                    9
                  </span>
                </div>
              </div>
              <div className="mt-6 sm:mt-14 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                  <h3 className="text-sm font-bold uppercase text-red-500 truncate">
                    Monday, March 9, 2020 at 8:45 PM EDT
                  </h3>
                </div>
                <div className="sm:hidden 2xl:block mt-1 min-w-0 flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">
                    Grandma's 90th Birthday!
                  </h1>
                </div>
                <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 border border-blue-300 shadow-sm text-sm font-semibold rounded-md text-blue-500 bg-blue-50 hover:bg-gray-50 focus:outline-none"
                  >
                    <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5 text-blue-500" />
                    <span>Going</span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 border border-gray-300 
                    shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 
                    focus:outline-none"
                  >
                    <XCircleIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                    <span>Not Going</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
              <h3 className="text-sm font-bold uppercase text-red-500 truncate">
                Monday, March 9, 2020 at 8:45 PM EDT
              </h3>
            </div>
            <div className="hidden sm:block 2xl:hidden mt-1 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                Grandma's 90th Birthday!
              </h1>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="mt-6 sm:mt-2 2xl:mt-5">
          <div className="border-b border-gray-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <a
                  href="#"
                  className="border-blue-500 text-gray-900 whitespace-nowrap py-4 px-1 
                  border-b-2 font-medium text-sm"
                >
                  About
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Comments
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="">
              <p>
                <UsersIcon className="mr-2 h-5 w-5 text-gray-400 inline" />
                <span className="align-middle">33 people going</span>
              </p>
              <p className="mt-2">
                <AvatarGroupStack />
              </p>
              <p className="mt-2">
                <FlagIcon className="mr-2 h-5 w-5 text-gray-400 inline" />
                <span className="align-middle">
                  Event by <span className="font-semibold">Alicia Johnson</span>
                </span>
              </p>
              <p className="mt-2">
                <LocationMarkerIcon className="mr-2 h-5 w-5 text-gray-400 inline" />
                <span className="align-middle font-semibold">
                  <span className="font-semibold">Central Park</span>
                </span>
              </p>
              <p className="mt-2">
                <ClockIcon className="mr-2 h-5 w-5 text-gray-400 inline" />
                <span className="align-middle">
                  Monday, March 9, 2020 at 8:45AM EDT
                </span>
              </p>
              <p className="mt-2">
                <LockClosedIcon className="mr-2 h-5 w-5 text-gray-400 inline" />
                <span className="align-middle">
                  Private • Only people who are invited
                </span>
              </p>
            </div>
            <div className="mt-2 sm:mt-0 rounded-lg relative">
              <img
                className="rounded-lg"
                src="https://i.imgur.com/oFypSZG.jpg"
              ></img>
              <div className="bg-white rounded-b-lg shadow absolute bottom-0 z-10 w-full text-center font-semibold p-4">
                Central Park
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Details</dt>
              <dd className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                <p>
                  We are so excited to celebrate together with the entire
                  family! It's been a long time since we had a proper
                  get-together.
                </p>
                <p>
                  Grandma will be turning 90!! It will be so special for her to
                  be surrounded by everyone she loves. Be ready for food,
                  snacks, drinks, and desserts of all kinds. Come hungry and
                  please try to be on time!
                </p>
              </dd>
            </div>
          </dl>
        </div>
        {/* Host list */}
        <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="text-sm font-medium text-gray-500">Hosts</h2>
          <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=Uz47TJ6CUV&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="flex-1 min-w-0">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    Alicia Johnson
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    Event Planner
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Guest list */}
        <div className="max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="text-sm font-medium text-gray-500">Guests</h2>
          <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=Uz47TJ6CUV&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="flex-1 min-w-0">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    Leslie Alexander
                  </p>
                  <p className="text-sm text-gray-500 truncate">Host</p>
                </a>
              </div>
            </div>
            <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixqx=Uz47TJ6CUV&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="flex-1 min-w-0">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    Michael Foster
                  </p>
                  <p className="text-sm text-gray-500 truncate">Going</p>
                </a>
              </div>
            </div>
            <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixqx=Uz47TJ6CUV&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="flex-1 min-w-0">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    Dries Vincent
                  </p>
                  <p className="text-sm text-gray-500 truncate">Going</p>
                </a>
              </div>
            </div>
            <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixqx=Uz47TJ6CUV&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="flex-1 min-w-0">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    Lindsay Walton
                  </p>
                  <p className="text-sm text-gray-500 truncate">Not Going</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

export default EventDetail
