import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export async function createUser(request: any, response: any): Promise<any> {
  try {
    const data = request
    console.log(data)
    const user = await admin.auth().createUser({email: data.email, password: data.password, displayName: data.displayName})
    return { ...user }
  } catch (error) {
    console.log('createUser error:', error)
    throw new functions.https.HttpsError('internal', error);
  }
}
