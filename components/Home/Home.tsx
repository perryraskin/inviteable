import React from "react"
import { NextPage } from "next"
import Router from "next/router"
import withLayout from "../../hocs/withLayout"
import utilities from "../../utilities"

import Landing from "../Home/Landing"
import EventForm from "../Event/EventForm"
import EventDetail from "../Event/EventDetail"
import Button from "../Elements/Button"
import SimpleDropdown from "../SimpleDropdown"

interface Props {}

const Home: NextPage<Props> = ({}) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">{/* <EventDetail /> */}</div>
    </div>
  )

  // return <Landing />
}

export default withLayout(Home)
