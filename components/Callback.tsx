import React from "react"
import { NextPage } from "next"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import withLayout from "./../hocs/withLayout"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
import { MagicContext, LoggedInContext, LoadingContext } from "./Store"

import Section from "./Layout/Section"

interface Props {}

const Callback: NextPage<Props> = ({}) => {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = React.useContext(LoggedInContext)
  const [isLoading, setIsLoading] = React.useContext(LoadingContext)
  const [magic] = React.useContext(MagicContext)

  const handleOAuth = async () => {
    let DIDT = null
    try {
      const result = await magic.oauth.getRedirectResult()
      const profile = result.oauth.userInfo
      // console.log("profile:", profile)

      if (profile) handleLogin(magic, profile)
    } catch (error) {
      window.location.href = window.location.origin
      // console.error(error)
    }
  }

  React.useEffect(() => {
    if (window.location.pathname === "/callback" && magic) {
      if (router.query.provider) {
        handleOAuth()
      }
    }
  }, [router.query])

  // React.useEffect(() => {
  //   console.log("magic:", magic)
  //   console.log("loggedIn:", loggedIn)
  // }, [])

  async function handleLogin(magic: any, profile: any) {
    const userInfo = {
      firstName: profile.givenName,
      lastName: profile.familyName,
      imageUrl: profile.picture
    }
    try {
      const idToken = await magic.user.getIdToken()
      /* Pass the Decentralized ID token in the Authorization header to the database */
      let res = await fetch(`/api/user/login`, {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + idToken
        }),
        body: JSON.stringify(userInfo)
      })

      let data = await res.json()

      /* If the user is authorized, return an object containing the user properties (issuer, publicAddress, email) */
      /* Else, the login was not successful and return false */
      let user = data.authorized ? data.user : false
      if (user) {
        setLoggedIn(user.email)
        // get authRedirectUrl from localstorage
        let authRedirectUrl = localStorage.getItem("authRedirectUrl")
        if (authRedirectUrl) {
          localStorage.removeItem("authRedirectUrl")
          window.location.href = authRedirectUrl
        } else {
          Router.push("/")
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Section>
      <img
        className="ml-auto mr-auto block rounded-3xl text-center"
        width="350"
        src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
      ></img>
    </Section>
  )
}

export default withLayout(Callback)
