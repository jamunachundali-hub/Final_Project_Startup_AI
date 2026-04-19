'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Eye, 
  Database, 
  Trash2, 
  Download, 
  Zap, 
  ShieldCheck, 
  Globe,
  Monitor
} from 'lucide-react';
import styles from './SettingsView.module.css';

const SettingsView = ({ history, onClearHistory }) => {
  const [config, setConfig] = useState({
    animations: true,
    glassmorphism: true,
    autoSave: true,
    aiModel: 'gpt-4o'
  });

  const handleToggle = (key) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "startup_ai_history.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className={styles.settingsOverlay}>
      <div className={styles.header}>
        <div className={styles.titleGrp}>
          <Settings className={styles.icon} />
          <h2>System Settings</h2>
        </div>
        <p>Manage your application preferences and data security.</p>
      </div>

      <div className={styles.grid}>
        {/* Appearance Group */}
        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <Eye size={20} className={styles.accent} />
            <h3>Appearance</h3>
          </div>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <label>Dynamic Backgrounds</label>
              <span>Enable mesh gradient and pulse animations.</span>
            </div>
            <button 
              className={`${styles.toggle} ${config.animations ? styles.active : ''}`}
              onClick={() => handleToggle('animations')}
            />
          </div>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <label>Glassmorphism Effects</label>
              <span>Toggle semi-transparent blurs on components.</span>
            </div>
            <button 
              className={`${styles.toggle} ${config.glassmorphism ? styles.active : ''}`}
              onClick={() => handleToggle('glassmorphism')}
            />
          </div>
        </div>

        {/* AI & Engine Group */}
        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <Zap size={20} className={styles.accent} />
            <h3>Intelligence Engine</h3>
          </div>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <label>AI Analysis Model</label>
              <span>Select the precision level for evaluations.</span>
            </div>
            <select 
              value={config.aiModel} 
              onChange={(e) => setConfig(prev => ({...prev, aiModel: e.target.value}))}
              className={styles.select}
            >
              <option value="gpt-4o">GPT-4o (Ultra Accuracy)</option>
              <option value="gpt-4o-mini">GPT-4o-Mini (Speed)</option>
            </select>
          </div>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <label>Auto-Sync History</label>
              <span>Automatically back up evaluations to Firestore.</span>
            </div>
            <button 
              className={`${styles.toggle} ${config.autoSave ? styles.active : ''}`}
              onClick={() => handleToggle('autoSave')}
            />
          </div>
        </div>

        {/* Data Management Group */}
        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <Database size={20} className={styles.accent} />
            <h3>Data Management</h3>
          </div>
          <div className={styles.actionItem}>
            <div className={styles.settingInfo}>
              <label>Export Workspace</label>
              <span>Download all {history.length} evaluations as a JSON file.</span>
            </div>
            <button className={styles.secondaryBtn} onClick={handleExportData}>
              <Download size={16} />
              Export
            </button>
          </div>
          <div className={styles.actionItem}>
            <div className={styles.settingInfo}>
              <label>Purge Records</label>
              <span className={styles.danger}>Permanently delete all locally cached data.</span>
            </div>
            <button className={styles.dangerBtn} onClick={onClearHistory}>
              <Trash2 size={16} />
              Wipe Everything
            </button>
          </div>
        </div>

        {/* Security & Status */}
        <div className={`${styles.card} glass`}>
          <div className={styles.cardHeader}>
            <ShieldCheck size={20} className={styles.accent} />
            <h3>Cloud & Privacy</h3>
          </div>
          <div className={styles.statusList}>
            <div className={styles.statusItem}>
              <Globe size={16} />
              <span>Network Status: <strong className={styles.online}>Operational</strong></span>
            </div>
            <div className={styles.statusItem}>
              <Database size={16} />
              <span>Sync Protocol: <strong className={styles.online}>Firebase SECURE</strong></span>
            </div>
            <div className={styles.statusItem}>
              <Monitor size={16} />
              <span>Environment: <strong>Production v1.2.4</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
