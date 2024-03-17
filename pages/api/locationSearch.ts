import { NextApiRequest, NextApiResponse } from "next"
import { getAuth } from "@clerk/nextjs/server"

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req)

  const { method, query } = req

  try {
    switch (method) {
      case "GET":
        const mapBoxRes = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${query.query}.json?proximity=ip&access_token=pk.eyJ1IjoicGVycnlyYXNraW4iLCJhIjoiY2tvdXRscHh5MDBlaDJ2cG0wNGJnbml2eSJ9.WwSSb7bOp1T0JlWILpAANg`
        )
        const json = await mapBoxRes.json()
        const { features } = json

        res.status(200)
        res.json({
          authorized: true,
          locations: features.map(feature => {
            const shortAddress =
              (feature.address ? feature.address + " " : "") +
              feature.text +
              " " +
              (feature.context?.find(c => c.id.includes("place"))
                ? feature.context?.find(c => c.id.includes("place"))?.text +
                  ", "
                : "") +
              (feature.context?.find(c => c.id.includes("region"))
                ? feature.context?.find(c => c.id.includes("region"))?.text
                : "")
            return {
              id: feature.id,
              name: shortAddress,
              latitude: feature.center[1],
              longitude: feature.center[0],
              address:
                (feature.address ? feature.address + " " : "") + feature.text,
              place: feature.context?.find(c => c.id.includes("place"))?.text,
              region: feature.context?.find(c => c.id.includes("region"))?.text,
              postcode: feature.context?.find(c => c.id.includes("postcode"))
                ?.text,
              country: feature.context?.find(c => c.id.includes("country"))
                ?.text
            }
          })
        })
        break
      case "PUT":
        break

      case "POST":
        break
      default:
      // res.setHeader("Allow", ["GET", "POST"])
      // res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (err) {
    res.status(500)
    res.json({ authorized: false, error: err.message })
  }
}
