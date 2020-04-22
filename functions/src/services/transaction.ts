import { TransactionRepository } from '../repositories/transaction'
import { Cart } from './cart'

const transactionRepository = new TransactionRepository()
const cart = new Cart()
export class Transaction {
  async createEmpty(data: any, context: any): Promise<any> {
    const emptyTransaction = await transactionRepository.createEmpty(context.auth.uid, data.referencePeriod)
    return emptyTransaction
  }

  async save(data: any, context: any): Promise<any> {
    const referencePeriod = data.referencePeriod
    const transaction = { ...data.transaction }
    transaction.actions = {
      saving: false,
      removing: false,
      newTransaction: false,
      disableFields: true,
      editing: false
    }
    const userId = context.auth.uid
    await transactionRepository.save(userId, referencePeriod, transaction)
    await cart.update(userId, referencePeriod, transaction)
  }

  async remove(data: any, context: any): Promise<any> {
    const referencePeriod = data.referencePeriod
    const transaction = { ...data.transaction }
    await transactionRepository.remove(context.auth.uid, referencePeriod, transaction)
  }
}
