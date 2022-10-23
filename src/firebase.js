import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc
} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzW0n5siO4Xgt89Hc68X0LycfffqFBkec",
  authDomain: "presale-test-f0e35.firebaseapp.com",
  projectId: "presale-test-f0e35",
  storageBucket: "presale-test-f0e35.appspot.com",
  messagingSenderId: "365396656983",
  appId: "1:365396656983:web:7c06441e3b0c2143b4f412",
  measurementId: "G-0Q04R96J7S",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const db = getFirestore(app)

export async function stageContract(address, deployer, description) {
  try {
    const docRef = await addDoc(collection(db, "contracts"), {
      address,
      deployer,
      description,
    })
  } catch {
    throw "failed"
  }
}

export async function getContracts() {
  try {
    const snap = await getDocs(collection(db, "contracts"))
    let docs = []
    snap.docs.forEach((doc) => {
      docs.push(doc.data())
    })
    return docs
  } catch (error) {
    throw error
  }
}



export async function getMyContracts(deployer) {
  let q = query(collection(db, "contracts"), where("deployer", "==", deployer))
  try {
    const snap = await getDocs(q)
    let docs = []
    snap.docs.forEach((doc) => {
      docs.push(doc.data())
    })
    return docs
  } catch (error) {
    throw error
  }
}

export async function getMyContract(address) {
  let q = query(collection(db, "contracts"), where("address", "==", address))
  try {
    const snap = await getDocs(q)
    let docs = []
    snap.docs.forEach((doc) => {
      docs.push(doc.data())
    })
    return docs
  } catch (error) {
    throw error
  }
}
