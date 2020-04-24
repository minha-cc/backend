import * as admin from 'firebase-admin'

async function createTransaction(data: any, context: any): Promise<any> {
  const userId = <string> context.auth.uid
  const referencePeriod = <string> data.referencePeriod
  let transaction = { ...data.transaction }
  transaction = updateTransaction
  
  const batch = admin.firestore().batch()
  const transactionDoc = transactionReference(userId, referencePeriod).doc(transaction.id)
  batch.update(transactionDoc, transaction)
  const cart = await updateCart(userId, referencePeriod, transaction)
  batch.set(cartReference(userId, referencePeriod), cart)
  return batch.commit()
}

function updateTransaction(transaction: any): any {
  transaction.actions = {
    saving: false,
    removing: false,
    newTransaction: false,
    disableFields: true,
    editing: false
  }
  return transaction
}

async function updateCart(userId: string, referencePeriod: string, transaction: any, operation?: string) {
  const transactionType = await getTransactionTypeById(userId, transaction.transactionTypeId)
  let cart = await getCart(userId, referencePeriod)
  let transactionValue = parseFloat(transaction.value.replace(/,/g, '.'))
  if (operation && operation === 'remove') {
    transactionValue = -transactionValue
  }
  if (cart) {
    cart = await updateCartValues(transactionType, cart, transactionValue)
  }
  return cart  
}

async function updateCartValues(transactionType: any, cart: any, transactionValue: number) {
  if (transactionType._type === 'incomes') {
    cart.income += transactionValue
    return cart
  } else {
    const outcome = cart.outcome += transactionValue
    return updateTransactionGroups(cart, transactionType, transactionValue, outcome)
  }
}

function updateTransactionGroups(cart: any, transactionType: any, transactionValue: number, outcome: number): any {
  const transactionGroups = ['essential', 'whises', 'savings']

  for(const transactionGroup of transactionGroups) {
    let transactionGroupValue = cart[transactionGroup].value
    if (transactionType.group === transactionGroup) {
      transactionGroupValue = cart[transactionGroup].value += transactionValue
    }
    cart[transactionGroup].percentage = (transactionGroupValue / outcome) * 100 || 0.0
  }
  return cart
}

async function getTransactionTypeById(userId: string, id: string) {
  const cartDoc = await transactionTypeReference(userId).doc(id).get()
  return cartDoc.data()
}

async function getCart(userId: string, referencePeriod: string) {
  const cartRef = cartReference(userId, referencePeriod)
  const cartDoc = await cartRef.get()
  if (cartDoc.exists) {
    return cartDoc.data()
  }
  
  const emptyCart = createEmptyCart()
  await cartRef.set(emptyCart)
  return emptyCart
}

function createEmptyCart() {
  return {
    income: 0.0,
    outcome: 0.0,
    essential: { value: 0.0, percentage: 0.0 },
    whises: { value: 0.0, percentage: 0.0 },
    savings: { value: 0.0, percentage: 0.0 }
  }
}

function transactionReference(userId: string, referencePeriod: string) {
  return admin.firestore()
    .collection('accounts')
    .doc(userId)
    .collection('transactions')
    .doc(referencePeriod)
    .collection('transactions')
}

function transactionTypeReference(userId: string) {
  return admin.firestore()
    .collection('accounts')
    .doc(userId)
    .collection('transactionTypes')
}

function cartReference(userId: string, referencePeriod: string) {
  return admin.firestore()
    .collection('accounts')
    .doc(userId)
    .collection('cart')
    .doc(referencePeriod)
}  

export { createTransaction }
