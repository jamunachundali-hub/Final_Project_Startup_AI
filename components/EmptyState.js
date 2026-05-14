import React from 'react';
import { LucideIcon } from 'lucide-react';
import styles from './EmptyState.module.css';

const EmptyState = ({ icon: Icon, title, description, actionText, onAction }) => {
  return (
    <div className={styles.container}>
      <div className={styles.illustration}>
        <div className={styles.pulse} />
        <Icon size={48} className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {actionText && (
        <button className={styles.button} onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
