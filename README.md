# 🎭 AnonChat - Anonymous Chat Application

A modern, anonymous chat application with multiple themed environments, Google OAuth authentication, and real-time messaging.

## 🌟 Features

- **🔐 Secure Authentication**: Google OAuth integration with guest login fallback
- **🌍 Multiple Chat Environments**: Geo Politics, Science, Education, Programming, Social Media, Memes
- **➕ Custom Environments**: Create your own chat environments with custom icons
- **🔍 Smart Search**: Search environments by ID, name, or description
- **💬 Real-time Chat**: Anonymous messaging with typing indicators
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🎨 Modern UI**: Dark theme with glassmorphism design
- **💾 Storage Optimized**: Automatic message history management (50 message limit)
- **ℹ️ Environment Info**: Detailed information about each chat environment

## 🚀 Live Demo

**[View Live Demo](https://your-app-name.netlify.app)**

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Authentication**: Google Identity Services (OAuth 2.0)
- **Design**: Glassmorphism, Dark Theme
- **Deployment**: Netlify
- **Version Control**: Git/GitHub

## 📁 Project Structure

```
anonchat/
├── index.html              # Main application
├── login-interface.html    # Standalone login interface
├── config.js              # Configuration settings
├── test-login.html        # Google OAuth test file
├── README.md              # This file
├── LICENSE                # MIT License
├── .gitignore            # Git ignore rules
├── netlify.toml          # Netlify configuration
├── OAUTH_TROUBLESHOOTING.md  # OAuth setup guide
├── DEPLOYMENT.md         # Deployment instructions
├── GOOGLE_OAUTH_SETUP.md # Google OAuth setup
├── TEST_SETUP.md         # Testing guide
└── DEMO_SETUP.md         # Demo setup guide
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/anonchat.git
   cd anonchat
   ```

2. **Start local server**
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Google OAuth Setup

1. **Configure Google Cloud Console**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API and Google Identity API

2. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Create OAuth 2.0 Client ID
   - Add authorized origins:
     ```
     http://localhost:8000
     https://your-app-name.netlify.app
     ```

3. **Update Configuration**
   - Open `config.js`
   - Replace `googleClientId` with your actual client ID

## 🎯 Features in Detail

### Authentication System
- **Google OAuth**: Secure login with Google accounts
- **Guest Login**: Anonymous access without Google account
- **Session Management**: Automatic login persistence
- **Security**: 24-hour session expiry

### Chat Environments
- **Pre-built Environments**: 6 themed chat rooms
- **Custom Environments**: Create your own with custom icons
- **Environment Info**: Detailed statistics and information
- **Search Functionality**: Find environments by ID or name

### Chat Features
- **Anonymous Messaging**: No personal information required
- **Real-time Simulation**: AI-generated responses
- **Typing Indicators**: Visual feedback for active users
- **Message History**: Last 50 messages (storage optimized)
- **System Messages**: Welcome and join notifications

### User Interface
- **Dark Theme**: Modern glassmorphism design
- **Responsive Layout**: Works on all devices
- **Smooth Animations**: Professional user experience
- **Status Messages**: Real-time feedback
- **Loading States**: Visual progress indicators

## 🔧 Configuration

### Google OAuth Setup
See `GOOGLE_OAUTH_SETUP.md` for detailed instructions.

### Environment Variables
```javascript
// config.js
const config = {
    googleClientId: 'your-google-client-id',
    appName: 'AnonChat',
    // ... other settings
};
```

## 🚀 Deployment

### Netlify Deployment
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub account
   - Select this repository
   - Deploy automatically

3. **Configure Domain**
   - Custom domain setup
   - SSL certificate (automatic)
   - CDN optimization

See `DEPLOYMENT.md` for detailed deployment instructions.

## 🧪 Testing

### Local Testing
```bash
# Test main application
http://localhost:8000

# Test standalone login
http://localhost:8000/login-interface.html

# Test Google OAuth
http://localhost:8000/test-login.html
```

### OAuth Testing
See `TEST_SETUP.md` for comprehensive testing guide.

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🔒 Security Features

- **OAuth 2.0**: Secure Google authentication
- **Session Management**: Secure localStorage handling
- **Input Validation**: Protection against malicious input
- **HTTPS**: Secure connections (Netlify)
- **CORS**: Proper cross-origin handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Identity Services for OAuth
- Netlify for hosting
- GitHub for version control
- Modern CSS techniques (Glassmorphism)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/anonchat/issues)
- **Documentation**: See individual `.md` files
- **OAuth Help**: See `OAUTH_TROUBLESHOOTING.md`

---

**Made with ❤️ for anonymous communication**

*Last updated: January 2024* 