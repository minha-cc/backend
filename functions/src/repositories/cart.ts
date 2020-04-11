import * as admin from 'firebase-admin'

export class CartRepository {
  async save(userId: string, referencePeriod: string, cart: any) {
    const cartDoc = await this.cartReference(userId, referencePeriod)
    await cartDoc.set(cart)
  }

  async get(userId: string, referencePeriod: string) {
    const cartReference = this.cartReference(userId, referencePeriod)
    const cartDoc = await cartReference.get()
    if (cartDoc.exists) {
      return cartDoc.data()
    }
    
    const emptyCart = this.createEmptyCart()
    await cartReference.set(emptyCart)
    return emptyCart
  }

  private cartReference(userId: string, referencePeriod: string) {
    return admin
      .firestore()
      .collection('accounts')
      .doc(userId)
      .collection('cart')
      .doc(referencePeriod)
  }  

  private createEmptyCart() {
    return {
      income: 0.0,
      outcome: 0.0,
      essential: 0.0,
      whises: 0.0,
      savings: 0.0
    }
  }
}
