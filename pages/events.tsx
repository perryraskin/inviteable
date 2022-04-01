import React, { useState, useEffect, useContext } from "react"
import { NextPage } from "next"
import EventsLayout from "../components/EventList/EventsLayout"

interface Props {}

const Events: NextPage<Props> = ({}) => {
  return <EventsLayout />
}

export default Events
