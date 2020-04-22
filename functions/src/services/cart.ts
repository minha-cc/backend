import { TransactionTypeRepository } from '../repositories/transactionType'
import { CartRepository } from '../repositories/cart'

const transactionTypeRepository = new TransactionTypeRepository()
const cartRepository = new CartRepository()

export class Cart {
  async update(userId: string, referencePeriod: string, transaction: any) {
    const transactionType = await transactionTypeRepository.getById(userId, transaction.transactionTypeId)
    let cart = await cartRepository.get(userId, referencePeriod)
    const transactionValue = parseFloat(transaction.value.replace(/,/g, '.'))
    if (cart) {
      cart = await this.updateCart(transactionType, cart, transactionValue)
      await cartRepository.save(userId, referencePeriod, cart)
    }
  }

  private async updateCart(transactionType: any, cart: any, transactionValue: number) {
    if (transactionType._type === 'incomes') {
      cart.income += transactionValue
      return cart
    } else {
      const outcome = cart.outcome += transactionValue
      return this.updateTransactionGroups(cart, transactionType, transactionValue, outcome)
    }
  }
  
  private updateTransactionGroups(cart: any, transactionType: any, transactionValue: number, outcome: number): any {
    const transactionGroups = ['essential', 'whises', 'savings']

    for(const transactionGroup of transactionGroups) {
      let transactionGroupValue = cart[transactionGroup].value
      if (transactionType.group === transactionGroup) {
        transactionGroupValue = cart[transactionGroup].value += transactionValue
      }
      cart[transactionGroup].percentage = (transactionGroupValue / outcome) * 100
    }
    return cart
  }
}
