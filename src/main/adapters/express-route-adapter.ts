import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    console.log(httpResponse)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
