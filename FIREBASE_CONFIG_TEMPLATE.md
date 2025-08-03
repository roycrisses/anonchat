# 🔧 Firebase Configuration Template

## Step 1: Get Your Firebase Config
1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project
3. Click ⚙️ (Settings) → Project settings
4. Scroll to "Your apps" section
5. Click "Add app" → Web (</>)
6. Register app and copy the config

## Step 2: Update Files

### Update `.firebaserc`
Replace `your-firebase-project-id` with your actual project ID:

```json
{
  "projects": {
    "default": "YOUR_ACTUAL_PROJECT_ID_HERE"
  }
}
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

## Step 3: Enable Hosting
1. In Firebase Console, go to "Hosting" in the left sidebar
2. Click "Get started"
3. Install Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```
4. Login to Firebase:
   ```bash
   firebase login
   ```
5. Initialize hosting:
   ```bash
   firebase init hosting
   ```
6. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

## Step 4: Set Up Google OAuth
1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Select your project
3. Go to "APIs & Services" → "Credentials"
4. Create OAuth 2.0 Client ID
5. Add authorized origins:
   - `https://YOUR_PROJECT_ID.web.app`
   - `https://YOUR_PROJECT_ID.firebaseapp.com`
   - Your custom domain (if using Netlify)

## Step 5: Update Firestore Rules
In Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /videoChat/{document} {
      allow read, write: if true; // For development
    }
  }
}
``` 