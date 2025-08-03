# 🎥 VidChat - Random Video Chat

A fully functional random video chat application built with WebRTC, Firebase, and Google OAuth. Connect with random people around the world via video chat.

## ✨ Features

- **Random Video Chat**: Connect with random users worldwide
- **Google OAuth Integration**: Secure login with Google accounts
- **Guest Mode**: Quick access without registration
- **Real-time Video/Audio**: High-quality peer-to-peer connections
- **Mute/Unmute**: Control your audio
- **Camera On/Off**: Control your video
- **Next Button**: Skip to next user
- **Responsive Design**: Works on desktop and mobile
- **Firebase Backend**: Real-time signaling and user management

## 🚀 Quick Start

### 1. Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Get your Firebase config
5. Update the `firebaseConfig` in `vidchat.html`

### 2. Setup Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Identity Services API
4. Create OAuth 2.0 Client ID
5. Add authorized origins (localhost:8000 for testing)
6. Update the `googleClientId` in `config.js`

### 3. Run the Application

#### Option A: Local Development
```bash
# Start local server
python -m http.server 8000

# Open in browser
http://localhost:8000/vidchat.html
```

#### Option B: Firebase Hosting (Recommended)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Your app will be available at:
# https://your-project-id.web.app
# https://your-project-id.firebaseapp.com
```

**Quick Deploy Scripts:**
- **Windows**: Run `deploy.bat`
- **Mac/Linux**: Run `./deploy.sh`

## 🔧 Configuration

### Firebase Config
Update the `firebaseConfig` object in `vidchat.html`:

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

### Google OAuth Config
Update `config.js`:

```javascript
const config = {
    googleClientId: 'your-google-client-id.apps.googleusercontent.com',
    // ... other config
};
```

## 📱 How to Use

1. **Login**: Choose Google login or continue as guest
2. **Allow Permissions**: Grant camera and microphone access
3. **Find Match**: Click "Next" to find someone to chat with
4. **Chat**: Once connected, you can see and hear each other
5. **Controls**: Use mute, camera, and next buttons as needed
6. **Disconnect**: Click "Stop" to end the current connection

## 🛠️ Technical Details

### WebRTC Implementation
- Peer-to-peer video/audio streaming
- STUN servers for NAT traversal
- Firebase Firestore for signaling
- Automatic connection establishment

### Firebase Collections
- `videoChat`: Stores room information and signaling data
- Room structure:
  ```javascript
  {
    users: [{id, name, timestamp}],
    status: 'waiting' | 'connected' | 'disconnected',
    offer: RTCSessionDescription,
    answer: RTCSessionDescription,
    candidates: {userId: RTCIceCandidate},
    createdAt: timestamp,
    disconnectedAt: timestamp
  }
  ```

### Security Features
- Anonymous usernames for privacy
- Secure WebRTC connections
- Firebase security rules
- HTTPS required for production

## 🌐 Deployment

### Netlify Deployment
1. Connect your GitHub repository
2. Set build command: `echo "No build required"`
3. Set publish directory: `.`
4. Add environment variables for Firebase config
5. Deploy!

### Custom Domain
1. Add your domain to Firebase authorized domains
2. Update Google OAuth authorized origins
3. Configure DNS settings

## 🔒 Privacy & Security

- **No Video Recording**: All video is peer-to-peer only
- **Anonymous Chat**: No personal information required
- **Secure Connections**: WebRTC encryption
- **Data Privacy**: Minimal data stored in Firebase

## 🐛 Troubleshooting

### Common Issues

1. **Camera/Microphone not working**
   - Check browser permissions
   - Ensure HTTPS in production
   - Try refreshing the page

2. **Connection issues**
   - Check Firebase configuration
   - Verify network connectivity
   - Check browser console for errors

3. **Google OAuth not working**
   - Verify client ID in config.js
   - Check authorized origins in Google Console
   - Ensure domain is added to Firebase

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review Firebase and Google OAuth documentation
- Open an issue on GitHub

---

**Note**: This is a video chat application for educational purposes. Please respect privacy and use responsibly. 