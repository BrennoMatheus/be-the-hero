import { AddIncidentRepository } from '../../../../../data/protocols/db/add-incident-repository'
import { IncidentModel } from '../../../../../domain/models/incident'
import { AddIncidentModel } from '../../../../../domain/usecases/add-incident'
import { Incident } from '../entity/incident'
import { getRepository } from 'typeorm'

export class IncidentRepository implements AddIncidentRepository {
  async add (addIncidentModel: AddIncidentModel): Promise<IncidentModel> {
    return await getRepository(Incident).save(addIncidentModel)
  }
}
