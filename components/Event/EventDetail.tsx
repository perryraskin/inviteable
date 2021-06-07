import React, { useState, useEffect } from "react"
import { NextPage } from "next"
import Head from "next/head"
import Router from "next/router"
import withLayout from "../../hocs/withLayout"
import utilities from "../../utilities"

import dayjs from "dayjs"
import {
  CheckCircleIcon,
  XCircleIcon,
  UsersIcon,
  CalendarIcon,
  FlagIcon,
  StarIcon,
  ClockIcon,
  TicketIcon,
  GlobeIcon,
  LocationMarkerIcon,
  LockClosedIcon,
  UserAddIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/solid"

// import AvatarGroupStack from "./AvatarGroupStack"
import DropdownWithIcons from "../DropdownWithIcons"
import ShareSheet from "../ShareSheet"
import MapBox from "../MapBox"

import { Event, Response } from "../../models/interfaces"

interface Props {
  event?: Event
}

const EventDetail: NextPage<Props> = ({ event }) => {
  const now = dayjs()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false)
  const inviteUrl = "https://inviteable.app/event/1"

  const [eventTitle, setEventTitle] = useState(event.title)
  const [response, setResponse] = useState(Response.None)

  async function handleUpdateResponse(response: Response) {
    setResponse(response)
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        ></meta>
        {/* General tags */}
        <meta key="description" property="description" content="inviteable" />
        <title key="title">{eventTitle}</title>
        {/* OpenGraph tags */}
        <meta
          key="og:url"
          property="og:url"
          content={`https://inviteable.app/event/${event ? event.id : 0}`}
        />
        <meta key="og:title" property="og:title" content={eventTitle} />
        <meta
          key="og:description"
          property="og:description"
          content="inviteable"
        />
        <meta
          key="og:image"
          property="og:image"
          content="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80"
        />
        <meta key="og:type" property="og:type" content="website" />
        {/* Twitter Card tags */}
        <meta
          key="twitter:title"
          property="twitter:title"
          content={eventTitle}
        />
        <meta
          key="twitter:description"
          property="twitter:description"
          content="inviteable"
        />
        <meta
          key="twitter:image"
          property="twitter:image"
          content="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80"
        />
        <meta key="twitter:card" property="twitter:card" content="summary" />
      </Head>
      <main className="flex-1 rounded-xl shadow-lg relative z-0 overflow-y-auto focus:outline-none xl:order-last bg-white">
        {/* BANNER TO LOG IN */}
        <article>
          {/* Profile header */}
          <div>
            <div>
              <img
                className="h-32 w-full object-cover lg:h-48"
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80"
                // src="https://source.unsplash.com/1600x900/?celebration"
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
                    <span className="flex items-center justify-center h-16 font-semibold text-6xl">
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
                      {eventTitle}
                    </h1>
                  </div>
                  <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                    {/* <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 border border-blue-300 shadow-sm text-sm font-semibold rounded-md text-blue-500 bg-blue-50 hover:bg-gray-50 focus:outline-none"
                  >
                    <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5 text-blue-500" />
                    <span>Going</span>
                  </button> */}
                    <DropdownWithIcons
                      title="Respond"
                      useSelectedOptionAsDefault={true}
                      currentValue={response}
                      handleChangeValue={handleUpdateResponse}
                      options={[
                        {
                          icon: (
                            <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          ),
                          iconActive: (
                            <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5 text-blue-500" />
                          ),
                          activeStyles:
                            "border-blue-300 text-blue-500 bg-blue-50",
                          label: "Going",
                          value: Response.Accepted
                        },
                        {
                          icon: (
                            <XCircleIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          ),
                          iconActive: (
                            <XCircleIcon className="-ml-1 mr-2 h-5 w-5 text-red-500" />
                          ),
                          activeStyles: "border-red-300 text-red-500 bg-red-50",
                          label: "Not Going",
                          value: Response.Declined
                        }
                      ]}
                    />
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 border border-gray-300 
                    shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 
                    focus:outline-none"
                      onClick={() => setIsShareSheetOpen(true)}
                    >
                      <UserAddIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                      {/* {shareIcon("-ml-1 mr-2 h-5 w-5 text-gray-400")} */}
                      <span>Invite</span>
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
                  {eventTitle}
                </h1>
              </div>
            </div>
          </div>
          <ShareSheet
            open={isShareSheetOpen}
            setOpen={setIsShareSheetOpen}
            eventTitle={eventTitle}
            inviteUrl={inviteUrl}
          />
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
                {/* <p className="mt-2 mb-2">
                <AvatarGroupStack />
              </p> */}
                <p className="mt-2">
                  <StarIcon className="mr-2 h-5 w-5 text-gray-400 inline" />
                  <span className="align-middle">
                    Hosted by{" "}
                    <span className="font-semibold">Alicia Johnson</span>
                  </span>
                </p>
                <p className="mt-2">
                  <LocationMarkerIcon className="mr-2 h-5 w-5 text-gray-400 inline" />
                  <span className="align-middle font-semibold">
                    <span className="font-semibold">Central Park</span>
                  </span>
                </p>
                <p className="mt-2">
                  <CalendarIcon className="mr-2 h-5 w-5 text-gray-400 inline" />
                  <span className="align-middle">Monday, March 9, 2020</span>
                </p>
                <p className="mt-2">
                  <ClockIcon className="mr-2 h-5 w-5 text-gray-400 inline" />
                  <span className="align-middle">8:45AM EDT</span>
                </p>
                <p className="mt-2">
                  <LockClosedIcon className="mr-2 h-5 w-5 text-gray-400 inline" />
                  <span className="align-middle">
                    Private{" "}
                    <span className="text-sm">(invited guests only)</span>
                  </span>
                </p>
              </div>
              <div
                id="map"
                className="h-72 sm:h-full mt-2 sm:mt-0 rounded-lg relative shadow"
              >
                {/* <img
                className="rounded-lg"
                src="https://i.imgur.com/oFypSZG.jpg"
              ></img> */}
                <MapBox lat={40.7812} long={-73.9665} />
                <div
                  className="bg-white rounded-b-lg absolute bottom-0 z-10 w-full 
              text-base sm:text-sm text-center font-sans font-semibold p-4 sm:p-3"
                >
                  Central Park, Manhattan, NY
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-lg font-bold text-gray-900">Details</dt>
                <dd className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                  <p>
                    We are so excited to celebrate together with the entire
                    family! It's been a long time since we had a proper
                    get-together.
                  </p>
                  <p>
                    Grandma will be turning 90!! It will be so special for her
                    to be surrounded by everyone she loves. Be ready for food,
                    snacks, drinks, and desserts of all kinds. Come hungry and
                    please try to be on time!
                  </p>
                </dd>
              </div>
            </dl>
          </div>
          {/* Host list */}
          <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-gray-900">Hosts</h2>
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
          <div className="-mt-2 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-gray-900">Guests</h2>
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
                    <p className="text-sm text-gray-500 truncate">Host</p>
                  </a>
                </div>
              </div>
              <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
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
              <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
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
              <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
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
    </>
  )
}

export default EventDetail

function shareIconFilled(styles) {
  return (
    <svg
      className={styles}
      style={{
        // width: "1em",
        // height: "1em",
        // verticalAlign: "middle",
        // overflow: "hidden",
        fill: "currentColor"
      }}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M204.8 1023.931733a204.8 204.8 0 0 1-204.8-204.8v-614.4a204.8 204.8 0 0 1 204.8-204.8h136.533333a68.266667 68.266667 0 1 1 0 136.533334H204.8a68.266667 68.266667 0 0 0-68.266667 68.266666v614.4a68.266667 68.266667 0 0 0 68.266667 68.266667h614.4a68.266667 68.266667 0 0 0 68.266667-68.266667v-136.533333a68.266667 68.266667 0 0 1 136.533333 0v136.533333a204.8 204.8 0 0 1-204.8 204.8z m88.2688-292.864a68.266667 68.266667 0 0 1 0-96.6656l497.8688-497.595733H614.4a68.266667 68.266667 0 0 1 0-136.533333h341.333333a68.266667 68.266667 0 0 1 68.266667 68.266666v341.333334a68.266667 68.266667 0 0 1-136.533333 0V233.198933l-497.8688 498.346667a68.744533 68.744533 0 0 1-96.529067 0z"
        fill="#8F9BB3"
      />
    </svg>
  )
}

function eventIcon(styles) {
  return (
    <svg
      className={styles}
      style={{
        fill: "currentColor"
      }}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 1000 1000"
      enableBackground="new 0 0 1000 1000"
      xmlSpace="preserve"
    >
      <metadata>Svg Vector Icons : http://www.onlinewebfonts.com/icon</metadata>
      <g>
        <g>
          <g>
            <path d="M385.7,643.2l-15.3,90.7c-2.1,12.4,3,24.9,13.2,32.3c10.2,7.4,23.7,8.4,34.8,2.6l81.6-42.6l81.6,42.6c4.8,2.5,10.1,3.8,15.3,3.8c6.9,0,13.7-2.2,19.5-6.3c10.2-7.4,15.3-19.9,13.2-32.3l-15.3-90.7l65.7-64.4c9-8.8,12.2-21.9,8.3-33.9c-3.9-11.9-14.2-20.7-26.7-22.5l-91-13.5l-41-82.4c-5.6-11.2-17.1-18.4-29.6-18.4c-12.5,0-24,7.1-29.7,18.4l-41,82.4l-91,13.5c-12.5,1.8-22.8,10.6-26.6,22.5c-3.9,11.9-0.7,25.1,8.3,33.9L385.7,643.2z" />
            <path d="M891.1,108.1H786.9V50.2c0-26.5-21.5-48-48-48h-7.6c-26.5,0-48,21.5-48,48v57.8H315.5V50.2c0-26.5-21.5-48-48-48h-7.6c-26.5,0-48,21.5-48,48v57.8h-103c-54.5,0-98.9,44.3-98.9,98.9v692c0,54.5,44.4,98.9,98.9,98.9h782.3c54.5,0,98.9-44.4,98.9-98.9v-692C990,152.4,945.6,108.1,891.1,108.1z M878.2,886H121.8V347.3h756.5V886z" />
          </g>
        </g>
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
      </g>
    </svg>
  )
}
