import { TransactionRepository } from '../repositories/transaction'
// import { TransactionTypeRepository } from '../repositories/transactionType'
import { CartRepository } from '../repositories/cart'

const transactionRepository = new TransactionRepository()
// const transactionTypeRepository = new TransactionTypeRepository()
const cartRepository = new CartRepository()
export class Transaction {
  async createEmpty(data: any, context: any): Promise<any> {
    const emptyTransaction = await transactionRepository.createEmpty(context.auth.uid, data.referencePeriod)
    return emptyTransaction
  }

  async save(data: any, context: any): Promise<any> {
    const referencePeriod = data.referencePeriod
    const transaction = { ...data.transaction }
    const userId = context.auth.uid
    await transactionRepository.save(userId, referencePeriod, transaction)
    const cart = await cartRepository.get(userId, referencePeriod)
    console.log(cart)
    console.log(transaction)
    if (cart) {
      cart.income += parseFloat(transaction.value.replace(/,/g, '.'))
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
    console.log('aaaaaaaaa')
    const cart = await cartRepository.get(userId, referencePeriod)
    if (cart) {
      cart.income += transaction.value
      await cartRepository.save(userId, referencePeriod, cart)
    }
  }
}
