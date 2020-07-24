import { AddOngController } from './add-ong-controller'
import { AddOng, AddOngModel } from '../../../domain/usecases/add-ong'
import { OngModel } from '../../../domain/models/ong'
import { HttpRequest } from '../../protocols'
import { serverError, ok, badRequest } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'
import { MissingParamError } from '../../errors'

interface SutTypes {
  sut: AddOngController
  addOngStub: AddOng
  validationStub: Validation
}

const makeFakeOng = (): OngModel => ({
  id: 'id',
  name: 'any_name',
  email: 'any_email@mail.com',
  whatsapp: '81999999999',
  city: 'any_city',
  uf: 'any_uf'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    whatsapp: '81999999999',
    city: 'any_city',
    uf: 'any_uf'
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

const makeAddOng = (): AddOng => {
  class AddOngStub implements AddOng {
    async add (ong: AddOngModel): Promise<OngModel> {
      return new Promise(resolve => resolve(makeFakeOng()))
    }
  }
  return new AddOngStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addOngStub = makeAddOng()
  const sut = new AddOngController(addOngStub,validationStub)
  return {
    sut,
    addOngStub,
    validationStub
  }
}

describe('Add Ong Controller', () => {
  test('Should call AddOng with correct values', async () => {
    const { sut,addOngStub } = makeSut()
    const addSpy = jest.spyOn(addOngStub,'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  test('Should return 500 if AddOng throws', async () => {
    const { sut,addOngStub } = makeSut()

    jest.spyOn(addOngStub,'add').mockImplementationOnce(
      async () => new Promise((resolve,reject) => reject(new Error()))
    )

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return an OngModel if succeds', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok(makeFakeOng()))
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
