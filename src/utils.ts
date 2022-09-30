import crypto from 'crypto'
import { Block } from './Block'

export const generateRSAKeys = () => {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  })
}

export const logBlockData = (block: Block) => {
  console.log(`
  BLOCK N${block.number}_______________________________
  prevHash: ${block.prevHash}
  data: ${block.data}
  sign: ${block.sign}
  hash: ${block.hash}
  `)
}

export const getByteArrayFromString = (string: string) => {
  let ssidByteArray = []
  let buffer = Buffer.from(string)
  return ssidByteArray
}
