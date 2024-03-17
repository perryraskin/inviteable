import React from "react"
import { NextPage } from "next"
import EventsLayout from "../components/EventList/EventsLayout"
import { NextSeo } from "next-seo"

interface Props {}

const Events: NextPage<Props> = () => {
  return (
    <>
      <NextSeo title={"My Events | inviteable"} />
      <EventsLayout />
    </>
  )
}

export default Events
