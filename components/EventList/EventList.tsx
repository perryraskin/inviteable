import React from "react"
import { NextPage } from "next"
import Link from "next/link"
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/solid"
import { Event } from "../../models/interfaces"
import dayjs from "dayjs"
import Loader from "../Modals/Loader"

interface Props {
  events: Event[]
}

const EventList: NextPage<Props> = ({ events }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [loaderOpen, setLoaderOpen] = React.useState(false)
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-b-md">
      <Loader open={loaderOpen} setOpen={setLoaderOpen} />
      <ul role="list" className="divide-y divide-gray-200">
        {events.map(event => (
          <li key={event.id} onClick={() => setIsLoading(true)}>
            <Link
              href={`/events/${event.id}`}
              onClick={() => setLoaderOpen(true)}
              className={`block hover:bg-gray-50 ${
                isLoading ? "cursor-wait" : ""
              }`}
            >
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="sm:w-2/12 w-1/3">
                  <img
                    className="h-20 w-20 object-cover rounded-lg"
                    src={event.imageUrl}
                  ></img>
                </div>
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="">
                    <div className="flex">
                      <p className="font-medium">{event.title}</p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400"
                          aria-hidden="true"
                        />
                        <p>
                          <time
                            dateTime={dayjs(event.dateTimeStart).format(
                              "MMMM D, YYYY"
                            )}
                          >
                            {dayjs(event.dateTimeStart).format("MMMM D, YYYY")}
                          </time>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <div className="flex overflow-hidden -space-x-1">
                      {/* {position.applicants.map(applicant => (
                        <img
                          key={applicant.email}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          src={applicant.imageUrl}
                          alt={applicant.name}
                        />
                      ))} */}
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventList
