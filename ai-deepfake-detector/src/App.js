// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';
import TabButton from './components/TabButton';
import ResultDisplay from './components/ResultDisplay';
import ParticleEffect from './components/ParticleEffect';
import { Users, UploadCloud, Film, Loader } from 'lucide-react';

// --- Firebase Initialization ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [activeTab, setActiveTab] = useState('text');
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Analyzing...');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const trackAndFetchVisitors = async () => {
      const analyticsRef = doc(db, "analytics", "visitorData");
      const visitorId = localStorage.getItem('visitorId');
      if (!visitorId) {
        localStorage.setItem('visitorId', crypto.randomUUID());
        await setDoc(analyticsRef, { count: increment(1) }, { merge: true });
      }
      const docSnap = await getDoc(analyticsRef);
      if (docSnap.exists()) {
        setVisitorCount(docSnap.data().count);
      }
    };
    trackAndFetchVisitors().catch(console.error);
  }, []);
  
  const resetState = () => {
    setInputText('');
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setResult(null);
    setError('');
    setIsLoading(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetState();
  };

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        setFile(selectedFile);
        setPreviewUrl(currentUrl => {
            if (currentUrl) {
                URL.revokeObjectURL(currentUrl);
            }
            return URL.createObjectURL(selectedFile);
        });
    }
  }, []);
  
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileChange({ target: { files: e.dataTransfer.files } });
  }, [handleFileChange]);

  const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
  
  const getVideoFrameAsBase64 = (videoFile) => {
    return new Promise((resolve, reject) => {
        setLoadingMessage('Extracting video frame...');
        const video = document.createElement('video');
        video.src = URL.createObjectURL(videoFile);
        video.muted = true;
        video.onloadeddata = () => { video.currentTime = 1; };
        video.onseeked = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            URL.revokeObjectURL(video.src);
            resolve(dataUrl.split(',')[1]);
        };
        video.onerror = () => reject(new Error("Failed to load video frame."));
        video.play().catch(() => video.load());
    });
  };

  const handleAnalyze = async () => {
    if ((activeTab === 'text' && !inputText) || (activeTab !== 'text' && !file)) {
        setError('Please provide input before analyzing.');
        return;
    }
    setIsLoading(true);
    setLoadingMessage('Analyzing...');
    setResult(null);
    setError('');

    const GEMINI_API_KEY = "AIzaSyDniYZ_2vlMPv6i096O_ZtLYFAyb-WdA9c";

    if (!GEMINI_API_KEY) {
        setError('API key is not configured. Please set the GEMINI_API_KEY in your environment.');
        setIsLoading(false);
        return;
    }

    try {
        let prompt = '';
        let base64Data = null;
        let mimeType = '';

        const jsonSchema = { type: "OBJECT", properties: { "verdict": { "type": "STRING" }, "confidence": { "type": "NUMBER" }, "summary": { "type": "STRING" }, "details": { "type": "ARRAY", "items": { "type": "STRING" }}}, required: ["verdict", "confidence", "summary", "details"] };
        const basePrompt = `You are a digital forensics expert. Provide your analysis in a JSON object matching this schema: ${JSON.stringify(jsonSchema)}. The 'verdict' should be one of 'Authentic', 'Suspicious', 'High-Risk Scam', 'AI-Generated/Deepfake'. 'confidence' is your certainty (0-100). 'summary' is a one-sentence explanation. 'details' is an array of specific findings.`;

        switch (activeTab) {
            case 'text':
                prompt = `${basePrompt} Now, analyze the following text/URL for scams, phishing, or misinformation. Text: "${inputText}"`;
                break;
            case 'image':
                prompt = `${basePrompt} Now, analyze this image for signs of AI generation or digital manipulation (deepfake). Look for inconsistencies in lighting, shadows, artifacts, or unnatural human features.`;
                base64Data = await toBase64(file);
                mimeType = file.type;
                break;
            case 'video':
                prompt = `${basePrompt} This image is one frame from a video. Analyze it for signs of deepfake technology. Look for unnatural facial movements, blinking patterns, and rendering artifacts.`;
                base64Data = await getVideoFrameAsBase64(file);
                mimeType = 'image/jpeg';
                break;
            default: throw new Error('Invalid analysis type');
        }
        
        setLoadingMessage('Communicating with AI...');
        const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
        if (base64Data) {
            chatHistory[0].parts.push({ inlineData: { mimeType, data: base64Data } });
        }

        const payload = { contents: chatHistory, generationConfig: { responseMimeType: "application/json", responseSchema: jsonSchema }};
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
        
        const data = await response.json();
        if (data.candidates && data.candidates.length > 0) {
            const analysisJson = JSON.parse(data.candidates[0].content.parts[0].text);
            setResult(analysisJson);
        } else {
            throw new Error('No content received from analysis API.');
        }
    } catch (err) {
        console.error(err);
        setError(`An error occurred: ${err.message}.`);
        setResult(null);
    } finally {
        setIsLoading(false);
    }
  };

  const renderInputArea = () => {
    if (activeTab === 'text') {
      return (
        <div className="text-input-area">
          <label htmlFor="text-input">Paste text, message, or a URL for forensic analysis</label>
          <textarea id="text-input" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="e.g., 'Urgent account verification required...'" />
        </div>
      );
    } else {
      return (
        <div className={`file-drop-area ${previewUrl ? 'has-file' : ''}`} onDrop={handleDrop} onDragOver={handleDragOver} onClick={() => document.getElementById('file-input').click()}>
            <input type="file" id="file-input" style={{display: 'none'}} accept={activeTab === 'image' ? 'image/*' : 'video/*'} onChange={handleFileChange} />
            {previewUrl ? (
                <div className="file-preview-container">
                    {activeTab === 'image' ? <img src={previewUrl} alt="Preview" /> : <video src={previewUrl} controls />}
                    <button className="remove-file-button" onClick={(e) => { e.stopPropagation(); resetState(); }}>&times;</button>
                </div>
            ) : (
                <>
                    {activeTab === 'image' ? <UploadCloud size={48} className="upload-icon" /> : <Film size={48} className="upload-icon" />}
                    <p className="upload-text"><span>Click to upload</span> or drag & drop</p>
                    <p className="file-type-info">{activeTab === 'image' ? 'PNG, JPG, GIF, WEBP' : 'MP4, MOV, AVI, WEBM'}</p>
                </>
            )}
        </div>
      );
    }
  };

  return (
    <div className="App">
      <ParticleEffect />
      <div className="aurora-background">
          <div className="aurora-shape aurora-shape1"></div>
          <div className="aurora-shape aurora-shape2"></div>
          <div className="aurora-shape aurora-shape3"></div>
      </div>

      <div className="content-wrapper">
        <header className="app-header">
          <h1>DeepFake AI</h1>
          <p>Uncover digital deception. Our advanced AI analyzes content for sophisticated scams and deepfakes.</p>
        </header>

        <main className="main-content">
          <div className="tab-container">
            <TabButton id="text" activeTab={activeTab} onClick={handleTabChange}>Text / Link</TabButton>
            <TabButton id="image" activeTab={activeTab} onClick={handleTabChange}>Image</TabButton>
            <TabButton id="video" activeTab={activeTab} onClick={handleTabChange}>Video</TabButton>
          </div>
          <div className="input-container">{renderInputArea()}</div>
          {error && <p className="error-message">{error}</p>}
          <div className="action-button-container">
            <button className="run-analysis-button" onClick={handleAnalyze} disabled={isLoading}>
              {isLoading ? <Loader className="spinner" /> : null}
              {isLoading ? loadingMessage : 'Run Analysis'}
            </button>
          </div>
          {result && !isLoading && <ResultDisplay result={result} />}
        </main>
        
        <footer className="app-footer">
          <div className="visitor-counter">
            <Users size={16} color="#38bdf8" />
            <span style={{fontWeight: 500}}>{visitorCount.toLocaleString()}</span>
            <span>Total Visitors</span>
          </div>
          <p>Disclaimer: This AI analysis is for informational purposes and is not a guarantee.</p>
          <p>&copy; 2025 DeepFake AI</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
