@echo off
echo 🚀 Starting VidChat deployment to Firebase...

REM Check if Firebase CLI is installed
firebase --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Firebase CLI not found. Installing...
    npm install -g firebase-tools
)

REM Check if user is logged in
firebase projects:list >nul 2>&1
if errorlevel 1 (
    echo 🔐 Please login to Firebase...
    firebase login
)

REM Deploy to Firebase
echo 📦 Deploying to Firebase Hosting...
firebase deploy --only hosting

echo ✅ Deployment complete!
echo 🌐 Your app is now available at:
echo    https://your-project-id.web.app
echo    https://your-project-id.firebaseapp.com
pause 