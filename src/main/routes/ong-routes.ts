import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddOngController } from '../factories/ong/ong'

export default (router: Router): void => {
  router.post('/ongs', adaptRoute(makeAddOngController()))
}
