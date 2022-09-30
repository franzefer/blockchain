import crypto from 'crypto'

export class Block {
  static count = 0
  data = ''
  sign = ''
  number = 0
  prevHash = ''
  hash = ''

  constructor(data: string, sign?: string) {
    Block.count += 1
    this.number = Block.count
    this.setField('data', data)
    if (sign) {
      this.setField('sign', sign)
    }
  }

  private calculateHash() {
    this.hash = crypto
      .createHash('sha256')
      .update(this.data + this.prevHash + this.sign + this.number)
      .digest('hex')
  }

  private getEncryptByPublicKey(privateKey) {
    const bufferedData = Buffer.from(this.data + this.prevHash + this.number)
    const signedData = crypto.sign('SHA256', bufferedData, privateKey)
    return signedData.toString('base64')
  }

  setField(fieldName: 'sign' | 'data' | 'prevHash', value: string) {
    if (fieldName === 'sign') {
      this.sign = this.getEncryptByPublicKey(value)
    }
    if (fieldName === 'data') {
      this.data = value
    }
    if (fieldName === 'prevHash') {
      this.prevHash = value
    }
    this.calculateHash()
  }
}
