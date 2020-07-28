import { AddIncidentController } from './add-incident-controller'
import { AddIncident, AddIncidentModel } from '../../../domain/usecases/add-incident'
import { Validation } from '../../protocols/validation'
import { IncidentModel } from '../../../domain/models/incident'
import { HttpRequest } from '../../protocols'
import { serverError, ok, badRequest, unauthorized } from '../../helpers/http/http-helper'
import { MissingParamError } from '../../errors'

interface SutTypes {
  sut: AddIncidentController
  addOngStub: AddIncident
  validationStub: Validation
}

const makeFakeIncident = (): IncidentModel => ({
  id: 'id',
  title: 'any_title',
  description: 'any_description',
  value: 'any_value',
  ong_id: 'ong_id'
})

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    authorization: 'ong_id'
  },
  body: {
    title: 'any_title',
    description: 'any_description',
    value: 'any_value'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddIncident = (): AddIncident => {
  class AddIncidentStub implements AddIncident {
    async add (incident: AddIncidentModel): Promise<IncidentModel> {
      return new Promise(resolve => resolve(makeFakeIncident()))
    }
  }
  return new AddIncidentStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addOngStub = makeAddIncident()
  const sut = new AddIncidentController(addOngStub,validationStub)
  return {
    sut,
    addOngStub,
    validationStub
  }
}

describe('Add Incident Controller', () => {
  test('Should call AddIncident with correct values', async () => {
    const { sut,addOngStub } = makeSut()
    const addSpy = jest.spyOn(addOngStub,'add')
    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith({
      title: httpRequest.body.title,
      description: httpRequest.body.description,
      value: httpRequest.body.value,
      ong_id: httpRequest.headers.authorization
    })
  })

  test('Should return 500 if AddIncident throws', async () => {
    const { sut,addOngStub } = makeSut()

    jest.spyOn(addOngStub,'add').mockImplementationOnce(
      async () => new Promise((resolve,reject) => reject(new Error()))
    )

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 401 if request dont have authorization', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      headers: {
      },
      body: {
        title: 'any_title',
        description: 'any_description',
        value: 'any_value'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return an IncidentModel if succeds', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(makeFakeIncident()))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
