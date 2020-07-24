import { OngModel } from '../models/ong'

export interface AddOngModel {
  id?: string
  name: string
  email: string
  whatsapp: string
  city: string
  uf: string
}

export interface AddOng {
  add: (ong: AddOngModel) => Promise<OngModel>
}
