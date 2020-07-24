import { Controller } from '../../../presentation/protocols'
import { OngRepository } from '../../../infra/db/mysql/typeorm/ong-repository/ong-repository'
import { CryptoOngIdGenerator } from '../../../infra/cryptography/crypto-ong-id-generator'
import { DbAddOng } from '../../../data/usecases/add-ong/db-add-ong'
import { AddOngController } from '../../../presentation/controllers/ong/add-ong-controller'
import { makeOngValidation } from './ong-validation'

export const makeAddOngController = (): Controller => {
  const ongRepository = new OngRepository()
  const ongIdGenerator = new CryptoOngIdGenerator()
  const addOng = new DbAddOng(ongIdGenerator,ongRepository)
  const ongValidation = makeOngValidation()
  const addOngController = new AddOngController(addOng,ongValidation)

  return addOngController
}
