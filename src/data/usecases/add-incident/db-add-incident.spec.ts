import { AddIncidentModel } from '../../../domain/usecases/add-incident'
import { IncidentModel } from '../../../domain/models/incident'
import { AddIncidentRepository } from '../../protocols/db/add-incident-repository'
import { DbAddIncident } from './db-add-incident'

const makeFakeIncident = (): IncidentModel => ({
  id: 'id',
  title: 'any_title',
  description: 'any_description',
  value: 'any_value',
  ong_id: 'any_id'
})

const makeAddIncidentRepositoryStub = (): AddIncidentRepository => {
  class AddIncidentRepositoryStub implements AddIncidentRepository {
    async add (addIncidentModel: AddIncidentModel): Promise<IncidentModel> {
      return new Promise(resolve => resolve(makeFakeIncident()))
    }
  }
  return new AddIncidentRepositoryStub()
}

interface SutTypes {
  sut: DbAddIncident
  addOngRepositoryStub: AddIncidentRepository

}

const makeSut = (): SutTypes => {
  const addOngRepositoryStub = makeAddIncidentRepositoryStub()
  const sut = new DbAddIncident(addOngRepositoryStub)
  return {
    sut,
    addOngRepositoryStub
  }
}

describe('DbAddOng Usecase', () => {
  test('Should call AddIncidentRepository with correct values', async () => {
    const { sut,addOngRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addOngRepositoryStub,'add')
    const ongData = makeFakeIncident()

    await sut.add(ongData)

    expect(addSpy).toHaveBeenCalledWith(makeFakeIncident())
  })

  test('Should throw if AddIncidentRepository throws',async () => {
    const { sut,addOngRepositoryStub } = makeSut()
    const ongData = makeFakeIncident()
    jest.spyOn(addOngRepositoryStub,'add')
      .mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))

    const promise = sut.add(ongData)

    await expect(promise).rejects.toThrow()
  })

  test('Should returnan ong on success', async () => {
    const { sut } = makeSut()
    const ongData = makeFakeIncident()
    const ong = await sut.add(ongData)

    expect(ong).toEqual(makeFakeIncident())
  })
})
