import { saveEvaluation as saveToFirebase, getHistory as getFromFirebase } from './firebase';

const STORAGE_KEY = 'startup_eval_history';

export const saveResult = async (result, metadata) => {
  const item = {
    id: Date.now().toString(),
    idea: metadata.idea,
    industry: result.classification.industry,
    score: result.scores.overall,
    date: new Date().toISOString(),
    data: result
  };

  // 1. Try Firebase
  await saveToFirebase(item);

  // 2. Always save to LocalStorage for offline/demo use
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const updated = [item, ...existing].slice(0, 50); // Keep last 50
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('LocalStorage save failed', e);
  }
  
  return item;
};

export const fetchHistory = async () => {
  // 1. Get from LocalStorage first (instant)
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (e) {
    console.error('LocalStorage fetch failed', e);
  }

  // 2. Supplement with Firebase if available
  const firebaseHistory = await getFromFirebase();
  if (firebaseHistory && firebaseHistory.length > 0) {
    // Merge and deduplicate by ID if needed, or prefer Firebase
    // For now, let's just return a combined unique set
    const combined = [...firebaseHistory, ...history];
    const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
    return unique.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
  }

  return history;
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
