import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddIncidentController } from '../factories/incident/incident'

export default (router: Router): void => {
  router.post('/incidents', adaptRoute(makeAddIncidentController()))
}
