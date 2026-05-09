import { useState } from 'react';

export function useABTest(experimentName) {
  const [variant] = useState(() => {
    const storageKey = `ab_test_${experimentName}`;
    let savedVariant = localStorage.getItem(storageKey);

    if (!savedVariant) {
      // 50/50 split
      savedVariant = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem(storageKey, savedVariant);
      console.log(`[A/B Test] Asignado a variante ${savedVariant} para experimento: ${experimentName}`);
    }

    return savedVariant;
  });

  return variant;
}
