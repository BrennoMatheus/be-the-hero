import { AddIncident, AddIncidentModel } from '../../../domain/usecases/add-incident'
import { IncidentModel } from '../../../domain/models/incident'
import { AddIncidentRepository } from '../../protocols/db/add-incident-repository'

export class DbAddIncident implements AddIncident {
  private readonly addIncidentRepository: AddIncidentRepository

  constructor (addIncidentRepository: AddIncidentRepository) {
    this.addIncidentRepository = addIncidentRepository
  }

  async add (ong: AddIncidentModel): Promise<IncidentModel> {
    return await this.addIncidentRepository.add(ong)
  }
}
