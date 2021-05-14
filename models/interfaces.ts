export interface Event {
  id: Number
  dateCreated: Date
  userId: Number
  title: string
  dateTimeStart: Date
  dateTimeEnd: Date
  locationName: string
  latitude: Number
  longitude: Number
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
  price: Number
  imageUrl: string
  details: string
  Host: User
}

export interface User {}
