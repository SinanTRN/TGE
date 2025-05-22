export const getFirebaseErrorMessage = (errorString) => {
    switch (errorString) {
        case "auth/invalid-email":
            return "Geçersiz e-posta adresi.";
        case "auth/user-not-found":
            return "Kullanıcı bulunamadı.";
        case "auth/wrong-password":
            return "Şifre hatalı.";
        case "auth/email-already-in-use":
            return "Bu e-posta zaten kullanımda.";
        case "auth/weak-password":
            return "Şifre en az 6 karakter olmalı.";
        case "auth/network-request-failed":
            return "İnternet bağlantınızı kontrol edin.";
        case "auth/invalid-credential":
            return "E-posta veya şifre hatalı.";
        default:
            return "Bir hata oluştu. Lütfen tekrar deneyinnnn.";
    }
};

