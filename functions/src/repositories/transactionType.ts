import * as admin from 'firebase-admin'

export class TransactionTypeRepository {
  async getAll(userId: string, referencePeriod: string) {
    return this.transactionTypeReference(userId)
  }

  async getById(userId: string, id: string) {
    const cartDoc = await this.transactionTypeReference(userId).doc(id).get()
    return cartDoc.data()
  }

  private transactionTypeReference(userId: string) {
    return admin
      .firestore()
      .collection('accounts')
      .doc(userId)
      .collection('transactionTypes')
  }
}
