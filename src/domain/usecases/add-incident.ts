import { IncidentModel } from '../models/incident'

export interface AddIncidentModel {
  title: string
  description: string
  value: string
  ong_id: string
}

export interface AddIncident {
  add: (incident: AddIncidentModel) => Promise<IncidentModel>
}
