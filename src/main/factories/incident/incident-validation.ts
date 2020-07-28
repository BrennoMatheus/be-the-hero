import { ValidationComposite, RequiredFieldValidation } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'

export const makeIncidentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['title', 'description', 'value']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
