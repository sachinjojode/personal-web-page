#!/bin/bash

# Personal Portfolio Startup Script

echo "🚀 Starting Personal Portfolio Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
fi

# Check if .env file exists in server directory
if [ ! -f "server/.env" ]; then
    echo "⚠️  Environment file not found. Creating from template..."
    cp server/env.example server/.env
    echo "📝 Please edit server/.env with your email configuration"
fi

echo "✅ All dependencies installed!"
echo ""
echo "🎯 To start the development servers:"
echo "   npm run dev"
echo ""
echo "📚 For more information, check the README.md file"
echo ""
echo "🌐 The website will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
