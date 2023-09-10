export interface User {
  id: number
  firstName: string
  lastName: string
  imageUrl: string
  email: string
  issuer?: string
  phone?: string
  EventsHosted?: Event[]
  EventsInvited?: Guest[]
  ThreadsPosted?: any[]
  CommentsPosted?: any[]
}

export interface Event {
  id: number
  dateCreated: Date
  userId: number
  title: string
  dateTimeStart: Date
  dateTimeEnd: Date
  timeZone: string
  Address: Address[]
  price: number
  imageUrl: string
  detailsText: string
  detailsHtml: string
  Host: User
  Guests: Guest[]
  Settings: EventSettings
  Invites: EventInvite[]
  locationUrl?: string
}

export interface EventInvite {
  id: number
  dateCreated: Date
  eventId: number
  Event: Event
  code: string
  url: string
  redeemed: Boolean
}

export interface EventSettings {
  id: number
  dateCreated: Date
  eventId: number
  access: EventAccess
  showGuestList: boolean
  allowComments: boolean
}

export interface Guest {
  id: number
  dateCreated: Date
  eventId?: number
  userId?: number
  User?: User
  Event?: Event
  isHost: boolean
  response: GuestResponse
}

export interface Address {
  locationName: string
  latitude: number
  longitude: number
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
}

export enum GuestResponse {
  None,
  Accepted,
  Declined
}

export enum EventAccess {
  Private,
  Unlisted,
  Public
}
