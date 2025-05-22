import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";


// Kullanıcı profilini getir
export const getUserProfile = async (uid) => {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data() : null;
};

// Kullanıcı profilini güncelle
export const updateUserProfile = async (uid, profileData) => {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, profileData, { merge: true });
};

// Kullanıcıyı ilk defa kaydet (kayıt sonrası)
export const createUserProfile = async (uid, profileData) => {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, profileData);
};
// Kullanıcı profilini güncelle
export const updateUserPhoto = async (uid, photoURL) => {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, { photoURL });
    } catch (error) {
        console.error("Profil fotoğrafı güncellenemedi:", error);
        throw error;
    }
};
