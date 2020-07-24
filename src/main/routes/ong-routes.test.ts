import request from 'supertest'
import app from '../config/app'
import { createConnection, getRepository } from 'typeorm'
import { Ong } from '../../infra/db/mysql/typeorm/entity/ong'

const clearOngTable = async (): Promise<void> => {
  await getRepository(Ong)
    .createQueryBuilder()
    .delete()
    .execute()
}

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await createConnection()
  })

  afterAll(async () => {
    await clearOngTable()
  })

  test('Should return an ong on success', async () => {
    await request(app)
      .post('/api/ongs')
      .send({
        name: 'test',
        email: 'test@mail.com',
        whatsapp: 'test',
        city: 'test',
        uf: 'test'
      })
      .expect(200)
  })
})
