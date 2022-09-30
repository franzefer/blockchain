import { logBlockData } from './utils'
import { Block } from './Block'

export class Blockchain {
  private chain: Block[] = []

  constructor() {
    this.chain = [this.getGenesisBlock()]
  }

  private getGenesisBlock(): Block {
    return new Block('GENESIS_BLOCK')
  }

  addBlock(block: Block) {
    block.setField('prevHash', this.getLastBlock().hash)
    this.chain = this.chain.concat([block])
  }

  getBlockByNumber(number: number): Block | undefined {
    return this.chain.find((el) => el.number === number)
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1]
  }

  log() {
    this.chain.forEach((block) => logBlockData(block))
  }

  isValid() {
    return this.chain.every((block, i, blocks) => {
      return i === 0 || block.prevHash == blocks[i - 1].hash
    })
  }
}
