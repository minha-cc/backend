# Minha.cc business logic - Firebase Functions

## Overall project structure:

````
/ repositories
|-- cart.ts: responsible for cart model on firestore database
|-- transaction.ts: responsible for transaction model on firestore database
|-- transactionType.ts: responsible for transaction type model on firestore database
/ services
|-- transaction.ts: has two public methods that should be called by app clients:
     createEmpty: that will create an empty transaction;
     save: that will persist the transaction on database, also will orchestrate other business rules
/ index.ts: will expose all callable endpoints
````
## Endpoints:
* createUser:
     * creates the user on Firebase Auth;
     * creates account on Firestore database;
     * copies global transaction types to the user.
* createEmptyTransaction: persists an empty transaction on Firestore each time that user clicks on `+`;
* saveTransaction:
     * persist the updated transaction on Firestore;
     * updates the user cart.
* removeTransaction:
     * remove the transaction from Firestore;
     * updates the user cart.

## Environment:
* Firebase Functions
* Firebase Firestore

## Deploy:
firebase deploy --only functions
