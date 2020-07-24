
import { ok, serverError, badRequest } from '../../helpers/http/http-helper'
import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { AddOng } from '../../../domain/usecases/add-ong'
import { Validation } from '../../protocols/validation'

export class AddOngController implements Controller {
  private readonly addOng: AddOng
  private readonly validation: Validation

  constructor (addOng: AddOng,validation: Validation) {
    this.addOng = addOng
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const data = httpRequest.body

      const error = this.validation.validate(data)

      if (error) return badRequest(error)

      const ong = await this.addOng.add(data)
      return ok(ong)
    } catch (error) {
      return serverError(error)
    }
  }
}
