import * as admin from 'firebase-admin'

export class TransactionTypeRepository {
  async getAll(userId: string, referencePeriod: string) {
    return this.transactionTypeReference(userId)
  }

  async getById(userId: string, id: string) {
    return this.transactionTypeReference(userId).doc(id)
  }

  private transactionTypeReference(userId: string) {
    return admin
      .firestore()
      .collection('accounts')
      .doc(userId)
      .collection('transactionTypes')
  }
}
