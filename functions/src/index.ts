import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { createUser } from './services/createUser'
import { Transaction } from './services/transaction'
admin.initializeApp()

const transaction = new Transaction()
module.exports = {
  'createUser' : functions.https.onCall(createUser),
  'createEmptyTransaction' : functions.https.onCall(transaction.createEmpty),
  'saveTransaction': functions.https.onCall(transaction.save),
  'removeTransaction': functions.https.onCall(transaction.remove)
}
