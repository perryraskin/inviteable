import React from "react"
import Head from "next/head"
import App from "next/app"
import Script from "next/script"

import "../styles/tailwind.css"
import "mapbox-gl/dist/mapbox-gl.css"

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          ></meta>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#EF4444" />
          <meta name="msapplication-TileColor" content="#ef4444" />
          <meta name="theme-color" content="#ef4444" />
          {/* General tags */}
          <meta
            key="description"
            property="description"
            content="Events of any kind, with privacy in mind"
          />
          <title key="title">inviteable</title>
          {/* OpenGraph tags */}
          <meta
            key="og:url"
            property="og:url"
            content="https://inviteable.app"
          />
          <meta key="og:title" property="og:title" content="inviteable" />
          <meta
            key="og:description"
            property="og:description"
            content="Events of any kind, with privacy in mind"
          />
          <meta
            key="og:image"
            property="og:image"
            content="https://res.cloudinary.com/raskin-me/image/upload/v1622149313/inviteable/inviteable-logo-2-alt-2_l0n7mc.png"
          />
          <meta key="og:type" property="og:type" content="website" />
          {/* Twitter Card tags */}
          <meta
            key="twitter:title"
            property="twitter:title"
            content="inviteable"
          />
          <meta
            key="twitter:description"
            property="twitter:description"
            content="Events of any kind, with privacy in mind"
          />
          <meta
            key="twitter:image"
            property="twitter:image"
            content="https://res.cloudinary.com/raskin-me/image/upload/v1646583680/inviteable/inviteable-favicon-3_ao9dsi.png"
          />
          <meta key="twitter:card" property="twitter:card" content="summary" />
        </Head>
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
}

export default MyApp
