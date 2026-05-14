'use client';

import React from 'react';
import styles from './ResultsDisplay.module.css';
import { 
  BarChart3, 
  Target, 
  Lightbulb, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight,
  ClipboardCheck,
  Zap,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  AlertTriangle,
  Award
} from 'lucide-react';
import { copyToClipboard } from '@/utils/clipboard';

const ScoreBar = ({ label, score, color }) => (
  <div className={styles.scoreRow}>
    <div className={styles.scoreInfo}>
      <span>{label}</span>
      <span>{score}/10</span>
    </div>
    <div className={styles.progressTrack}>
      <div 
        className={styles.progressFill} 
        style={{ width: `${score * 10}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, 50);
    
    return () => clearInterval(timer);
  }, [value]);

  return <>{count}</>;
};

const Section = ({ title, icon: Icon, children, delay = '0s' }) => (
  <div className={`${styles.card} glass animate-fadeIn`} style={{ animationDelay: delay }}>
    <div className={styles.cardHeader}>
      <div className={styles.iconCircle}>
        <Icon size={18} />
      </div>
      <h3>{title}</h3>
    </div>
    <div className={styles.cardContent}>
      {children}
    </div>
  </div>
);

const ResultsDisplay = ({ data }) => {
  if (!data) return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIllustration}>
        <div className={styles.pulseDisk}></div>
        <Zap size={48} className={styles.emptyIcon} />
      </div>
      <h3>Ready for Analysis</h3>
      <p>Submit your vision on the left to generate an expert VC-grade evaluation report.</p>
    </div>
  );

  const { 
    classification, 
    problem_analysis, 
    market_breakdown, 
    analysis, 
    competition, 
    monetization, 
    financials, 
    scores, 
    risks, 
    validation_plan, 
    execution_plan, 
    founder_fit, 
    idea_improvements, 
    recommendations,
    final_verdict 
  } = data;

  return (
    <div className={styles.resultsContainer}>
      {/* Prime Verdict Card */}
      <div className={`${styles.primeCard} animate-fadeIn`}>
        <div className={styles.primeHeader}>
          <div className={styles.primeTitleGrp}>
            <div className={styles.industryTag}>{classification.industry}</div>
            <h2>Professional Evaluation Report</h2>
          </div>
          <div className={styles.verdictRibbon} data-decision={final_verdict?.decision}>
            {final_verdict?.decision}
          </div>
        </div>
        
        <div className={styles.primeGrid}>
          <div className={styles.primeMain}>
            <p className={styles.verdictReason}>{final_verdict?.reason}</p>
            <div className={styles.quickTags}>
              <span>{classification.business_model_type}</span>
              <span>{classification.target_audience}</span>
              <span>{market_breakdown?.market_size_estimate} Market</span>
            </div>
          </div>
          <div className={styles.primeScore}>
            <div className={styles.scoreRing}>
              <div className={styles.ringValue}><AnimatedCounter value={scores.overall} /></div>
              <div className={styles.ringLabel}>Health Score</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Market & Problem */}
        <Section title="Market Thesis" icon={Target} delay="0.1s">
          <div className={styles.analysisModule}>
            <div className={styles.modRow}>
              <span className={styles.modLabel}>Pain Level:</span>
              <span className={styles.modValue}>{problem_analysis?.pain_level}</span>
            </div>
            <div className={styles.modRow}>
              <span className={styles.modLabel}>Clarity:</span>
              <span className={styles.modValue}>{problem_analysis?.problem_clarity}</span>
            </div>
            <div className={styles.modRow}>
              <span className={styles.modLabel}>Competition Index:</span>
              <span className={styles.modValue}>{competition.competitors.length} Known Players</span>
            </div>
          </div>
        </Section>

        {/* SWOT Grid */}
        <Section title="Risk/Reward (SWOT)" icon={TrendingUp} delay="0.2s">
          <div className={styles.swotBox}>
            <div className={styles.swotQuadrant} data-q="S">
              <label>Strengths</label>
              <ul>{analysis.strengths.slice(0, 3).map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div className={styles.swotQuadrant} data-q="W">
              <label>Weaknesses</label>
              <ul>{analysis.weaknesses.slice(0, 3).map((w, i) => <li key={i}>{w}</li>)}</ul>
            </div>
          </div>
        </Section>

        {/* Monetization */}
        <Section title="Revenue & Growth" icon={DollarSign} delay="0.3s">
          <div className={styles.analysisModule}>
            <div className={styles.modRow}>
              <span className={styles.modLabel}>Model:</span>
              <span className={styles.modValue}>{monetization.revenue_model}</span>
            </div>
            <div className={styles.modRow}>
              <span className={styles.modLabel}>Y1 Target:</span>
              <span className={styles.modValue}>{financials.year1_revenue_estimate}</span>
            </div>
            <div className={styles.modRow}>
              <span className={styles.modLabel}>Profit Path:</span>
              <span className={styles.modValue}>{financials.profitability_timeline}</span>
            </div>
          </div>
        </Section>

        {/* Founder Fit */}
        <Section title="Founder-Market Fit" icon={Award} delay="0.5s">
          <div className={styles.analysisModule}>
            <div className={styles.modRow}>
              <span className={styles.modLabel}>Fit Score:</span>
              <span className={styles.modValue}>{founder_fit?.score}/10</span>
            </div>
            <p className={styles.modDesc}>{founder_fit?.reason}</p>
          </div>
        </Section>

        {/* Validation Roadmap */}
        <Section title="Validation Roadmap" icon={ClipboardCheck} delay="0.6s">
          <div className={styles.roadmapCompact}>
            {validation_plan?.experiments.slice(0, 2).map((exp, i) => (
              <div key={i} className={styles.roadItem}>
                <div className={styles.roadBullet}>{i + 1}</div>
                <p>{exp}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Strategic Improvement Section */}
      <div className={`${styles.refinedSection} glass animate-fadeIn`}>
        <div className={styles.refinedHeader}>
          <Lightbulb className={styles.goldIcon} />
          <h3>Strategic Pivot Idea</h3>
        </div>
        <p className={styles.refinedText}>{idea_improvements.refined_idea}</p>
        <div className={styles.recommendationsList}>
          {recommendations.slice(0, 4).map((rec, i) => (
            <div key={i} className={styles.recItem}>
              <CheckCircle2 size={16} className={styles.recIcon} />
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.actions}>
        <button 
          onClick={async () => {
            const ok = await copyToClipboard(JSON.stringify(data, null, 2));
            if (ok) alert('Report data copied to clipboard.');
          }} 
          className="premium-btn"
        >
          <Zap size={18} />
          Copy Full JSON
        </button>
        <button onClick={() => window.print()} className="premium-btn" style={{ background: 'rgba(255,255,255,0.05)', boxShadow: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
          <ClipboardCheck size={18} />
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
