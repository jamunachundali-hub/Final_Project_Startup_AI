'use client';

import React, { useState } from 'react';
import styles from './EvaluationForm.module.css';
import { Send, Loader2 } from 'lucide-react';

const EvaluationForm = ({ onEvaluate, isLoading }) => {
  const [formData, setFormData] = useState({
    idea: '',
    targetMarket: '',
    businessModel: '',
    founderBackground: '',
    stage: 'idea'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.idea.trim()) {
      onEvaluate(formData);
    }
  };

  return (
    <div className={`${styles.formContainer} glass animate-fadeIn`}>
      <h2 className={styles.title}>Submit your Startup Idea</h2>
      <p className={styles.subtitle}>Our AI will analyze your vision and provide a detailed business evaluation.</p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="idea">Startup Idea *</label>
          <textarea
            id="idea"
            name="idea"
            required
            placeholder="Describe your startup in a few sentences..."
            value={formData.idea}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="targetMarket">Target Market (Optional)</label>
          <input
            type="text"
            id="targetMarket"
            name="targetMarket"
            placeholder="e.g. Fintech for Gen Z, B2B SaaS for Logistics"
            value={formData.targetMarket}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="businessModel">Business Model (Optional)</label>
          <input
            type="text"
            id="businessModel"
            name="businessModel"
            placeholder="e.g. Subscription, Marketplace, Freemium"
            value={formData.businessModel}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="founderBackground">Founder Background (Optional)</label>
          <textarea
            id="founderBackground"
            name="founderBackground"
            placeholder="Describe your expertise or team background..."
            value={formData.founderBackground}
            onChange={handleChange}
            rows={2}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="stage">Current Stage</label>
          <select id="stage" name="stage" value={formData.stage} onChange={handleChange}>
            <option value="idea">Concept / Idea</option>
            <option value="mvp">MVP Ready</option>
            <option value="early-traction">Early Traction</option>
            <option value="scaling">Scaling</option>
          </select>
        </div>

        <button 
          type="submit" 
          className={styles.submitBtn}
          disabled={isLoading || !formData.idea.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className={styles.spinner} />
              Evaluating...
            </>
          ) : (
            <>
              <Send size={18} />
              Analyze Idea
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EvaluationForm;
