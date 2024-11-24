export async function claimEvent(userId: string, eventId: number) {
  // if (user) {
  fetch(`/api/event/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      event: {
        userId: userId
      }
    })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        window.location.reload()
      }
    })
  // } else {
  //   localStorage.setItem(
  //     "authRedirectUrl",
  //     `${window.location.origin}/events/${eventId}?claim=true`
  //   )
  // }
}
