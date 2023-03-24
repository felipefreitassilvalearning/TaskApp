import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'yourAPIKey',
    authDomain: 'nomedoseuprojeto.firebaseapp.com',
    projectId: 'nomedoseuprojeto',
    storageBucket: 'nomedoseuprojeto.appspot.com',
    messagingSenderId: 'yourMessagingSenderId',
    appId: 'yourAppId',
    measurementId: 'yourMeasurementId'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
