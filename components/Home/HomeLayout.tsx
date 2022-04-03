import React from "react"
import { NextPage } from "next"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import withLayout from "../../hocs/withLayout"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

import Landing from "./Landing"
// import Dashboard from "./Dashboard"

interface Props {}

const HomeLayout: NextPage<Props> = ({}) => {
  return <Landing />
}

export default withLayout(HomeLayout)
