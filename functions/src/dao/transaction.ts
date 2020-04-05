import * as admin from 'firebase-admin'

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

const createEmpty = async function(userId: string, referencePeriod: string) {
  const emptyDoc = createEmptyDoc()
  const emptyTransaction = await transactionReference(userId, referencePeriod).add(emptyDoc)
  const createdTransaction = (await emptyTransaction.get()).data()
  return createdTransaction
}

const save = async function(userId: string, referencePeriod: string, transaction: any) {
  await transactionReference(userId, referencePeriod).doc(transaction.id).set(transaction)
}

const remove = async function(userId: string, referencePeriod: string, transaction: any) {
  await transactionReference(userId, referencePeriod).doc(transaction.id).delete()
}

module.exports = {
  createEmpty,
  save,
  remove
}
