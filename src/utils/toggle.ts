import { useCallback, useState } from 'react';

/**
 * Deprecated - old hook before CRA was ugpraded.
 * Use useToggleArray instead.
 */
export function useToggle() {
  const [isTrue, setIsTrue] = useState(false);
  const toggle = () => setIsTrue((isTrue) => !isTrue); // use callback otherwise it would yield unexpected results in promises

  /**
   * Have to return an object instead of a typed array because
   * of a bug in the current CRA version (< 4.x), which
   * results in a "...map of undefined" error.
   */
  return { flag: isTrue, toggle };
}

export function useToggleArray(start = false): [boolean, () => void] {
  const [isTrue, setIsTrue] = useState(start);

  // use callback otherwise it would yield unexpected results in promises

  const toggle = useCallback(() => setIsTrue((isTrue) => !isTrue), [setIsTrue]);

  return [isTrue, toggle];
}
