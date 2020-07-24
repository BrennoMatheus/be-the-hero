import { AddOngModel } from '../../../domain/usecases/add-ong'
import { OngModel } from '../../../domain/models/ong'

export interface AddOngRepository {
  add: (addOngModel: AddOngModel) => Promise<OngModel>
}
