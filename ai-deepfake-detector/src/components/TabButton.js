// src/components/TabButton.js
import React from 'react';
import './TabButton.css';
import { FileText, UploadCloud, Film } from 'lucide-react';

const icons = {
  text: <FileText size={20} />,
  image: <UploadCloud size={20} />,
  video: <Film size={20} />,
};

const TabButton = ({ id, activeTab, onClick, children }) => (
  <button
    className={`tab-button ${activeTab === id ? 'active' : ''}`}
    onClick={() => onClick(id)}
  >
    {icons[id]}
    <span>{children}</span>
  </button>
);

export default TabButton;