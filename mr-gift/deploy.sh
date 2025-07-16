#!/bin/bash

# 🚀 Mr Gift Deployment Script
# This script helps deploy the Mr Gift app to Vercel

echo "🎁 Mr Gift Deployment Script"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the mr-gift directory."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js 18.x or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies."
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Run build to verify everything works
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "🚀 Starting deployment to Vercel..."
echo ""
echo "Please follow these steps:"
echo "1. Login to Vercel when prompted"
echo "2. Choose your account/team"
echo "3. Confirm project settings"
echo "4. Wait for deployment to complete"
echo ""

# Deploy to Vercel
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "Your Mr Gift app is now live!"
    echo "Features available:"
    echo "  ✅ Enhanced authentication with dropdown"
    echo "  ✅ User type selection onboarding"
    echo "  ✅ Complete onboarding flow"
    echo "  ✅ Browser compatibility fixes"
    echo "  ✅ Responsive design"
    echo ""
    echo "Test the authentication flow:"
    echo "1. Click 'Join Mr Gift' button in header"
    echo "2. Select 'Create Account'"
    echo "3. Complete the onboarding process"
    echo ""
else
    echo "❌ Deployment failed. Please check the error messages above."
    echo ""
    echo "Common solutions:"
    echo "1. Make sure you're logged into Vercel: vercel login"
    echo "2. Check your internet connection"
    echo "3. Verify your Vercel account has deployment permissions"
    echo ""
    exit 1
fi
