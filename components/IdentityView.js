'use client';

import React from 'react';
import { Palette, Sparkles, MessageSquare, Fingerprint, Type } from 'lucide-react';
import styles from './IdentityView.module.css';

import EmptyState from './EmptyState';

const IdentityView = ({ data }) => {
  if (!data?.branding) return (
    <EmptyState 
      icon={Palette}
      title="Brand DNA Designer"
      description="Once analyzed, I'll generate a visual and verbal identity including colors, names, and voice."
    />
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
            <h3>Color Strategy</h3>
          </div>
          <div className={styles.colorStrip}>
            {data.branding.brand_colors.map((color, i) => (
              <div key={i} className={styles.colorBox} style={{ background: color }}>
                <span className={styles.hexCode}>{color}</span>
              </div>
            ))}
          </div>
          <div className={styles.colorLabels}>
            <div className={styles.labelItem}>
              <span className={styles.dot} style={{ background: data.branding.brand_colors[0] }}></span>
              <span>Primary</span>
            </div>
            <div className={styles.labelItem}>
              <span className={styles.dot} style={{ background: data.branding.brand_colors[1] }}></span>
              <span>Secondary</span>
            </div>
            <div className={styles.labelItem}>
              <span className={styles.dot} style={{ background: data.branding.brand_colors[2] || '#fff' }}></span>
              <span>Accent</span>
            </div>
          </div>
          <p className={styles.cardInfo}>Selected based on industry psychology and {data.classification?.industry} trends.</p>
        </div>

        {/* Typography */}
        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <Type size={20} className={styles.accent} />
            <h3>Typography System</h3>
          </div>
          <div className={styles.typoBox}>
            <div className={styles.typoItem}>
              <span className={styles.typoLabel}>Headings (Outfit)</span>
              <h1 className={styles.previewH1}>Bold Innovation</h1>
            </div>
            <div className={styles.typoItem}>
              <span className={styles.typoLabel}>Body (Inter)</span>
              <p className={styles.previewP}>The quick brown fox jumps over the lazy dog. A clean, legible font for complex data.</p>
            </div>
          </div>
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
          <p className={styles.cardInfo}>Tone of voice used across all user touchpoints.</p>
        </div>

        {/* Logo Concept */}
        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <Fingerprint size={20} className={styles.accent} />
            <h3>Visual Concept</h3>
          </div>
          <div className={styles.conceptualBox}>
            <p>{data.branding.logo_concept}</p>
          </div>
          <button className={styles.generateBtn}>
            <Sparkles size={16} />
            Generate Visual Assets
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentityView;
