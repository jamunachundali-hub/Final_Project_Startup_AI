'use client';

import React from 'react';
import { 
  Globe, 
  Users, 
  TrendingUp, 
  PieChart, 
  MapPin, 
  UsersRound,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import styles from './MarketView.module.css';

const MarketView = ({ data }) => {
  if (!data || !data.market_analysis) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.pulseDisk}></div>
        <Globe size={48} className={styles.emptyIcon} />
        <h3>Data Pending Analysis</h3>
        <p>Run a startup evaluation to unlock detailed market research and sizing.</p>
      </div>
    );
  }

  const { market_analysis, market_breakdown } = data;

  return (
    <div className={styles.marketContainer}>
      <div className={styles.header}>
        <div className={styles.titleGrp}>
          <Globe className={styles.icon} />
          <h2>Market Analysis & TAM</h2>
        </div>
        <p>Strategic breakdown of the potential, audience, and trends in the {data.classification.industry} space.</p>
      </div>

      {/* Sizing Section (TAM/SAM/SOM) */}
      <div className={styles.sizingGrid}>
        <div className={`${styles.sizingCard} glass`}>
          <div className={styles.sizeHeader}>
            <PieChart size={20} />
            <label>TAM (Total Addressable Market)</label>
          </div>
          <div className={styles.sizeValue}>{market_analysis.tam}</div>
          <p>The total market demand for this product or service.</p>
        </div>
        <div className={`${styles.sizingCard} glass`}>
          <div className={styles.sizeHeader}>
            <Users size={20} />
            <label>SAM (Serviceable Market)</label>
          </div>
          <div className={styles.sizeValue}>{market_analysis.sam}</div>
          <p>The portion of the TAM that can be reached by your business model.</p>
        </div>
        <div className={`${styles.sizingCard} glass`}>
          <div className={styles.sizeHeader}>
            <TrendingUp size={20} />
            <label>SOM (Serviceable Obtainable Market)</label>
          </div>
          <div className={styles.sizeValue}>{market_analysis.som}</div>
          <p>The share of the SAM you can realistically capture in the short term.</p>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Personas */}
        <div className={`${styles.sectionCard} glass`}>
          <div className={styles.sectionHeader}>
            <UsersRound className={styles.accent} />
            <h3>Ideal Customer Personas</h3>
          </div>
          <div className={styles.personaList}>
            {market_analysis.customer_personas.map((persona, i) => (
              <div key={i} className={styles.personaItem}>
                <div className={styles.personaTitle}>{persona.title}</div>
                <p className={styles.personaDesc}>{persona.description}</p>
                <div className={styles.tags}>
                  {persona.pain_points.map((p, j) => (
                    <span key={j} className={styles.painTag}>{p}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trends & Barriers */}
        <div className={styles.sideStack}>
          <div className={`${styles.miniCard} glass`}>
            <div className={styles.sectionHeader}>
              <TrendingUp className={styles.accent} />
              <h3>Market Trends</h3>
            </div>
            <ul className={styles.marketList}>
              {market_analysis.market_trends.map((trend, i) => (
                <li key={i}><ArrowRight size={14} /> {trend}</li>
              ))}
            </ul>
          </div>

          <div className={`${styles.miniCard} glass`}>
            <div className={styles.sectionHeader}>
              <ShieldAlert className={styles.danger} />
              <h3>Entry Barriers</h3>
            </div>
            <ul className={styles.marketList}>
              {market_analysis.entry_barriers.map((barrier, i) => (
                <li key={i} className={styles.barrierItem}>{barrier}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Regions */}
      {market_breakdown?.top_regions && (
        <div className={`${styles.regionStrip} glass`}>
          <div className={styles.regionHeader}>
            <MapPin size={20} />
            <h3>Target Regions</h3>
          </div>
          <div className={styles.regionList}>
            {market_breakdown.top_regions.map((region, i) => (
              <div key={i} className={styles.regionBadge}>{region}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketView;
