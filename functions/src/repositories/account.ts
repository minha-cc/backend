import * as admin from 'firebase-admin'
import { generateUUID } from '../commons/uuid'

export class AccountRepository {
  async create(userId: string) {
    const accountId = generateUUID()
    await this.accountReference().doc(userId).set( { accountId } )
  }

  private accountReference() {
    return admin
      .firestore()
      .collection('accounts')
  }
}
