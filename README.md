
# DeepFake-AI

An advanced web application designed to detect digital deception by analyzing **text, images, and videos** for signs of scams, misinformation, or AI-generated deepfakes.  

This tool serves as a **first line of defense**, empowering users to verify the authenticity of digital content. It leverages the **Google Gemini AI** to provide a detailed forensic report, including:  
- Verdict on content legitimacy  
- Confidence score  
- Specific red flags  

---

## ✨ Key Features  

- **Multi-Media Analysis** – Scrutinize suspicious text, links, images (JPG, PNG, etc.), and videos (MP4, MOV, etc.).  
- **AI-Powered Insights** – Forensic analysis powered by the **Google Gemini API**.  
- **Comprehensive Reports** – Clear verdicts (e.g., *Authentic*, *High-Risk Scam*) with confidence scoring and detailed findings.  
- **Real-Time Analytics** – Live visitor counter via **Firebase Firestore**.  
- **Responsive Design** – Modern UI optimized for desktop, tablet, and mobile.  

---

## 🛠️ Tech Stack  

- **Frontend**: React.js, CSS3 (media queries for responsiveness)  
- **AI & Machine Learning**: Google Gemini API  
- **Backend & Hosting**: Firebase (Firestore, Hosting)  
- **Icons**: Lucide React  
- **Version Control**: Git & GitHub  

---

## 🚀 Getting Started  

Follow these steps to set up and run the project locally for development and testing.  

### Prerequisites  
- Node.js (v16 or later)  
- npm or Yarn  
- Firebase project with Firestore + Hosting enabled  
- Google Gemini API key  

### Installation & Setup  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-forensics-detector.git
   cd ai-forensics-detector
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   * Create a new file: `src/firebaseConfig.js`
   * Add your Firebase configuration.
   * For local development, you can use `.env.local` (for API keys).

4. **Run locally**

   ```bash
   npm start
   ```

   App will be available at: **[http://localhost:3000](http://localhost:3000)**

---

## 🌐 Deployment (Firebase Hosting)

1. **Install Firebase CLI**

   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**

   ```bash
   firebase login
   ```

3. **Initialize Firebase** in project root

   ```bash
   firebase init
   ```

   * Select **Hosting**
   * Choose your existing Firebase project
   * Set `public` directory → `build`
   * Configure as **Single Page App**

4. **Build & Deploy**

   ```bash
   npm run build
   firebase deploy
   ```

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgements

* **Google** – for the powerful Gemini API
* **Firebase** – for robust BaaS and hosting services

```
```
