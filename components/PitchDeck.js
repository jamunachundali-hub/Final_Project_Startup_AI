'use client';

import React from 'react';
import { Presentation, Image as ImageIcon, Layout as LayoutIcon, ChevronRight } from 'lucide-react';
import styles from './PitchDeck.module.css';

import EmptyState from './EmptyState';

const PitchDeck = ({ data }) => {
  const [presentMode, setPresentMode] = React.useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);

  if (!data?.pitch_deck) return (
    <EmptyState 
      icon={Presentation}
      title="Slide Architect Ready"
      description="Evaluate your vision to generate a professional, investor-ready slide deck outline."
    />
  );

  const slides = data.pitch_deck;

  if (presentMode) {
    return (
      <div className={styles.presentOverlay}>
        <div className={styles.presentContent}>
          <button className={styles.closeBtn} onClick={() => setPresentMode(false)}>✕ Close</button>
          
          <div className={`${styles.bigSlide} glass`}>
            <div className={styles.bigSlideHeader}>
              <span className={styles.bigSlideNum}>Slide {activeSlide + 1} of {slides.length}</span>
              <h2>{slides[activeSlide].title}</h2>
            </div>
            <div className={styles.bigSlideBody}>
              <p>{slides[activeSlide].content}</p>
              {slides[activeSlide].visual_suggestion && (
                <div className={styles.bigVisual}>
                  <ImageIcon size={20} />
                  <span>Visual Concept: {slides[activeSlide].visual_suggestion}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.presentNav}>
            <button 
              disabled={activeSlide === 0} 
              onClick={() => setActiveSlide(prev => prev - 1)}
            >
              Previous
            </button>
            <div className={styles.navDots}>
              {slides.map((_, i) => (
                <div key={i} className={`${styles.dot} ${i === activeSlide ? styles.dotActive : ''}`} />
              ))}
            </div>
            <button 
              disabled={activeSlide === slides.length - 1} 
              onClick={() => setActiveSlide(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGrp}>
          <Presentation className={styles.icon} />
          <h2>Pitch Deck Architect</h2>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.presentBtn} onClick={() => { setActiveSlide(0); setPresentMode(true); }}>
            <Presentation size={16} />
            Presentation Mode
          </button>
        </div>
      </div>
      <p className={styles.subtitle}>A professional slide-by-slide structure to win over investors.</p>

      <div className={styles.deck}>
        {slides.map((slide, index) => (
          <div key={index} className={`${styles.slideCard} glass`} onClick={() => { setActiveSlide(index); setPresentMode(true); }}>
            <div className={styles.slideHeader}>
              <span className={styles.slideNumber}>Slide {slide.slide || index + 1}</span>
              <h3 className={styles.slideTitle}>{slide.title}</h3>
            </div>
            
            <div className={styles.slideBody}>
              <p className={styles.slideContent}>{slide.content}</p>
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
