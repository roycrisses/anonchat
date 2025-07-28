// Firebase Configuration Setup
// Replace with your actual Firebase project configuration from Firebase Console

const firebaseConfig = {
    // Your Firebase project configuration
    apiKey: "AIzaSyC_placeholder_replace_with_your_key",
    authDomain: "anonchat-app.firebaseapp.com", 
    projectId: "anonchat-app",
    storageBucket: "anonchat-app.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456789"
};

// Instructions for setup:
// 1. Go to Firebase Console: https://console.firebase.google.com/
// 2. Create a new project or select existing project
// 3. Go to Project Settings (gear icon)
// 4. Scroll to "Your apps" section
// 5. Click "Add app" → "Web"
// 6. Register your app with a nickname like "anonchat-web"
// 7. Copy the firebaseConfig object from the setup
// 8. Replace the placeholder values above with your actual config
// 9. Enable Firestore Database in "test mode" for development
// 10. Enable Authentication → Google sign-in method

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = firebaseConfig;
}