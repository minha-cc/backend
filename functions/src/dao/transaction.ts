import * as admin from 'firebase-admin'

export class TransactionDAO {
  async createEmpty(userId: string, referencePeriod: string) {
    const emptyDoc = createEmptyDoc()
    const emptyTransaction = await transactionReference(userId, referencePeriod).add(emptyDoc)
    const createdTransaction = (await emptyTransaction.get()).data()
    return createdTransaction
  }

  async save(userId: string, referencePeriod: string, transaction: any) {
    const doc = transactionReference(userId, referencePeriod).doc(transaction.id)
    await doc.update(transaction)
  }

  async remove(userId: string, referencePeriod: string, transaction: any) {
    await transactionReference(userId, referencePeriod).doc(transaction.id).delete()
  }
}

function transactionReference(userId: string, referencePeriod: string) {
  return admin
    .firestore()
    .collection('accounts')
    .doc(userId)
    .collection('transactions')
    .doc(referencePeriod)
    .collection('transactions')
}

function createEmptyDoc() {
  return {
    date: '',
    description: '',
    value: 0.0,
    transactionType: '',
    newTransaction: true,
    disableFields: false
  }
}
