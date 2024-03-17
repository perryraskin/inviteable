import React from "react"
import Head from "next/head"
import { ClerkProvider } from "@clerk/nextjs"
import Script from "next/script"
import { DefaultSeo } from "next-seo"
import { useRouter } from "next/router"

import "../styles/tailwind.css"
import "mapbox-gl/dist/mapbox-gl.css"
import "../styles/add-to-calendar.css"

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const canonicalUrl = (
    `https://www.inviteable.app` + (router.asPath === "/" ? "" : router.asPath)
  ).split("?")[0]
  // const { Component, pageProps } = props
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <DefaultSeo
        title="inviteable"
        description="Events of any kind, with privacy in mind"
        canonical={canonicalUrl}
        openGraph={{
          site_name: "inviteable",
          title: "inviteable",
          description: "Events of any kind, with privacy in mind",
          images: [
            {
              url:
                "https://inviteable.s3.amazonaws.com/images/1648769584238-pika-2022-03-31T232943.jpg",
              width: 800,
              height: 600,
              alt: "inviteable"
            }
          ]
        }}
        twitter={{
          handle: "@inviteable_",
          site: "@inviteable_",
          cardType: "summary_large_image"
        }}
        additionalLinkTags={[
          {
            rel: "apple-touch-icon",
            href: "/apple-touch-icon.png"
          }
        ]}
      />

      {process.env.NODE_ENV == "production" ? (
        <>
          <Script
            src="https://api.pirsch.io/pirsch.js"
            id="pirschjs"
            data-code="j367R1dAJFBl2vlor7pXa2e3KYn3QbkR"
            strategy="afterInteractive"
          />
          <Script
            src={`window.COFRAME_PAGE_ID="65f77a29315a94b6a95d29d4";`}
          ></Script>
          <Script src="https://cdn.jsdelivr.net/npm/coframe-ai/dist/cf.min.js"></Script>
        </>
      ) : (
        ""
      )}
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  )
}

export default MyApp
