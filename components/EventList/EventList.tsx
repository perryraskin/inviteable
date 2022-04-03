import React from "react"
import { NextPage } from "next"
import Link from "next/link"
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/solid"
import { Event, User } from "../../models/interfaces"
import dayjs from "dayjs"

const positions = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
    applicants: [
      {
        name: "Dries Vincent",
        email: "dries.vincent@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        name: "Lindsay Walton",
        email: "lindsay.walton@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        name: "Courtney Henry",
        email: "courtney.henry@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        name: "Tom Cook",
        email: "tom.cook@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ]
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
    applicants: [
      {
        name: "Whitney Francis",
        email: "whitney.francis@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        name: "Leonard Krasner",
        email: "leonard.krasner@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        name: "Floyd Miles",
        email: "floy.dmiles@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ]
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
    applicants: [
      {
        name: "Emily Selman",
        email: "emily.selman@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        name: "Kristin Watson",
        email: "kristin.watson@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        name: "Emma Dorsey",
        email: "emma.dorsey@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ]
  }
]

interface Props {
  user: User
  events: Event[]
}

const EventList: NextPage<Props> = ({ user, events }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-b-md">
      <ul role="list" className="divide-y divide-gray-200">
        {events.map(event => (
          <li key={event.id} onClick={() => setIsLoading(true)}>
            <Link href={`/events/${event.id}`}>
              <a
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
                              {dayjs(event.dateTimeStart).format(
                                "MMMM D, YYYY"
                              )}
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
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventList
