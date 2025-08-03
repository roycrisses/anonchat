# 🚀 Quick VidChat Deployment Guide

## Step 1: Get Your Firebase Configuration

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project** (or create a new one)
3. **Get Firebase Config**:
   - Click ⚙️ (Settings) → "Project settings"
   - Scroll to "Your apps" section
   - Click "Add app" → Web (</>)
   - Register app and copy the config

## Step 2: Update Configuration Files

### Update `firebase-config.js`
Replace the placeholder config with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Update `vidchat.html`
Replace the Firebase config in the script section (around line 110):

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Update `.firebaserc`
Replace with your actual project ID:

```json
{
  "projects": {
    "default": "YOUR_ACTUAL_PROJECT_ID"
  }
}
```

## Step 3: Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode"
4. Select location and click "Done"

## Step 4: Deploy to Firebase Hosting

### Option A: Using the Deployment Script
```bash
deploy-firebase.bat
```

### Option B: Manual Deployment
```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## Step 5: Configure Google OAuth

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select your Firebase project**
3. **Go to "APIs & Services" → "Credentials"**
4. **Add authorized origins**:
   - `https://YOUR_PROJECT_ID.web.app`
   - `https://YOUR_PROJECT_ID.firebaseapp.com`

## Step 6: Test Your Deployment

Your VidChat app will be available at:
- `https://YOUR_PROJECT_ID.web.app`
- `https://YOUR_PROJECT_ID.firebaseapp.com`

## 🔧 Troubleshooting

### Common Issues:

1. **"Firebase not initialized" error**
   - Check that you've updated both `firebase-config.js` and `vidchat.html`
   - Ensure all Firebase config values are correct

2. **"Permission denied" error**
   - Make sure Firestore is in test mode
   - Check Firestore rules in Firebase Console

3. **"Project not found" error**
   - Verify your project ID in `.firebaserc`
   - Make sure you have access to the Firebase project

4. **Google OAuth not working**
   - Add Firebase domains to Google OAuth authorized origins
   - Check browser console for errors

## 📝 What You Need to Replace:

1. **`YOUR_ACTUAL_API_KEY`** - Your Firebase API key
2. **`YOUR_PROJECT_ID`** - Your Firebase project ID
3. **`YOUR_SENDER_ID`** - Your Firebase messaging sender ID
4. **`YOUR_APP_ID`** - Your Firebase app ID

## ✅ Success Checklist:

- [ ] Firebase config updated in both files
- [ ] Project ID updated in `.firebaserc`
- [ ] Firestore database created
- [ ] Firebase CLI installed and logged in
- [ ] App deployed successfully
- [ ] Google OAuth configured
- [ ] Video chat functionality working

---

**Your VidChat app will use the same Firebase project as AnonChat, so both apps will share the same backend infrastructure!** 🎉 