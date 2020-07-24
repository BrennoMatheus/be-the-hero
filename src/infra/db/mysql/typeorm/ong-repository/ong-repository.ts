
import { getRepository } from 'typeorm'
import { Ong } from '../entity/ong'
import { AddOngRepository } from '../../../../../data/protocols/db/add-ong-repository'
import { AddOngModel } from '../../../../../domain/usecases/add-ong'
import { OngModel } from '../../../../../domain/models/ong'

export class OngRepository implements AddOngRepository {
  async add (addOngModel: AddOngModel): Promise<OngModel> {
    return await getRepository(Ong).save(addOngModel)
  }
}
