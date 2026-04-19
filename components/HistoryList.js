'use client';

import React from 'react';
import styles from './HistoryList.module.css';
import { History, ChevronRight, Calendar, Trash2 } from 'lucide-react';

const HistoryList = ({ items, onSelect, activeId, onClear }) => {
  if (!items || items.length === 0) {
    return (
      <div className={styles.empty}>
        <History size={32} />
        <p>Your history is empty.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent</h3>
        <button className={styles.clearBtn} onClick={onClear}>
          <Trash2 size={12} style={{ marginRight: '4px' }} />
          Clear All
        </button>
      </div>
      <div className={styles.list}>
        {items.map((item) => (
          <button
            key={item.id}
            className={`${styles.item} ${activeId === item.id ? styles.active : ''}`}
            onClick={() => onSelect(item)}
          >
            <div className={styles.itemInfo}>
              <strong>{item.idea.substring(0, 40)}{item.idea.length > 40 ? '...' : ''}</strong>
              <div className={styles.meta}>
                <span>{item.industry}</span>
                <span>•</span>
                <span className={styles.score}>{item.score}/10</span>
              </div>
            </div>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
