import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCMO_a5Lg78IvFblLzbu0v6ZRy05-pA8U4",
    authDomain: "eva3-64b00.firebaseapp.com",
    projectId: "eva3-64b00",
    storageBucket: "eva3-64b00.appspot.com",
    messagingSenderId: "560605020316",
    appId: "1:560605020316:web:b80a77372add8c47c06d59"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveVehicle = (vehiculo) => {
    return addDoc(collection(db, 'vehiculos'), vehiculo);
}

export const getVehicles = (callback) => {
    return onSnapshot(collection(db, 'vehiculos'), callback);
}

export const removeVehicle = (id) => {
    return deleteDoc(doc(db, 'vehiculos', id));
}

export const selectOneVehicle = (id) => {
    return getDoc(doc(db, 'vehiculos', id));
}

export const editVehicle = (id, vehiculo) => {
    return updateDoc(doc(db, 'vehiculos', id), vehiculo);
}

export const saveTenant = (arrendatario) => {
    return addDoc(collection(db, 'arrendatarios'), arrendatario);
}

export const getTenants = (callback) => {
    return onSnapshot(collection(db, 'arrendatarios'), callback);
}

export const removeTenant = (id) => {
    return deleteDoc(doc(db, 'arrendatarios', id));
}

export const selectOneTenant = (id) => {
    return getDoc(doc(db, 'arrendatarios', id));
}

export const editTenant = (id, arrendatario) => {
    return updateDoc(doc(db, 'arrendatarios', id), arrendatario);
}
