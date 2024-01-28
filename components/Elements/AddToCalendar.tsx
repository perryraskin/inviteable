import { ChevronDownIcon } from "@heroicons/react/solid"
import React, { useEffect, useMemo, useRef, useState } from "react"

import makeUrls, { CalendarEvent } from "../../utilities/calendarUrls"
import { Menu, Transition } from "@headlessui/react"
import { classNames } from "../../utilitites"

type CalendarURLs = ReturnType<typeof makeUrls>

const useAutoFocus = () => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const previous = document.activeElement
    const element = elementRef.current

    if (element) {
      element.focus()
    }

    if (previous instanceof HTMLElement) {
      return () => previous.focus()
    }

    return undefined
  }, [])

  return elementRef
}

type OpenStateToggle = (event?: React.MouseEvent) => void

const useOpenState = (initialOpen: boolean): [boolean, OpenStateToggle] => {
  const [open, setOpen] = useState<boolean>(initialOpen)
  const onToggle = () => setOpen(current => !current)

  useEffect(() => {
    if (open) {
      const onClose = () => setOpen(false)
      document.addEventListener("click", onClose)

      return () => document.removeEventListener("click", onClose)
    }

    return undefined
  }, [open, setOpen])

  return [open, onToggle]
}

type CalendarRef = HTMLAnchorElement
type CalendarProps = {
  children: React.ReactNode
  filename?: string
  href: string
}

const Calendar = React.forwardRef<CalendarRef, CalendarProps>(
  ({ children, filename = false, href }, ref) => (
    <a
      className="p-4 hover:bg-gray-50 focus:outline-none px-4 py-3 text-sm font-medium flex"
      ref={ref}
      download={filename}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
)

type DropdownProps = {
  filename: string
  onToggle: OpenStateToggle
  urls: CalendarURLs
  isHost: boolean
}

const Dropdown: React.FC<DropdownProps> = ({
  filename,
  onToggle,
  urls,
  isHost
}) => {
  const ref = useAutoFocus() as React.RefObject<HTMLAnchorElement>
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onToggle()
    }
  }

  return (
    <div
      className={`bg-white rounded-md w-11/12 sm:w-auto`}
      onKeyDown={onKeyDown}
      role="presentation"
    >
      <Calendar href={urls.ics} filename={filename} ref={ref}>
        <svg
          version="1.1"
          id="Livello_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="12px"
          viewBox="0 0 814 1000"
          enableBackground="new 0 0 814 1000"
        >
          <path d="M788.1,340.9c-5.8,4.5-108.2,62.2-108.2,190.5c0,148.4,130.3,200.9,134.2,202.2c-0.6,3.2-20.7,71.9-68.7,141.9  c-42.8,61.6-87.5,123.1-155.5,123.1s-85.5-39.5-164-39.5c-76.5,0-103.7,40.8-165.9,40.8s-105.6-57-155.5-127  C46.7,790.7,0,663,0,541.8c0-194.4,126.4-297.5,250.8-297.5c66.1,0,121.2,43.4,162.7,43.4c39.5,0,101.1-46,176.3-46  C618.3,241.7,720.7,244.3,788.1,340.9z M554.1,159.4c31.1-36.9,53.1-88.1,53.1-139.3c0-7.1-0.6-14.3-1.9-20.1  c-50.6,1.9-110.8,33.7-147.1,75.8c-28.5,32.4-55.1,83.6-55.1,135.5c0,7.8,1.3,15.6,1.9,18.1c3.2,0.6,8.4,1.3,13.6,1.3  C464,230.7,521.1,200.3,554.1,159.4z" />
        </svg>
        <span className="ml-2">Apple Calendar</span>
      </Calendar>
      <Calendar href={urls.google}>
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            marginTop: "2px",
            marginLeft: "-2px"
          }}
        >
          <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
            <path
              fill="#4285F4"
              d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
            />
            <path
              fill="#34A853"
              d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
            />
            <path
              fill="#FBBC05"
              d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
            />
            <path
              fill="#EA4335"
              d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
            />
          </g>
        </svg>
        <span style={{ marginLeft: "6px" }}>Google Calendar</span>
      </Calendar>
      {/* <Calendar href={urls.ics} filename={filename}>
        Outlook
      </Calendar>
      <Calendar href={urls.outlook}>Outlook Web App</Calendar>
      <Calendar href={urls.yahoo}>Yahoo</Calendar> */}
    </div>
  )
}

type AddToCalendarProps = {
  event: CalendarEvent
  open?: boolean
  filename?: string
  isHost?: boolean
}

const AddToCalendar: React.FC<AddToCalendarProps> = ({
  event,
  filename = "download",
  open: initialOpen = false,
  isHost = false
}) => {
  const [open, onToggle] = useOpenState(initialOpen)
  const urls = useMemo<CalendarURLs>(() => makeUrls(event), [event])

  return (
    <div className="sm:inline-flex rounded-md">
      <Menu as="div" className="relative -ml-px block">
        <Menu.Button className="w-full text-center relative sm:inline-flex items-center shadow-sm rounded-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
          <span className="sr-only">Open options</span>
          <span className="sm:hidden text-sm font-medium text-gray-700">
            Options
          </span>
          <ChevronDownIcon
            className="ml-1 mr-2 sm:ml-0 sm:mr-0 h-5 w-5 inline"
            aria-hidden="true"
          />
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-full sm:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Dropdown
                isHost={isHost}
                filename={filename}
                onToggle={onToggle}
                urls={urls}
              />
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
  // return (
  //   <div>
  //     {event && (
  //       <button
  //         type="button"
  //         className="w-full inline-flex justify-center px-4 sm:px-1 py-2 border border-gray-300
  //   shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50
  //   focus:outline-none"
  //         onClick={onToggle}
  //       >
  //         <ChevronDownIcon className="-ml-1 mr-2 sm:ml-0 sm:mr-0 h-5 w-5 text-gray-400" />
  //         <span className="sm:hidden">Options</span>
  //       </button>
  //     )}
  //     {open && (
  //       <Dropdown
  //         isHost={isHost}
  //         filename={filename}
  //         onToggle={onToggle}
  //         urls={urls}
  //       />
  //     )}
  //   </div>
  // )
}

export default AddToCalendar
