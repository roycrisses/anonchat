# 🚀 Firebase Hosting Deployment Guide

This guide will help you deploy VidChat to Firebase Hosting while keeping your domain on Netlify.

## 📋 Prerequisites

1. **Firebase Project**: You need a Firebase project with Firestore enabled
2. **Firebase CLI**: Install Firebase CLI globally
3. **Node.js**: Required for Firebase CLI

## 🔧 Setup Steps

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Update Configuration Files

#### Update `.firebaserc`
Replace `your-firebase-project-id` with your actual Firebase project ID:

```json
{
  "projects": {
    "default": "your-actual-firebase-project-id"
  }
}
```

#### Update `vidchat.html`
Replace the Firebase config with your actual configuration:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

### 4. Initialize Firebase Hosting

```bash
firebase init hosting
```

When prompted:
- Select your project
- Use `.` as public directory
- Configure as single-page app: **No**
- Don't overwrite `vidchat.html`

### 5. Deploy to Firebase

```bash
firebase deploy --only hosting
```

## 🌐 Domain Configuration

### Firebase Hosting URL
After deployment, your app will be available at:
```
https://your-project-id.web.app
https://your-project-id.firebaseapp.com
```

### Netlify Domain Setup

1. **Go to Netlify Dashboard**
2. **Add Custom Domain** to your site
3. **Configure DNS**:
   - Add CNAME record pointing to `your-project-id.web.app`
   - Or use Netlify's domain forwarding

#### Option 1: CNAME Record
```
Type: CNAME
Name: vidchat (or your preferred subdomain)
Value: your-project-id.web.app
```

#### Option 2: Domain Forwarding
In Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Set up forwarding to Firebase URL

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
Create `.github/workflows/firebase-deploy.yml`:

```yaml
name: Deploy to Firebase
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '16'
    - run: npm install -g firebase-tools
    - run: firebase deploy --only hosting --token "${{ secrets.FIREBASE_TOKEN }}"
```

## 🔒 Security Configuration

### 1. Firebase Security Rules
Update your Firestore rules in Firebase Console:

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

### 2. Google OAuth Setup
1. Go to Google Cloud Console
2. Add Firebase hosting domains to authorized origins:
   - `https://your-project-id.web.app`
   - `https://your-project-id.firebaseapp.com`
   - Your custom Netlify domain

## 📱 Testing

### 1. Test Firebase Hosting
```bash
firebase serve
```
Visit: `http://localhost:5000`

### 2. Test Production
Visit your Firebase hosting URL and test:
- Google OAuth login
- Video chat functionality
- WebRTC connections

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Config Error**
   - Verify your Firebase config in `vidchat.html`
   - Check project ID in `.firebaserc`

2. **OAuth Not Working**
   - Add Firebase domains to Google OAuth authorized origins
   - Check browser console for errors

3. **WebRTC Issues**
   - Ensure HTTPS is used (Firebase Hosting provides this)
   - Check camera/microphone permissions

4. **Deployment Fails**
   - Check Firebase CLI version: `firebase --version`
   - Verify project access: `firebase projects:list`

### Debug Commands

```bash
# Check Firebase status
firebase projects:list

# View hosting configuration
firebase hosting:channel:list

# Test locally
firebase serve --only hosting

# View logs
firebase hosting:channel:open
```

## 📊 Monitoring

### Firebase Console
- **Hosting**: Monitor traffic and performance
- **Firestore**: Check database usage
- **Analytics**: Track user engagement

### Performance
- Firebase Hosting provides CDN distribution
- Automatic HTTPS
- Global edge caching

## 🔄 Updates

To update your deployment:

1. **Make changes** to your code
2. **Test locally**: `firebase serve`
3. **Deploy**: `firebase deploy --only hosting`

## 📞 Support

- **Firebase Documentation**: https://firebase.google.com/docs/hosting
- **Firebase Console**: https://console.firebase.google.com
- **Firebase CLI**: `firebase --help`

---

**Note**: This setup gives you the benefits of Firebase Hosting (CDN, HTTPS, global distribution) while maintaining your Netlify domain for branding. 