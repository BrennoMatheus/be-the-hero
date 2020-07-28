import { AddIncident } from '../../../domain/usecases/add-incident'
import { Validation } from '../../protocols/validation'
import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helper'

export class AddIncidentController implements Controller {
  private readonly addIncident: AddIncident
  private readonly validation: Validation

  constructor (addIncident: AddIncident,validation: Validation) {
    this.addIncident = addIncident
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!Object.prototype.hasOwnProperty.call(httpRequest.headers,'authorization')) {
        return unauthorized()
      }

      const data = httpRequest.body

      data.ong_id = httpRequest.headers.authorization

      const error = this.validation.validate(data)

      if (error) return badRequest(error)

      const incident = await this.addIncident.add(data)

      return ok(incident)
    } catch (error) {
      return serverError(error)
    }
  }
}
