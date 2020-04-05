const dao = require('../dao/transaction')

export class Transaction {
  async createEmpty(data: any, context: any): Promise<any> {
    const emptyTransaction = await dao.createEmpty(context.auth.uid, data.referencePeriod)
    console.log('--')
    console.log(emptyTransaction)
    return emptyTransaction
  }
}
