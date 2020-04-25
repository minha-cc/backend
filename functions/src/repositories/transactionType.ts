import * as admin from 'firebase-admin'

export class TransactionTypeRepository {
  async getAllGlobal(userId: string, referencePeriod: string) {
    return this.transactionTypeReference(userId)
  }

  async getById(userId: string, id: string) {
    const cartDoc = await this.transactionTypeReference(userId).doc(id).get()
    return cartDoc.data()
  }

  async copyAllGlobalToUser(userId: string) {
    const globalTransactionTypes = await this.globalTransactionTypeReference().get()
    globalTransactionTypes.forEach(async (globalTransactionType) => {
      await this.transactionTypeReference(userId).add(globalTransactionType.data())
    })
  }

  private transactionTypeReference(userId: string) {
    return admin
      .firestore()
      .collection('accounts')
      .doc(userId)
      .collection('transactionTypes')
  }

  private globalTransactionTypeReference() {
    return admin
      .firestore()
      .collection('transactionTypes')
  }
}
