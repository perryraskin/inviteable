import React from "react"
import Head from "next/head"
import App from "next/app"
import Script from "next/script"
import { DefaultSeo } from "next-seo"
import { useRouter } from "next/router"

import "../styles/tailwind.css"
import "mapbox-gl/dist/mapbox-gl.css"

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const canonicalUrl = (
    `https://www.inviteable.app` + (router.asPath === "/" ? "" : router.asPath)
  ).split("?")[0]
  // const { Component, pageProps } = props
  return (
    <>
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
                "https://res.cloudinary.com/raskin-me/image/upload/v1622149313/inviteable/inviteable-logo-2-alt-2_l0n7mc.png",
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
        // Analytics Script
        <Script
          src="https://api.pirsch.io/pirsch.js"
          id="pirschjs"
          data-code="j367R1dAJFBl2vlor7pXa2e3KYn3QbkR"
          strategy="afterInteractive"
        />
      ) : (
        ""
      )}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
