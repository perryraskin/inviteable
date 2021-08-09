import React from "react"
import { NextPage } from "next"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import withLayout from "../../hocs/withLayout"
import utilities from "../../utilities"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
import { MagicContext, LoggedInContext, LoadingContext } from "../Store"

import Landing from "./Landing"
// import Dashboard from "./Dashboard"
import Section from "../Layout/Section"
// import Login from "../Forms/Login"

interface Props {}

const HomeLayout: NextPage<Props> = ({}) => {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = React.useContext(LoggedInContext)
  const [isLoading, setIsLoading] = React.useContext(LoadingContext)
  const [magic] = React.useContext(MagicContext)

  const handleOAuth = async () => {
    let DIDT = null
    try {
      const result = await magic.oauth.getRedirectResult()
      const profile = JSON.stringify(result.oauth.userInfo, undefined, 2)
      // console.log("profile:", profile)

      if (profile) handleLogin(magic)
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

  async function handleLogin(magic: any) {
    try {
      const idToken = await magic.user.getIdToken()
      /* Pass the Decentralized ID token in the Authorization header to the database */
      let res = await fetch(`/api/user/login`, {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + idToken
        })
      })

      let data = await res.json()

      /* If the user is authorized, return an object containing the user properties (issuer, publicAddress, email) */
      /* Else, the login was not successful and return false */
      let user = data.authorized ? data.user : false
      if (user) {
        setLoggedIn(user.email)
        Router.push("/")
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <Section>
        <img
          className="ml-auto mr-auto block text-center rounded-3xl"
          width="350"
          src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
        ></img>
      </Section>
    )
  } else if (loggedIn) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p>Logged in! This page will display your events :D</p>
        </div>
      </div>
    )
  } else
    return (
      <React.Fragment>
        <Landing />
        {/* <Login /> */}
      </React.Fragment>
    )
}

export default withLayout(HomeLayout)
