# 🔧 Google OAuth Troubleshooting Guide

This guide will help you fix the "invalid_request" error you're experiencing with Google OAuth.

## 🚨 Error Analysis

**Error Message:** `invalid_request` with OAuth 2.0 policy compliance issue

**Common Causes:**
1. Missing or incorrect OAuth consent screen configuration
2. Missing required scopes
3. Incorrect authorized origins
4. Missing API enablement
5. App verification requirements

## 🔧 Step-by-Step Fix

### Step 1: OAuth Consent Screen Configuration

1. **Go to Google Cloud Console:**
   ```
   https://console.cloud.google.com/
   ```

2. **Navigate to OAuth Consent Screen:**
   - APIs & Services → OAuth consent screen

3. **Configure App Information:**
   - **App name**: AnonChat
   - **User support email**: Your email address
   - **App logo**: Optional
   - **App domain**: Leave blank for now
   - **Developer contact information**: Your email address

4. **Add Required Scopes:**
   - Click "Add or Remove Scopes"
   - Add these scopes:
     - `openid`
     - `email`
     - `profile`
   - Click "Save and Continue"

5. **Add Test Users (Important):**
   - Click "Add Users"
   - Add your email address
   - Add any other test emails
   - Click "Save and Continue"

### Step 2: OAuth 2.0 Credentials

1. **Go to Credentials:**
   - APIs & Services → Credentials

2. **Edit Your OAuth 2.0 Client ID:**
   - Click on your client ID
   - Update the following:

3. **Authorized JavaScript origins:**
   ```
   http://localhost:8000
   http://localhost:3000
   http://127.0.0.1:8000
   http://127.0.0.1:3000
   ```

4. **Authorized redirect URIs:**
   ```
   http://localhost:8000
   http://localhost:3000
   http://127.0.0.1:8000
   http://127.0.0.1:3000
   ```

5. **Save the changes**

### Step 3: Enable Required APIs

1. **Go to API Library:**
   - APIs & Services → Library

2. **Search and Enable:**
   - "Google+ API" or "Google Identity"
   - "Google Identity and Access Management (IAM) API"

### Step 4: Test Configuration

1. **Use the test file:**
   ```bash
   python -m http.server 8000
   ```

2. **Open test-login.html:**
   ```
   http://localhost:8000/test-login.html
   ```

3. **Check the status:**
   - Should show "Google Identity Services loaded successfully"
   - Try signing in with your test user account

## 🧪 Testing Steps

### Test 1: Basic Configuration
1. Open `test-login.html`
2. Check if Google button appears
3. Check browser console for errors

### Test 2: Sign-In Test
1. Click "Sign in with Google"
2. Use your test user account
3. Should show user information on success

### Test 3: Main Application
1. Open `index.html`
2. Test Google Sign-In
3. Verify login flow works

## 🚨 Common Issues & Solutions

### Issue 1: "App not verified" warning
**Solution:**
- Add your email as a test user
- Use test user accounts only
- For production, complete app verification

### Issue 2: "Invalid client" error
**Solution:**
- Verify client ID is correct
- Check authorized origins
- Ensure domain matches exactly

### Issue 3: "Access denied" error
**Solution:**
- Check OAuth consent screen scopes
- Verify test user is added
- Check app status

### Issue 4: Button not appearing
**Solution:**
- Check Google Identity Services script
- Verify HTML structure
- Check browser console for errors

## 🔒 Production Deployment

### For Netlify Deployment:
1. **Add your domain to authorized origins:**
   ```
   https://your-app-name.netlify.app
   ```

2. **Update redirect URIs:**
   ```
   https://your-app-name.netlify.app
   ```

3. **Complete app verification** (for public use)

## 📱 Mobile Testing

### Test on Mobile:
- Use mobile browser
- Test popup behavior
- Verify responsive design

## 🎯 Success Indicators

You'll know it's working when:
1. ✅ Google button appears
2. ✅ Clicking button opens Google popup
3. ✅ Sign-in completes successfully
4. ✅ User information displays
5. ✅ No error messages

## 📞 Additional Help

If issues persist:
1. Check Google Cloud Console error logs
2. Verify all configuration steps
3. Test with different browsers
4. Check network connectivity
5. Review Google OAuth documentation

---

**Need more help?** Check the Google Cloud Console error logs for specific details. 