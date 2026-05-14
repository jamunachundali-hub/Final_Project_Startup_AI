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
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import styles from './MarketView.module.css';

const MarketChart = ({ data }) => {
  const chartData = [
    { name: 'TAM', value: parseFloat(data.tam.replace(/[^0-9.]/g, '')) || 100, color: '#3b82f6' },
    { name: 'SAM', value: parseFloat(data.sam.replace(/[^0-9.]/g, '')) || 60, color: '#10b981' },
    { name: 'SOM', value: parseFloat(data.som.replace(/[^0-9.]/g, '')) || 20, color: '#fbbf24' },
  ];

  return (
    <div style={{ width: '100%', height: 250, marginTop: '20px' }}>
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis hide />
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={50}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

import EmptyState from './EmptyState';

const MarketView = ({ data }) => {
  if (!data || !data.market_analysis) {
    return (
      <EmptyState 
        icon={Globe}
        title="Market Research Pending"
        description="Run a startup evaluation to unlock detailed TAM/SAM/SOM sizing and audience personas."
      />
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
      
      <div className={`${styles.chartSection} glass animate-fadeIn`} style={{ animationDelay: '0.1s' }}>
        <div className={styles.sectionHeader}>
          <BarChart3 className={styles.accent} />
          <h3>Market Sizing Visualization</h3>
        </div>
        <MarketChart data={market_analysis} />
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
