'use client';

import React from 'react';
import styles from './Layout.module.css';
import { Rocket, History, Settings, LogOut, Globe, Presentation, Sword, Palette, MessageSquare } from 'lucide-react';

const Layout = ({ children, activeTab = 'evaluator', onTabChange, sidebarContent }) => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarInner}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Rocket className={styles.icon} />
            </div>
            <span>Startup <span className={styles.altText}>AI</span></span>
          </div>
          
          <nav className={styles.nav}>
            <button 
              className={`${styles.navItem} ${activeTab === 'evaluator' ? styles.active : ''}`}
              onClick={() => onTabChange && onTabChange('evaluator')}
            >
              <Rocket size={18} />
              <span>Evaluator</span>
            </button>
            <button 
              className={`${styles.navItem} ${activeTab === 'market' ? styles.active : ''}`}
              onClick={() => onTabChange && onTabChange('market')}
            >
              <Globe size={18} />
              <span>Market</span>
            </button>
            <button 
              className={`${styles.navItem} ${activeTab === 'pitch' ? styles.active : ''}`}
              onClick={() => onTabChange && onTabChange('pitch')}
            >
              <Presentation size={18} />
              <span>Pitch Deck</span>
            </button>
            <button 
              className={`${styles.navItem} ${activeTab === 'competitors' ? styles.active : ''}`}
              onClick={() => onTabChange && onTabChange('competitors')}
            >
              <Sword size={18} />
              <span>War Room</span>
            </button>
            <button 
              className={`${styles.navItem} ${activeTab === 'identity' ? styles.active : ''}`}
              onClick={() => onTabChange && onTabChange('identity')}
            >
              <Palette size={18} />
              <span>Branding</span>
            </button>
            <button 
              className={`${styles.navItem} ${activeTab === 'chat' ? styles.active : ''}`}
              onClick={() => onTabChange && onTabChange('chat')}
            >
              <MessageSquare size={18} />
              <span>Consultant</span>
            </button>
            <button 
              className={`${styles.navItem} ${activeTab === 'history' ? styles.active : ''}`}
              onClick={() => onTabChange && onTabChange('history')}
            >
              <History size={18} />
              <span>History</span>
            </button>
            <button 
              className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
              onClick={() => onTabChange && onTabChange('settings')}
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </nav>

          <div className={styles.sidebarContent}>
            {sidebarContent}
          </div>

          <div className={styles.footer}>
            <button className={styles.logout}>
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      <main className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>Dashboard</h1>
            <p className={styles.headerSubtitle}>Evaluate your vision with precision</p>
          </div>
          <div className={styles.userProfile}>
            <div className={styles.notifications}><Settings size={20} /></div>
            <div className={styles.avatar}>JD</div>
          </div>
        </header>
        <section className={styles.mainArea}>
          {children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
