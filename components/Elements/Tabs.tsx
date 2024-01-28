import React from "react"
import { NextPage } from "next"
import Link from "next/link"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  tabs: Tab[]
  refreshData?: (currentTab: string) => void
}

interface Tab {
  name: string
  href: string
  current: boolean
}

const Tabs: NextPage<Props> = ({ tabs, refreshData }) => {
  const [currentTab, setCurrentTab] = React.useState(tabs[0])

  React.useEffect(() => {
    if (refreshData) {
      refreshData(currentTab.name.toLowerCase())
    }
  }, [currentTab])

  return (
    <div>
      {/* <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full border-gray-300 rounded-md"
          defaultValue={tabs.find(tab => currentTab.name === tab.name).name}
        >
          {tabs.map(tab => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div> */}
      <div className="">
        <nav
          className="relative z-0 shadow flex divide-x divide-gray-200"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <Link
              href={tab.href}
              key={tab.name}
              onClick={() => setCurrentTab(tab)}
              className={classNames(
                currentTab.name === tab.name
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-md rounded-b-none" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-md rounded-b-none" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 font-medium text-center hover:bg-gray-50 focus:z-10"
              )}
              aria-current={currentTab.name === tab.name ? "page" : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  currentTab.name === tab.name
                    ? "bg-red-400"
                    : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Tabs
