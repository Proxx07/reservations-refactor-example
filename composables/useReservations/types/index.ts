import type { ITable } from '@composables/useTables/types';

export interface IReservation {
  id: number
  reserveId: number
  name: string
  phoneNumber: string
  countryCode: string
  personsCount: number
  currentPersonsCount: number
  timeStart: string | Date
  timeEnd: string | Date
  comment: string | null
  reservationComment: string | null
  status: number
  createdTime: string | Date
  updatedTime: string | Date
  items: ITable[]
  ticket: null
  createdUserId: number | null
  createdUser: {
    givenName: string
    surName: string | null
    phoneNumber: string
  } | null
  updatedUserId: number | null
  updatedUser: {
    givenName: string
    surName: string | null
    phoneNumber: string
  } | null
  guestUserId: number | null
  guestUser: {
    givenName: string
    surName: string | null
    phoneNumber: string
  } | null
  branchId: number
}
