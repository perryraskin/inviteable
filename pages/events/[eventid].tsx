import React, { useState, useEffect, useContext } from "react"
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next"
//import absoluteUrl from "next-absolute-url"

import EventLayout from "../../components/Event/EventLayout"

import { Event } from "../../models/interfaces"

interface Props {
  eventid: string
  errors?: any
}

const EventDetailPage: NextPage<Props> = ({
  eventid,
  errors
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (errors) return <p className="mt-10 text-center">Error!</p>
  return <EventLayout eventid={eventid} />
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { req, params } = ctx
  const { eventid } = params

  if (eventid) {
    return {
      props: {
        eventid
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
