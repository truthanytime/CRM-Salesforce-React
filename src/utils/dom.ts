import React from 'react';
import { ChangeEvent, useCallback, useEffect, useRef } from 'react';

export const onChangeStringHandler =
  (setter: (v: string) => void) =>
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setter(e.currentTarget.value);
  };

export const onChangeNumberHandler =
  (setter: (val: number) => void, options?: { isDecimal: boolean }) =>
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const parse = options?.isDecimal ? parseFloat : parseInt;
    setter(parse(e.currentTarget.value));
  };

export const onUnknownChangeHandler =
  <T>(setter: (val: T) => void) =>
  (e: ChangeEvent<{ value: unknown }>) => {
    setter(e.target.value as T);
  };

export const onChangeCheckedHandler =
  (setter: (val: boolean) => void) =>
  (e: ChangeEvent<HTMLInputElement>): void => {
    setter(e.currentTarget.checked);
  };

export const handleChangeSlider = (handler: (newValue: any) => void) => (event: any, value: number | number[]) => {
  if (Array.isArray(value)) {
    handler(value[0]);
    return;
  }

  handler(value);
};

export function useIsMounted() {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}

/**
 * Helper to only run the given function if component
 * is still mounted.
 * @returns
 */
export function useIfMounted() {
  const { current: isMounted } = useIsMounted();

  return useCallback(
    (func: (...args: any[]) => any) =>
      (...args: any[]) => {
        if (!isMounted) {
          return;
        }

        func(...args);
      },
    [isMounted],
  );
}

export type Point = { x: number; y: number };

/**
 * Returns the (x,y) points that make up the bounding rect of the
 * given element. The items are in order: top-left, top-right,
 * bottom-left, bottom-right.
 *
 * @param el
 * @returns
 */
export function getBoundingRectPoints(el: HTMLElement): Point[] {
  const { x, y, width, height } = el.getBoundingClientRect();

  return [
    { x: x, y: y },
    { x: x + width, y: y },
    { x: x, y: y + height },
    { x: x + width, y: y + height },
  ];
}

/**
 * Determines if 2 points on the screen are at the same position. Only offers
 * pixel-level resolution. ie. 2.3, and 2.4 are determined to be equal.
 * @param a
 * @param b
 * @returns
 */
export function isSamePoint(a: Point, b: Point) {
  return Math.round(a.x) === Math.round(b.x) && Math.round(a.y) === Math.round(b.y);
}
