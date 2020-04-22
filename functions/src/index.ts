import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { User } from './services/user'
import { Transaction } from './services/transaction'
admin.initializeApp()

const transaction = new Transaction()
const user = new User()
module.exports = {
  // users
  'createUser' : functions.https.onCall(user.create),

  // transactions
  'createEmptyTransaction' : functions.https.onCall(transaction.createEmpty),
  'saveTransaction': functions.https.onCall(transaction.save),
  'removeTransaction': functions.https.onCall(transaction.remove)

  // cart

}
