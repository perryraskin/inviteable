export interface User {
  id: number
  firstName: string
  lastName: string
  imageUrl: string
  email: string
  issuer: string
  phone: string
  EventsHosted: Event[]
  EventsInvited: Guest[]
  ThreadsPosted: any[]
  CommentsPosted: any[]
}

export interface Event {
  id: Number
  dateCreated: Date
  userId: Number
  title: string
  dateTimeStart: Date
  dateTimeEnd: Date
  Address: Address
  price: Number
  imageUrl: string
  details: string
  inviteCode: string
  inviteUrl: string
  Host: User
  Settings: EventSettings
}

export interface EventSettings {
  id: Number
  dateCreated: Date
  eventId: Number
  isPrivate: boolean
  showGuestList: boolean
  allowComments: boolean
}

export interface Guest {
  id: Number
  dateCreated: Date
  eventId: Number
  userId: Number
  User: User
  Event: Event
  isHost: boolean
  response: Response
}

export interface Address {
  locationName: string
  latitude: Number
  longitude: Number
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
}

export enum Response {
  None,
  Accepted,
  Declined
}
