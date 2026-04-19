'use client';

import React from 'react';
import { Presentation, Image as ImageIcon, Layout as LayoutIcon, ChevronRight } from 'lucide-react';
import styles from './PitchDeck.module.css';

const PitchDeck = ({ data }) => {
  if (!data?.pitch_deck) return (
    <div className={styles.empty}>
      <Presentation size={48} opacity={0.2} />
      <h3>Pitch Deck Outline</h3>
      <p>Evaluate an idea to generate a structured slide deck.</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGrp}>
          <Presentation className={styles.icon} />
          <h2>Pitch Deck Architect</h2>
        </div>
        <p>A slide-by-slide structure to help you win over investors.</p>
      </div>

      <div className={styles.deck}>
        {data.pitch_deck.map((slide, index) => (
          <div key={index} className={`${styles.slideCard} glass`}>
            <div className={styles.slideHeader}>
              <span className={styles.slideNumber}>Slide {slide.slide || index + 1}</span>
              <h3 className={styles.slideTitle}>{slide.title}</h3>
            </div>
            
            <div className={styles.slideBody}>
              <p className={styles.slideContent}>{slide.content}</p>
              
              {slide.visual_suggestion && (
                <div className={styles.visualSuggestion}>
                  <ImageIcon size={14} />
                  <span>Visual: {slide.visual_suggestion}</span>
                </div>
              )}
            </div>

            <div className={styles.slideFooter}>
              <div className={styles.tag}><LayoutIcon size={12} /> Pro-Layout</div>
              <ChevronRight size={16} className={styles.nextIcon} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.exportSection}>
        <button className="premium-btn">
          Export as PDF Presentation
        </button>
      </div>
    </div>
  );
};

export default PitchDeck;
