import React, { useState, useEffect, useContext } from "react"
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next"
import { NextSeo } from "next-seo"
import absoluteUrl from "next-absolute-url"

import EventLayout from "../../components/Event/EventLayout"

import { Event } from "../../models/interfaces"

interface Props {
  event: Event
  eventid: string
  inviteCode?: string
  claim?: boolean
  errors?: any
}

const EventDetailPage: NextPage<Props> = ({
  event,
  eventid,
  inviteCode,
  claim,
  errors
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (errors) return <p className="mt-10 text-center">Error!</p>
  return (
    <>
      <NextSeo
        title={event?.title}
        description={"You're invited to an event on inviteable.com"}
        openGraph={{
          site_name: event?.title,
          title: event?.title,
          description: "You're invited to an event on inviteable.com",
          images: [
            {
              url: event?.imageUrl,
              width: 800,
              height: 600,
              alt: "You're invited to an event on inviteable.com"
            }
          ]
        }}
        twitter={{
          handle: "@inviteable_",
          site: "@inviteable_",
          cardType: "summary_large_image"
        }}
      />
      <EventLayout eventId={eventid} inviteCode={inviteCode} claim={claim} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { req, params, query } = ctx
  const { origin } = absoluteUrl(req)
  const { eventid } = params
  const { inviteCode, claim } = query

  const res = await fetch(`${origin}/api/event/${eventid}&ssr=true`)
  const data = await res.json()
  const { authorized, event } = data

  if (event && eventid) {
    return {
      props: {
        event,
        eventid,
        inviteCode: inviteCode || null,
        claim: claim === "true" || false
      }
    }
  } else if (eventid) {
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
