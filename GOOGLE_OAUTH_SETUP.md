# 🔐 Google OAuth Setup Guide

This guide will help you set up Google OAuth for the AnonChat login functionality.

## 📋 Prerequisites

- A Google account
- Access to Google Cloud Console

## 🔧 Step 1: Create Google Cloud Project

### 1.1 Access Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Create a new project or select an existing one

### 1.2 Enable Google+ API
1. In the left sidebar, click "APIs & Services" → "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on it and press "Enable"

## 🔑 Step 2: Configure OAuth Consent Screen

### 2.1 Set up OAuth Consent Screen
1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - **App name**: AnonChat
   - **User support email**: Your email
   - **Developer contact information**: Your email
4. Click "Save and Continue"

### 2.2 Add Scopes
1. Click "Add or Remove Scopes"
2. Add these scopes:
   - `openid`
   - `email`
   - `profile`
3. Click "Save and Continue"

### 2.3 Add Test Users (Optional)
1. Add your email as a test user
2. Click "Save and Continue"

## 🆔 Step 3: Create OAuth 2.0 Credentials

### 3.1 Create Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"

### 3.2 Configure Client
1. **Name**: AnonChat Web Client
2. **Authorized JavaScript origins**:
   - `http://localhost:8000` (for local development)
   - `https://your-app-name.netlify.app` (for production)
3. **Authorized redirect URIs**:
   - `http://localhost:8000` (for local development)
   - `https://your-app-name.netlify.app` (for production)
4. Click "Create"

### 3.3 Copy Client ID
1. Copy the generated Client ID
2. You'll need this for the next step

## ⚙️ Step 4: Update Application Code

### 4.1 Replace Client ID
In `index.html`, find this line:
```javascript
client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual client ID
```

Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Client ID:
```javascript
client_id: '123456789-abcdefghijklmnop.apps.googleusercontent.com',
```

### 4.2 Update Authorized Domains
1. Go back to Google Cloud Console
2. Navigate to "OAuth consent screen"
3. Add your domain to "Authorized domains":
   - `your-app-name.netlify.app`

## 🧪 Step 5: Test the Setup

### 5.1 Local Testing
1. Start a local server:
   ```bash
   python -m http.server 8000
   ```
2. Open `http://localhost:8000`
3. Click "Continue with Google"
4. Sign in with your Google account

### 5.2 Production Testing
1. Deploy to Netlify
2. Visit your live site
3. Test the Google login functionality

## 🔒 Security Considerations

### 6.1 Environment Variables (Recommended)
For better security, use environment variables:

1. **Create a config file** (`config.js`):
```javascript
const config = {
    googleClientId: process.env.GOOGLE_CLIENT_ID || 'your-client-id'
};
```

2. **Update the code**:
```javascript
client_id: config.googleClientId,
```

3. **Set environment variable in Netlify**:
   - Go to Site settings → Environment variables
   - Add `GOOGLE_CLIENT_ID` with your client ID

### 6.2 Domain Restrictions
- Only add domains you control to authorized origins
- Remove localhost from production credentials
- Regularly review and update authorized domains

## 🛠️ Troubleshooting

### Common Issues:

**"popup_closed_by_user" error:**
- Check if popup blockers are enabled
- Verify authorized origins are correct

**"access_denied" error:**
- Check OAuth consent screen configuration
- Verify scopes are properly set

**"invalid_client" error:**
- Verify client ID is correct
- Check if client ID is from the right project

**"redirect_uri_mismatch" error:**
- Verify redirect URIs in Google Cloud Console
- Check if the current domain is authorized

## 📱 Mobile Considerations

### 7.1 Responsive Design
The login interface is already mobile-responsive, but consider:
- Testing on various mobile devices
- Ensuring touch targets are large enough
- Verifying popup behavior on mobile browsers

### 7.2 Progressive Web App
Consider adding PWA features:
- Service worker for offline functionality
- App manifest for installability
- Better mobile experience

## 🔄 Step 8: Maintenance

### 8.1 Regular Updates
- Monitor Google Cloud Console for any changes
- Keep track of API quotas and limits
- Update client libraries when needed

### 8.2 Security Monitoring
- Regularly review OAuth consent screen
- Monitor for unauthorized access
- Keep credentials secure

## 📞 Support

If you encounter issues:
1. Check Google Cloud Console error logs
2. Verify all configuration steps
3. Test with different browsers
4. Check browser console for JavaScript errors

---

**Need help?** Check the [main README.md](README.md) or open an issue on GitHub. 