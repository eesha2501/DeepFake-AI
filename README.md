# DeepFake AI

<p align="center">
  <img src="logo.png" alt="AI Forensics Detector Logo" width="150"/>
</p>

<h3 align="center">A powerful web-based tool to detect scams, deepfakes, and misinformation across text, images, and video.</h3>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen" alt="Status"/>
  <img src="https://img.shields.io/badge/React-18.2.0-blue?logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/Firebase-9.6.11-orange?logo=firebase" alt="Firebase"/>
</p>

---

## 🚀 Overview

**DeepFake AI** is a modern, user-friendly application designed to help users identify digital deception. In an era of rampant misinformation and sophisticated scams, this tool provides a first line of defense by analyzing various forms of media for signs of manipulation. 

By leveraging the power of **Google's Gemini AI**, it can:
- Assess text for phishing red flags  
- Detect AI-generated artifacts in images  
- Analyze video frames for deepfake indicators

---

## ✨ Key Features

- **Multi-Media Analysis**: Analyze content from three different sources:
  - 📝 **Text/URL**: Paste any block of text, email, or URL to check for scam and phishing characteristics.
  - 🖼️ **Image**: Upload an image to detect signs of AI generation or manipulation.
  - 📹 **Video**: Upload a video to analyze a keyframe for deepfake artifacts.

- **AI-Powered Insights**: Get a detailed forensic breakdown including:
  - Verdict
  - Confidence score
  - List of specific red flags

- **Sleek, Modern UI**: Beautiful and responsive interface with dynamic background effects.

- **Visitor Analytics**: Real-time visitor counter powered by Firebase Firestore.

- **Drag & Drop Support**: Easily drag and drop image or video files for quick analysis.

---

## 🛠️ Tech Stack

| Category        | Tech               |
|-----------------|--------------------|
| **Frontend**    | React              |
| **Styling**     | CSS + CSS Modules  |
| **Database**    | Firebase Firestore |
| **AI Engine**   | Google Gemini API  |
| **Icons**       | Lucide React       |

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js**: [Download & Install](https://nodejs.org/)
- **Git**: [Download & Install](https://git-scm.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ai-forensics-detector.git

# Navigate to the project directory
cd ai-forensics-detector

# Install dependencies
npm install

# Run the app
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🔑 Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Set up **Firestore Database** in **Production Mode**.
4. Update the **security rules** as per the setup guide.
5. Create a **Web App** in the project settings.
6. Copy the config into `src/firebaseConfig.js`:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};
```

### Gemini API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app).
2. Get your **Gemini API Key**.
3. Paste it into `src/App.js`:

```js
const GEMINI_API_KEY = "YOUR_API_KEY_HERE"; // around line 130
```

---

## 🚦 Usage

1. Choose content type: **Text/Link**, **Image**, or **Video**.
2. Paste your text or upload your file.
3. Click **Run Analysis**.
4. View the **forensic report** including red flags, verdict, and confidence score.

---

## ⚠️ Disclaimer

> This tool uses a powerful AI model, but it is **not infallible**. The analysis provided is for informational purposes only and should not be considered a guarantee. Always use your judgment when reviewing suspicious content.

---

## 📄 License

This project is **open-source** and free to use. Feel free to **fork**, **modify**, and **build upon it** to create your own custom solutions.

---

<p align="center">
  Built with ❤️ for a safer digital world.
</p>

