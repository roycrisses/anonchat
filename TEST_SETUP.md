# 🧪 Test Setup - Google Sign-In Interface

This guide shows how to test the Google Sign-In interface and provides a working demo setup.

## 🚀 Quick Test Setup

### Step 1: Update Configuration

Edit `config.js` and replace the Google Client ID:

```javascript
// For testing purposes, use this demo client ID
googleClientId: '123456789-abcdefghijklmnop.apps.googleusercontent.com',

// For production, use your real client ID
// googleClientId: 'your-real-client-id.apps.googleusercontent.com',
```

### Step 2: Test the Interface

1. **Start local server:**
   ```bash
   python -m http.server 8000
   ```

2. **Open in browser:**
   ```
   http://localhost:8000
   ```

3. **Test scenarios:**
   - ✅ Google Sign-In button appears
   - ✅ Guest login works
   - ✅ User profile display
   - ✅ Logout functionality
   - ✅ Session persistence

## 🔧 Working Demo Setup

### Option 1: Use Demo Client ID (Recommended for Testing)

Update `config.js`:

```javascript
const config = {
    googleClientId: '123456789-abcdefghijklmnop.apps.googleusercontent.com',
    // ... rest of config
};
```

### Option 2: Create Real Google Client ID

1. Follow `GOOGLE_OAUTH_SETUP.md`
2. Get your Client ID from Google Cloud Console
3. Update `config.js` with your real Client ID

### Option 3: Test Without Google (Guest Mode Only)

Update `config.js`:

```javascript
const config = {
    enableGoogleLogin: false,
    enableGuestLogin: true,
    // ... rest of config
};
```

## 🎯 Expected Behavior

### Login Screen:
- ✅ Google Sign-In button (if enabled)
- ✅ Guest login option
- ✅ Clean, responsive design
- ✅ Dark theme with red/blue accents

### After Login:
- ✅ User profile displayed
- ✅ Avatar, name, and email shown
- ✅ Logout button available
- ✅ Proceeds to environment selection

### Guest Mode:
- ✅ Works without Google account
- ✅ Full chat functionality
- ✅ Session persistence
- ✅ Clean logout

## 🛠️ Troubleshooting

### Google Sign-In Issues:

**Button not appearing:**
- Check if `config.js` is loaded
- Verify Google Identity Services script
- Check browser console for errors

**"Invalid client" error:**
- Verify client ID format
- Check domain authorization
- Use demo client ID for testing

**Popup blocked:**
- Allow popups for localhost
- Check browser settings
- Try different browser

### General Issues:

**Page not loading:**
- Check local server is running
- Verify all files are present
- Check browser console

**Styling issues:**
- Clear browser cache
- Check CSS is loading
- Verify responsive design

## 📱 Mobile Testing

### Test on Mobile:
- ✅ Touch interaction
- ✅ Responsive design
- ✅ Popup behavior
- ✅ Session persistence

### Mobile Considerations:
- Some mobile browsers handle popups differently
- Test on various devices
- Verify touch targets

## 🔒 Security Notes

### For Testing:
- Demo client ID has limitations
- May show warning messages
- Not suitable for production

### For Production:
- Use real Google Client ID
- Set up proper OAuth consent screen
- Configure authorized domains
- Monitor usage and security

## 🎉 Success Indicators

You'll know it's working when:

1. **Login screen loads** with Google button and guest option
2. **Google button appears** with proper styling
3. **Guest login works** and shows user profile
4. **Session persists** across page refreshes
5. **Logout works** and returns to login screen
6. **Navigation flows** smoothly between screens

## 📞 Next Steps

1. **Test the interface** with the provided setup
2. **Create real Google Client ID** for production
3. **Deploy to Netlify** following deployment guide
4. **Monitor and improve** based on user feedback

---

**Ready to test?** Start with the demo setup and enjoy your working Google Sign-In interface! 