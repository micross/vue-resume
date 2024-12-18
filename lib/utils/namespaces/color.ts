import { colord } from "colord";

export const hexToRgb = (hex: string, alpha = 0) => {
  const r = Number.parseInt(hex.slice(1, 3), 16),
    g = Number.parseInt(hex.slice(3, 5), 16),
    b = Number.parseInt(hex.slice(5, 7), 16);

  return alpha ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
};



export const rgbToHsl = (hex: string): string => {
  const hsl = colord(hex).toHsl();

  return `${hsl.h} ${hsl.s} ${hsl.l}`;
};