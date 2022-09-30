import crypto from 'crypto'
import fs from 'fs'
import { generateRSAKeys } from './utils'
import { Block } from './Block'
import { Blockchain } from './Blockchain'

const blockchain = new Blockchain()
const { publicKey, privateKey } = generateRSAKeys()

fs.writeFileSync('keys.pem', publicKey + privateKey)

for (let i = 0; i < 5; i++) {
  blockchain.addBlock(new Block(`secret data number ${i}`, privateKey))
}

blockchain.log()
console.log('before the damage blockchain valid:' + blockchain.isValid())

blockchain.getBlockByNumber(2).setField('data', 'damage')
blockchain.getBlockByNumber(2).setField('sign', privateKey)

blockchain.log()
console.log('after the damage blockchain valid:' + blockchain.isValid())

