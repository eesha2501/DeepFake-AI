DeepFake AI 
<p align="center">
  
</p>

<h3 align="center">A powerful web-based tool to detect scams, deepfakes, and misinformation across text, images, and video.</h3>

<p align="center">
<img src="https://img.shields.io/badge/status-active-brightgreen" alt="Status"/>
<img src="https://img.shields.io/badge/React-18.2.0-blue?logo=react" alt="React"/>
<img src="https://img.shields.io/badge/Firebase-9.6.11-orange?logo=firebase" alt="Firebase"/>
</p>

🚀 Overview
AI Forensics Detector is a modern, user-friendly application designed to help users identify digital deception. In an era of rampant misinformation and sophisticated scams, this tool provides a first line of defense by analyzing various forms of media for signs of manipulation. By leveraging the power of Google's Gemini AI, it can assess text for phishing red flags, images for AI-generated artifacts, and video frames for deepfake indicators.

This project was built with React and uses Firebase for real-time analytics, such as tracking the total number of visitors.

✨ Key Features
Multi-Media Analysis: Analyze content from three different sources:

📝 Text/URL: Paste any block of text, email, or URL to check for scam and phishing characteristics.

🖼️ Image: Upload an image to detect signs of AI generation or manipulation.

📹 Video: Upload a video to analyze a keyframe for deepfake artifacts.

AI-Powered Insights: Get a detailed forensic breakdown including a verdict, confidence score, and a list of specific red flags.

Sleek, Modern UI: A beautiful and responsive interface with dynamic background effects for an engaging user experience.

Visitor Analytics: A real-time visitor counter powered by Firebase Firestore to track site engagement.

Drag & Drop Support: Easily drag and drop image or video files for quick analysis.

🛠️ Tech Stack
Frontend: React

Styling: Standard CSS with CSS Modules

Database & Analytics: Google Firebase (Firestore)

AI Engine: Google Gemini API

Icons: Lucide React

⚙️ Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js: Make sure you have Node.js and npm installed. You can download it from nodejs.org.

Git: You will need Git to clone the repository.

Installation
Clone the repository

git clone https://github.com/YOUR_USERNAME/ai-forensics-detector.git

Navigate to the project directory

cd ai-forensics-detector

Install NPM packages

npm install

Set up your configuration (see below).

Run the application

npm start

The app will be available at http://localhost:3000.

🔑 Configuration
The application requires API keys from both Firebase and Google AI Studio to function correctly.

Firebase Setup:

Create a project on the Firebase Console.

Set up a Firestore Database in production mode and update the security rules as described in the setup guide.

Create a web app in your Firebase project settings.

Copy your firebaseConfig object into src/firebaseConfig.js.

Gemini API Key:

Get an API key from Google AI Studio.

Open src/App.js and paste your API key into the GEMINI_API_KEY constant around line 130.

Usage
Select the type of content you want to analyze (Text/Link, Image, or Video).

Paste your text or upload your file using the drag-and-drop area.

Click the "Run Analysis" button.

Review the detailed forensic report provided by the AI.

⚠️ Disclaimer
This tool uses a powerful AI model, but it is not infallible. The analysis provided is for informational purposes only and should not be considered a guarantee. Always exercise your own judgment and caution when dealing with suspicious content online.

📄 License
This project is open-source and available to everyone. Feel free to fork, modify, and use it as you see fit.
