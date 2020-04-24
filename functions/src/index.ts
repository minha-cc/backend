import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { User } from './services/user'
import { Transaction } from './services/transaction'
import * as createTransaction from './functions/createTransaction'
admin.initializeApp()

const user = new User()
const transaction = new Transaction()
module.exports = {
  // users
  'createUser' : functions.https.onCall(user.create),

  // transactions
  'createEmptyTransaction' : functions.https.onCall(transaction.createEmpty),
  'saveTransaction': functions.https.onCall(createTransaction.createTransaction),
  'removeTransaction': functions.https.onCall(transaction.remove)

  // cart

}
