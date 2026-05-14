'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import EvaluationForm from '@/components/EvaluationForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import HistoryList from '@/components/HistoryList';
import SettingsView from '@/components/SettingsView';
import MarketView from '@/components/MarketView';
import PitchDeck from '@/components/PitchDeck';
import CompetitorWarRoom from '@/components/CompetitorWarRoom';
import IdentityView from '@/components/IdentityView';
import ConsultantChat from '@/components/ConsultantChat';
import { Trash2, History } from 'lucide-react';
import { saveResult, fetchHistory, clearHistory } from '@/services/storage';
import styles from './page.module.css';

export default function Home() {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('evaluator');

  // Load history on mount
  useEffect(() => {
    const loadHistory = async () => {
      const data = await fetchHistory();
      setHistory(data);
    };
    loadHistory();
  }, []);

  const handleEvaluate = async (formData) => {
    setLoading(true);
    setError(null);
    setEvaluation(null);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Evaluation failed');
      }

      setEvaluation(data);
      
      // Save to history
      const savedItem = await saveResult(data, formData);
      setHistory(prev => [savedItem, ...prev]);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (item) => {
    setEvaluation(item.data || item);
    setActiveTab('evaluator'); // Switch to evaluator view to see results
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your local history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      sidebarContent={
        <HistoryList 
          items={history} 
          onSelect={handleSelectHistory} 
          activeId={evaluation?.id} 
          onClear={handleClearHistory}
        />
      }
    >
      <div className={`${styles.mainContent} animate-fadeIn`} key={activeTab}>
        {activeTab === 'evaluator' ? (
          <div className={styles.dashboardGrid}>
            <div className={styles.formCol}>
              <EvaluationForm onEvaluate={handleEvaluate} isLoading={loading} />
              
              {error && (
                <div className={`${styles.errorBox} animate-fadeIn`}>
                  <p>{error}</p>
                </div>
              )}
            </div>
            
            <div className={styles.resultsCol}>
              {loading && !evaluation ? (
                <div className={styles.loadingContainer}>
                  <div className={styles.skeleton}>
                    <div className={styles.skeletonHeader}></div>
                    <div className={styles.skeletonGrid}>
                      <div className={styles.skeletonCard}></div>
                      <div className={styles.skeletonCard}></div>
                      <div className={styles.skeletonCard}></div>
                      <div className={styles.skeletonCard}></div>
                    </div>
                  </div>
                  <p className={styles.loadingText}>AI is analyzing your vision...</p>
                </div>
              ) : (
                <ResultsDisplay data={evaluation} />
              )}
            </div>
          </div>
        ) : activeTab === 'settings' ? (
          <SettingsView 
            history={history} 
            onClearHistory={handleClearHistory} 
          />
        ) : activeTab === 'market' ? (
          <MarketView data={evaluation} />
        ) : activeTab === 'pitch' ? (
          <PitchDeck data={evaluation} />
        ) : activeTab === 'competitors' ? (
          <CompetitorWarRoom data={evaluation} />
        ) : activeTab === 'identity' ? (
          <IdentityView data={evaluation} />
        ) : activeTab === 'chat' ? (
          <ConsultantChat data={evaluation} />
        ) : (
          <div className={styles.historyFullView}>
            <div className={styles.historyHeader}>
              <h2>Evaluation History</h2>
              <p>Review and compare your past startup analyses.</p>
              {history.length > 0 && (
                <button className={styles.clearAllLarge} onClick={handleClearHistory}>
                  <Trash2 size={16} />
                  Clear All History
                </button>
              )}
            </div>
            
            {history.length === 0 ? (
              <div className={styles.emptyHistoryState}>
                <div className={styles.emptyIcon}><History size={48} /></div>
                <h3>No evaluations yet</h3>
                <p>Submit your first startup idea to see it here!</p>
                <button 
                  className={styles.startBtn}
                  onClick={() => setActiveTab('evaluator')}
                >
                  Start First Evaluation
                </button>
              </div>
            ) : (
              <div className={styles.historyGrid}>
                {history.map(item => (
                  <div 
                    key={item.id} 
                    className={styles.historyCard}
                    onClick={() => handleSelectHistory(item)}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.cardIndustry}>{item.industry}</span>
                      <span className={styles.cardDate}>
                        {new Date(item.date || item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className={styles.cardIdea}>{item.idea}</h3>
                    <div className={styles.cardFooter}>
                      <div className={styles.cardScore}>
                        <span className={styles.scoreLabel}>Health Score</span>
                        <span className={styles.scoreValue}>{item.score}/10</span>
                      </div>
                      <div className={styles.cardVerdict}>
                        {item.data?.final_verdict?.decision || 'Evaluated'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
