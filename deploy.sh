#!/bin/bash

# VidChat Firebase Deployment Script

echo "🚀 Starting VidChat deployment to Firebase..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Please login to Firebase..."
    firebase login
fi

# Deploy to Firebase
echo "📦 Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "✅ Deployment complete!"
echo "🌐 Your app is now available at:"
echo "   https://$(firebase use --json | jq -r '.current')-web.app"
echo "   https://$(firebase use --json | jq -r '.current').firebaseapp.com" 