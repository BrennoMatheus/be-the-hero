import { OngModel } from '../../../domain/models/ong'
import { AddOngModel } from '../../../domain/usecases/add-ong'
import { OngIdGenerator } from '../../protocols/cryptography/ong-id-generator'
import { AddOngRepository } from '../../protocols/db/add-ong-repository'
import { DbAddOng } from './db-add-ong'

const makeFakeOng = (): OngModel => ({
  id: 'ong_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  whatsapp: '81999999999',
  city: 'any_city',
  uf: 'any_uf'
})

const makeFakeOngData = (): AddOngModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  whatsapp: '81999999999',
  city: 'any_city',
  uf: 'any_uf'
})

const makeCryptoOngIdGeneratorStub = (): OngIdGenerator => {
  class CryptoOngIdGeneratorStub implements OngIdGenerator {
    generate (): string {
      return 'ong_id'
    }
  }
  return new CryptoOngIdGeneratorStub()
}

const makeAddOngRepositoryStub = (): AddOngRepository => {
  class AddOngRepositoryStub implements AddOngRepository {
    async add (addOngModel: AddOngModel): Promise<OngModel> {
      return new Promise(resolve => resolve(makeFakeOng()))
    }
  }
  return new AddOngRepositoryStub()
}

interface SutTypes {
  sut: DbAddOng
  addOngRepositoryStub: AddOngRepository
  cryptoOngIdGeneratorStub: OngIdGenerator

}

const makeSut = (): SutTypes => {
  const cryptoOngIdGeneratorStub = makeCryptoOngIdGeneratorStub()
  const addOngRepositoryStub = makeAddOngRepositoryStub()
  const sut = new DbAddOng(cryptoOngIdGeneratorStub,addOngRepositoryStub)
  return {
    sut,
    addOngRepositoryStub,
    cryptoOngIdGeneratorStub
  }
}

describe('DbAddOng Usecase', () => {
  test('Should call CryptoAdapter',async () => {
    const { sut,cryptoOngIdGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(cryptoOngIdGeneratorStub,'generate')
    const ongData = makeFakeOngData()

    await sut.add(ongData)

    expect(generateSpy).toHaveBeenCalled()
  })

  test('Should call AddOngRepository with correct values', async () => {
    const { sut,addOngRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addOngRepositoryStub,'add')
    const ongData = makeFakeOngData()

    await sut.add(ongData)

    expect(addSpy).toHaveBeenCalledWith(makeFakeOng())
  })

  test('Should throw if AddOngRepository throws',async () => {
    const { sut,addOngRepositoryStub } = makeSut()
    const ongData = makeFakeOngData()
    jest.spyOn(addOngRepositoryStub,'add')
      .mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))

    const promise = sut.add(ongData)

    await expect(promise).rejects.toThrow()
  })

  test('Should returnan ong on success', async () => {
    const { sut } = makeSut()
    const ongData = makeFakeOngData()
    const ong = await sut.add(ongData)

    expect(ong).toEqual(makeFakeOng())
  })
})
