/* This example requires Tailwind CSS v2.0+ */
import { NextPage } from "next"
import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  title: string
  useSelectedOptionAsDefault: boolean
  options: Array<Option>
  currentValue: any
  handleChangeValue: (value: any) => void
}

interface Option {
  icon: JSX.Element
  iconActive: JSX.Element
  activeStyles?: string
  label: string
  value: any
}

const DropdownWithIcons: NextPage<Props> = ({
  title,
  useSelectedOptionAsDefault,
  options,
  currentValue,
  handleChangeValue
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            {useSelectedOptionAsDefault &&
            Number.isInteger(currentValue) &&
            currentValue !== 0 ? (
              options.map((option: Option) => {
                const active = option.value === currentValue
                if (active) {
                  return (
                    <Menu.Button
                      className={`inline-flex justify-center w-full rounded-md 
                        border shadow-sm px-4 py-2 text-sm font-medium 
                        hover:bg-gray-50 focus:outline-none
                        ${
                          option.activeStyles
                            ? option.activeStyles
                            : "bg-white border-gray-300 text-gray-700"
                        }`}
                    >
                      {option.iconActive}
                      {option.label}
                    </Menu.Button>
                  )
                }
              })
            ) : (
              <Menu.Button
                className="inline-flex justify-center w-full rounded-md 
              border border-gray-300 shadow-sm px-4 py-2 bg-white 
              text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                {/* <QuestionMarkCircleIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" /> */}
                {title}
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            )}
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
            >
              <div className="py-1">
                {options.map((option: Option) => {
                  const active = option.value === currentValue
                  return (
                    <Menu.Item key={option.value}>
                      <button
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "group flex items-center px-4 py-2 text-sm w-full hover:bg-gray-100"
                        )}
                        onClick={() => handleChangeValue(option.value)}
                      >
                        {option.icon}
                        {option.label}
                      </button>
                    </Menu.Item>
                  )
                })}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default DropdownWithIcons
