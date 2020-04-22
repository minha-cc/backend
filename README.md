# Minha.cc business logic - Firebase Functions

## Overall project structure:

/ repositories
|-- cart.ts: responsible for cart model on firestore database
|-- transaction.ts: responsible for transaction model on firestore database
|-- transactionType.ts: responsible for transaction type model on firestore database
/ services
|-- transaction.ts: has two public methods that should be called by app clients:
     createEmpty: that will be create an empty transaction;
     save: that will persist the transaction on database, also will orchestrate other business rules
/ index.ts: will expose all callable endpoints

## Environment:
* Firebase Functions
* Firebase Firestore

## Deploy:
firebase deploy --only functions
