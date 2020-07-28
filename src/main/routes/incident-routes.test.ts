import request from 'supertest'
import app from '../config/app'
import { createConnection, getRepository } from 'typeorm'
import { Incident } from '../../infra/db/mysql/typeorm/entity/incident'

const clearIncidentTable = async (): Promise<void> => {
  await getRepository(Incident)
    .createQueryBuilder()
    .delete()
    .execute()
}

describe('Incident Routes', () => {
  beforeAll(async () => {
    await createConnection()
  })

  afterAll(async () => {
    await clearIncidentTable()
  })

  test('Should return an incident on success', async () => {
    await request(app)
      .post('/api/incidents')
      .set('authorization','any_ong_id')
      .send({
        title: 'test',
        description: 'test',
        value: 'test'
      })
      .expect(200)
  })
})
