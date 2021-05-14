import React, { useState, useEffect, useContext } from "react"
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next"
//import absoluteUrl from "next-absolute-url"

import EventDetail from "../../components/EventDetail"

import { Event } from "../../models/interfaces"

interface Props {
  event?: Event
  errors?: any
}

const EventDetailPage: NextPage<Props> = ({
  event,
  errors
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <EventDetail event={event} />
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { req, params } = ctx
  const { eventid } = params
  // const { origin } = absoluteUrl(req)
  // const apiUrl = `${origin}/api/trip/${tripid}`
  // const apiUrl = `http://localhost:3000/api/trip/${tripid}`
  const apiUrl = `${process.env.BASE_URL}/api/event/${eventid}`

  // const cookies = parseCookies(ctx)
  // const { sessionId } = cookies
  //console.log('cookies:', cookies);
  //console.log('sessionId:', sessionId);
  const res = await fetch(apiUrl)
  const resData = await res.json()
  const { event } = resData
  //console.log("res:", event)

  if (event) {
    return {
      props: {
        event
      }
    }
  } else {
    return {
      props: {
        errors: "Not logged in!"
      }
    }
  }
}

export default EventDetailPage
