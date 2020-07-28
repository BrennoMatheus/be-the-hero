import { Controller } from '../../../presentation/protocols'
import { AddIncidentController } from '../../../presentation/controllers/incident/add-incident-controller'
import { DbAddIncident } from '../../../data/usecases/add-incident/db-add-incident'
import { makeIncidentValidation } from './incident-validation'
import { IncidentRepository } from '../../../infra/db/mysql/typeorm/incident-repository/incident-repository'

export const makeAddIncidentController = (): Controller => {
  const addIncidentRepository = new IncidentRepository()
  const dbAddIncident = new DbAddIncident(addIncidentRepository)
  const validation = makeIncidentValidation()
  const addOngController = new AddIncidentController(dbAddIncident,validation)
  return addOngController
}
