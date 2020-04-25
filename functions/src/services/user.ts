import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { TransactionTypeRepository } from '../repositories/transactionType'
import { AccountRepository } from '../repositories/account'

const accountRepository = new AccountRepository()
const transactionTypeRepository = new TransactionTypeRepository()
export class User {
  async create(request: any, response: any): Promise<any> {
    try {
      const data = request
      const user = await admin.auth().createUser({email: data.email, password: data.password, displayName: data.displayName})
      await accountRepository.create(user.uid)
      await transactionTypeRepository.copyAllGlobalToUser(user.uid)
      return { ...user }
    } catch (error) {
      throw new functions.https.HttpsError('internal', error);
    }
  }
}
