// src/components/ParticleEffect.js
import React, { useEffect } from 'react';

const ParticleEffect = () => {
    useEffect(() => {
        const container = document.getElementById('particle-container');
        if (!container) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 3 + 4}s`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 7000);
        };

        const interval = setInterval(createParticle, 200);
        return () => clearInterval(interval);
    }, []);

    return <div id="particle-container" />;
};

export default ParticleEffect;
