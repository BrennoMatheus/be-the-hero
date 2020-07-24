import { OngIdGenerator } from '../../data/protocols/cryptography/ong-id-generator'
import crypto = require('crypto')

export class CryptoOngIdGenerator implements OngIdGenerator {
  generate (): string {
    return crypto.randomBytes(4).toString('hex')
  }
}
