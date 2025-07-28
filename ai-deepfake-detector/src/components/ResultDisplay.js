// src/components/ResultDisplay.js
import React from 'react';
import './ResultDisplay.css';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

const ResultDisplay = ({ result }) => {
    const getVerdictStyles = (verdict = '') => {
        const v = verdict.toLowerCase();
        if (v.includes('scam') || v.includes('high-risk') || v.includes('deepfake')) {
            return { color: '#f87171', icon: <XCircle /> };
        }
        if (v.includes('suspicious')) {
            return { color: '#fbbf24', icon: <AlertTriangle /> };
        }
        if (v.includes('authentic')) {
            return { color: '#4ade80', icon: <CheckCircle /> };
        }
        return { color: '#38bdf8', icon: <Info /> };
    };

    const styles = getVerdictStyles(result.verdict);

    return (
        <div className="result-display-container">
            <h2>Analysis Result</h2>
            <div className="result-card">
                <div className="result-header">
                    <div className="result-summary">
                        <h3 style={{ color: styles.color }}>{result.verdict}</h3>
                        <p>{result.summary}</p>
                    </div>
                    {result.confidence > 0 && (
                        <div className="confidence-container">
                            <div className="confidence-label">CONFIDENCE</div>
                            <div className="confidence-meter">
                                <svg viewBox="0 0 36 36">
                                    <path className="meter-background" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path className="meter-value" style={{ stroke: styles.color }}
                                        strokeDasharray={`${result.confidence}, 100`}
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                                <div className="confidence-text">
                                    {result.confidence}<span>%</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {result.details && result.details.length > 0 && (
                    <div className="result-details">
                        <h4>Forensic Details</h4>
                        <ul>
                            {result.details.map((detail, index) => (
                                <li key={index}>
                                    <div className="detail-icon" style={{ color: styles.color }}>{styles.icon}</div>
                                    <p className="detail-text">{detail}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultDisplay;