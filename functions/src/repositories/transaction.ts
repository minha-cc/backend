import * as admin from 'firebase-admin'

export class TransactionRepository {
  async createEmpty(userId: string, referencePeriod: string) {
    const emptyDoc = this.createEmptyDoc()
    const emptyTransaction = await this.transactionReference(userId, referencePeriod).add(emptyDoc)
    const createdTransaction = (await emptyTransaction.get()).data()
    return createdTransaction
  }

  async save(userId: string, referencePeriod: string, transaction: any) {
    const doc = this.transactionReference(userId, referencePeriod).doc(transaction.id)
    await doc.update(transaction)
  }

  async remove(userId: string, referencePeriod: string, transaction: any) {
    await this.transactionReference(userId, referencePeriod).doc(transaction.id).delete()
  }

  private transactionReference(userId: string, referencePeriod: string) {
    return admin
      .firestore()
      .collection('accounts')
      .doc(userId)
      .collection('transactions')
      .doc(referencePeriod)
      .collection('transactions')
  }

  private createEmptyDoc() {
    return {
      date: '',
      description: '',
      value: 0.0,
      transactionType: '',
      newTransaction: true,
      disableFields: false
    }
  }
}
