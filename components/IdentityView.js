'use client';

import React from 'react';
import { Palette, Sparkles, MessageSquare, Fingerprint, Type } from 'lucide-react';
import styles from './IdentityView.module.css';

const IdentityView = ({ data }) => {
  if (!data?.branding) return (
    <div className={styles.empty}>
      <Palette size={48} opacity={0.2} />
      <h3>Brand Identity</h3>
      <p>Generate a visual and verbal identity for your startup.</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGrp}>
          <Palette className={styles.icon} />
          <h2>Brand DNA</h2>
        </div>
        <p>The visual and psychological foundation of your startup.</p>
      </div>

      <div className={styles.grid}>
        {/* Color Palette */}
        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <Palette size={20} className={styles.accent} />
            <h3>Color Palette</h3>
          </div>
          <div className={styles.colorStrip}>
            {data.branding.brand_colors.map((color, i) => (
              <div key={i} className={styles.colorBox} style={{ background: color }}>
                <span className={styles.hexCode}>{color}</span>
              </div>
            ))}
          </div>
          <p className={styles.cardInfo}>Selected based on industry psychology and ${data.classification?.industry} trends.</p>
        </div>

        {/* Naming Suggestions */}
        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <Sparkles size={20} className={styles.accent} />
            <h3>Brand Names</h3>
          </div>
          <div className={styles.nameGrid}>
            {data.branding.name_suggestions.map((name, i) => (
              <div key={i} className={styles.nameChip}>{name}</div>
            ))}
          </div>
        </div>

        {/* Brand Voice */}
        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <MessageSquare size={20} className={styles.accent} />
            <h3>Brand Voice</h3>
          </div>
          <div className={styles.voiceBox}>
            <Type size={24} className={styles.voiceIcon} />
            <p className={styles.voiceText}>"{data.branding.brand_voice}"</p>
          </div>
          <p className={styles.cardInfo}>Voice used across marketing, support, and documentation.</p>
        </div>

        {/* Logo Concept */}
        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <Fingerprint size={20} className={styles.accent} />
            <h3>Logo Strategy</h3>
          </div>
          <div className={styles.conceptualBox}>
            <p>{data.branding.logo_concept}</p>
          </div>
          <button className={styles.generateBtn}>
            <Sparkles size={16} />
            Generate AI Visuals
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentityView;
