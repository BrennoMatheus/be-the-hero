import { AddIncidentModel } from '../../../domain/usecases/add-incident'
import { IncidentModel } from '../../../domain/models/incident'

export interface AddIncidentRepository {
  add: (addOngModel: AddIncidentModel) => Promise<IncidentModel>
}
