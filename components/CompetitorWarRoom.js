'use client';

import React from 'react';
import { Target, Sword, Zap, ShieldAlert, TrendingUp } from 'lucide-react';
import styles from './CompetitorWarRoom.module.css';

import EmptyState from './EmptyState';

const CompetitorWarRoom = ({ data }) => {
  if (!data?.competitor_matrix) return (
    <EmptyState 
      icon={Sword}
      title="Strategic War Room"
      description="Map the competitive landscape and identify your wedge into the market."
    />
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGrp}>
          <Target className={styles.icon} />
          <h2>Competitor War Room</h2>
        </div>
        <p>Strategic mapping of the competitive landscape.</p>
      </div>

      <div className={styles.matrixContainer}>
        <table className={styles.matrixTable}>
          <thead>
            <tr>
              <th>Competitor</th>
              <th>Target Segment</th>
              <th>Price Point</th>
              <th>Killer Feature</th>
              <th>Vulnerability</th>
            </tr>
          </thead>
          <tbody>
            {data.competitor_matrix.map((item, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.compName}>
                  <Sword size={14} className={styles.accentIcon} />
                  {item.competitor}
                </td>
                <td>{item.target_segment}</td>
                <td>
                  <span className={styles.badge}>{item.price_point}</span>
                </td>
                <td className={styles.featureCell}>{item.main_feature}</td>
                <td className={styles.weaknessCell}>
                  {data.competition?.competitors?.[index]?.weakness || 'Market Rigidity'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.strategyGrid}>
        <div className={`${styles.strategyCard} glass`}>
          <div className={styles.cardHeader}>
            <Zap size={20} color="#fbbf24" />
            <h3>Your Differentiation</h3>
          </div>
          <p>{data.competition?.differentiation_strategy || 'Superior AI integration and user experience.'}</p>
        </div>

        <div className={`${styles.strategyCard} glass`}>
          <div className={styles.cardHeader}>
            <ShieldAlert size={20} color="#f87171" />
            <h3>Entry Barriers</h3>
          </div>
          <ul className={styles.list}>
            {data.market_analysis?.entry_barriers?.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompetitorWarRoom;
