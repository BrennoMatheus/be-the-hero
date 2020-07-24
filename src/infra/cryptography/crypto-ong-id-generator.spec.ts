import { CryptoOngIdGenerator } from './crypto-ong-id-generator'
import crypto = require('crypto')

jest.mock('crypto', () => ({
  randomBytes (number: number): Buffer {
    return Buffer.from([1000])
  }
}))

const makeSut = (): CryptoOngIdGenerator => {
  return new CryptoOngIdGenerator()
}

describe('CryptoOngId Generator ', () => {
  test('Should call randomBytes with correct value', () => {
    const sut = makeSut()
    const randomBytesSpy = jest.spyOn(crypto,'randomBytes')

    sut.generate()
    expect(randomBytesSpy).toHaveBeenCalledWith(4)
  })

  test('Should return an valid id on success', () => {
    const sut = makeSut()
    const id = sut.generate()
    expect(id).toBe(crypto.randomBytes(4).toString('hex'))
  })
})
