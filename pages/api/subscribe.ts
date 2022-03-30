export default async function(req, res) {
  const { email_address } = req.query
  // console.log(req.query)

  try {
    const url =
      "https://emailoctopus.com/api/1.6/lists/0cbf4ff1-b032-11ec-9258-0241b9615763/contacts"
    const data = {
      api_key: "11a992fc-eb4c-4d1f-97f0-8d09f3c3d99b",
      email_address,
      status: "SUBSCRIBED"
    }
    console.log(data)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const json = await response.json()
    res.status(200).json(json)
  } catch (err) {
    res.status(400)
    res.json({ error: err.message })
  } finally {
  }
}
