import { createConnection, getRepository } from 'typeorm'
import { Ong } from '../entity/ong'

import { OngRepository } from './ong-repository'
import { AddOngModel } from '../../../../../domain/usecases/add-ong'

const makeSut = (): OngRepository => {
  return new OngRepository()
}

const makeFakeOngData = (): AddOngModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  whatsapp: '81999999999',
  city: 'any_city',
  uf: 'any_uf'
})

const clearOngTable = async (): Promise<void> => {
  await getRepository(Ong)
    .createQueryBuilder()
    .delete()
    .execute()
}

describe('Ong TypeOrm Repository', () => {
  beforeAll(async () => {
    await createConnection()
  })

  afterAll(async () => {
    await clearOngTable()
  })

  test('Should return an ong on success', async () => {
    const sut = makeSut()
    const fakeOngData = makeFakeOngData()

    const ong = await sut.add(fakeOngData)

    expect(ong).toBeTruthy()
    expect(ong.id).toBe(fakeOngData.id)
    expect(ong.name).toBe(fakeOngData.name)
    expect(ong.email).toBe(fakeOngData.email)
    expect(ong.whatsapp).toBe(fakeOngData.whatsapp)
    expect(ong.city).toBe(fakeOngData.city)
    expect(ong.uf).toBe(fakeOngData.uf)
  })
})
