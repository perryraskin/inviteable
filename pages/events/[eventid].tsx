import React, { useState, useEffect, useContext } from "react"
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next"
//import absoluteUrl from "next-absolute-url"

import EventLayout from "../../components/Event/EventLayout"

import { Event } from "../../models/interfaces"

interface Props {
  eventid: string
  inviteCode?: string
  claim?: boolean
  errors?: any
}

const EventDetailPage: NextPage<Props> = ({
  eventid,
  inviteCode,
  claim,
  errors
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (errors) return <p className="mt-10 text-center">Error!</p>
  return <EventLayout eventId={eventid} inviteCode={inviteCode} claim={claim} />
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { req, params, query } = ctx
  const { eventid } = params
  const { inviteCode, claim } = query

  if (eventid) {
    return {
      props: {
        eventid,
        inviteCode: inviteCode || null,
        claim: claim === "true" || false
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
