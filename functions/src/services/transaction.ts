import { TransactionRepository } from '../repositories/transaction'
import { TransactionTypeRepository } from '../repositories/transactionType'
import { CartRepository } from '../repositories/cart'

const transactionRepository = new TransactionRepository()
const transactionTypeRepository = new TransactionTypeRepository()
const cartRepository = new CartRepository()
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

    const transactionType = await transactionTypeRepository.getById(userId, transaction.transactionTypeId)
    const cart = await cartRepository.get(userId, referencePeriod)
    if (cart) {
      const transactionValue = parseFloat(transaction.value.replace(/,/g, '.'))
      if (transactionType && transactionType.type === 'íncomes') {
        cart.income += transactionValue
      } else {
        cart.outcome += transactionValue
      }
      await cartRepository.save(userId, referencePeriod, cart)
    }
  }

  async remove(data: any, context: any): Promise<any> {
    const referencePeriod = data.referencePeriod
    const transaction = data.transaction
    await transactionRepository.remove(context.auth.uid, referencePeriod, transaction)
  }

  async updateCart(userId: any, referencePeriod: any, transaction: any) {
    // const transactionType = transactionTypeRepository.getById(userId, transaction.transactionTypeId)
    const cart = await cartRepository.get(userId, referencePeriod)
    if (cart) {
      cart.income += transaction.value
      await cartRepository.save(userId, referencePeriod, cart)
    }
  }
}
