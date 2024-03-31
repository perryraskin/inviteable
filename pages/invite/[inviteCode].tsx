import React, { useState, useEffect, useContext } from "react"
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next"
import { NextSeo } from "next-seo"
import absoluteUrl from "next-absolute-url"
import { useRouter } from "next/router"

interface Props {
  inviteCode?: string
  event?: string
  errors?: any
}

const InviteRedirectPage: NextPage<Props> = ({
  inviteCode,
  event,
  errors
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  useEffect(() => {
    if (event) {
      router.push(`/events/${event.id}?inviteCode=${inviteCode}`)
    }
  }, [event])
  if (errors) return <p className="mt-10 text-center">{errors}</p>
  return (
    <>
      <NextSeo
        title={`RSVP to ${event?.title}`}
        description={"You're invited to an event on inviteable.app"}
        openGraph={{
          site_name: `RSVP to ${event?.title}`,
          title: `RSVP to ${event?.title}`,
          description: "You're invited to an event on inviteable.app",
          images: [
            {
              url: event?.designImageUrl ?? event?.imageUrl,
              width: 800,
              height: 600,
              alt: "You're invited to an event on inviteable.app"
            },
            {
              url: event?.designImageUrl ?? event?.imageUrl,
              width: 800,
              height: 418,
              alt: "You're invited to an event on inviteable.app"
            },
            {
              url: event?.designImageUrl ?? event?.imageUrl,
              width: 1200,
              height: 627,
              alt: "You're invited to an event on inviteable.app"
            }
          ]
        }}
        twitter={{
          handle: "@inviteable_",
          site: "@inviteable_",
          cardType: "summary_large_image"
        }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: `<lottie-player class="mx-auto" src="https://lottie.host/embed/a5f6cc39-aa31-4450-a00c-fb22ff7b4dea/Am02a0joXZ.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></lottie-player>`
        }}
      ></div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { req, params } = ctx
  const { origin } = absoluteUrl(req)
  const { inviteCode } = params
  let event
  let code

  try {
    const res = await fetch(`${origin}/api/invite/${inviteCode}`)
    const data = await res.json()
    event = data.event
    code = data.code
    console.log(data)
  } catch (error) {
    // console.log(error)
  }
  // console.log(event)

  if (code === 404) {
    return {
      props: {
        errors: "Event not found :("
      }
    }
  } else if (event) {
    return {
      props: {
        inviteCode,
        event
      }
    }
  } else {
    return {
      props: {
        errors: "Sorry, something went wrong :("
      }
    }
  }
}

export default InviteRedirectPage
