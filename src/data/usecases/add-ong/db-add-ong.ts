import { AddOng, AddOngModel } from '../../../domain/usecases/add-ong'
import { OngIdGenerator } from '../../protocols/cryptography/ong-id-generator'
import { AddOngRepository } from '../../protocols/db/add-ong-repository'
import { OngModel } from '../../../domain/models/ong'

export class DbAddOng implements AddOng {
  private readonly cryptoOngIdGenerator: OngIdGenerator

  private readonly addOngRepository: AddOngRepository

  constructor (cryptoOngIdGenerator: OngIdGenerator,addOngRepository: AddOngRepository) {
    this.cryptoOngIdGenerator = cryptoOngIdGenerator
    this.addOngRepository = addOngRepository
  }

  async add (ong: AddOngModel): Promise<OngModel> {
    ong.id = this.cryptoOngIdGenerator.generate()
    return await this.addOngRepository.add(ong)
  }
}
