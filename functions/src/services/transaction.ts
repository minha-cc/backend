import { TransactionDAO } from '../dao/transaction'

const transactionDAO = new TransactionDAO()
export class Transaction {
  async createEmpty(data: any, context: any): Promise<any> {
    const emptyTransaction = await transactionDAO.createEmpty(context.auth.uid, data.referencePeriod)
    return emptyTransaction
  }

  async save(data: any, context: any): Promise<any> {
    const referencePeriod = data.referencePeriod
    const transaction = { ...data.transaction }
    await transactionDAO.save(context.auth.uid, referencePeriod, transaction)
  }

  async remove(data: any, context: any): Promise<any> {
    const referencePeriod = data.referencePeriod
    const transaction = data.transaction
    await transactionDAO.remove(context.auth.uid, referencePeriod, transaction)
  }
}
