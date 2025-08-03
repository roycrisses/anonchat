@echo off
echo 🚀 VidChat Firebase Deployment
echo ================================

echo.
echo 📋 Checking Firebase CLI...
firebase --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Firebase CLI not found. Installing...
    npm install -g firebase-tools
    if errorlevel 1 (
        echo ❌ Failed to install Firebase CLI
        pause
        exit /b 1
    )
)

echo.
echo 🔐 Checking Firebase login...
firebase projects:list >nul 2>&1
if errorlevel 1 (
    echo 🔐 Please login to Firebase...
    firebase login
    if errorlevel 1 (
        echo ❌ Firebase login failed
        pause
        exit /b 1
    )
)

echo.
echo 📦 Deploying to Firebase Hosting...
firebase deploy --only hosting

if errorlevel 1 (
    echo ❌ Deployment failed!
    echo.
    echo 🔧 Troubleshooting:
    echo 1. Make sure you've updated .firebaserc with your project ID
    echo 2. Make sure you've updated vidchat.html with your Firebase config
    echo 3. Check that you have access to the Firebase project
    pause
    exit /b 1
)

echo.
echo ✅ Deployment successful!
echo.
echo 🌐 Your VidChat app is now available at:
echo    https://anonchat-app-46eda.web.app
echo    https://anonchat-app-46eda.firebaseapp.com
echo.
echo 📝 Next steps:
echo 1. Update Google OAuth authorized origins
echo 2. Test the video chat functionality
echo 3. Set up custom domain (optional)
echo.
pause 