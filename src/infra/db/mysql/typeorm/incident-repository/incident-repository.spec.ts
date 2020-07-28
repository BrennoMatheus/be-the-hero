import { AddIncidentRepository } from '../../../../../data/protocols/db/add-incident-repository'
import { AddIncidentModel } from '../../../../../domain/usecases/add-incident'
import { Incident } from '../entity/incident'
import { getRepository , createConnection } from 'typeorm'
import { IncidentRepository } from './incident-repository'

const makeSut = (): AddIncidentRepository => {
  return new IncidentRepository()
}

const makeFakeIncidentData = (): AddIncidentModel => ({
  title: 'any_title',
  description: 'any_description',
  value: 'any_value',
  ong_id: 'ong_id'
})

const clearIncidentTable = async (): Promise<void> => {
  await getRepository(Incident)
    .createQueryBuilder()
    .delete()
    .execute()
}

describe('Incident TypeOrm Repository', () => {
  beforeAll(async () => {
    await createConnection()
  })

  afterAll(async () => {
    await clearIncidentTable()
  })

  test('Should return an incident on success', async () => {
    const sut = makeSut()
    const fakeIncidentData = makeFakeIncidentData()

    const incident = await sut.add(fakeIncidentData)

    expect(incident).toBeTruthy()
    expect(incident.id).toBeTruthy()
    expect(incident.title).toBe(fakeIncidentData.title)
    expect(incident.description).toBe(fakeIncidentData.description)
    expect(incident.value).toBe(fakeIncidentData.value)
    expect(incident.ong_id).toBe(fakeIncidentData.ong_id)
  })
})
