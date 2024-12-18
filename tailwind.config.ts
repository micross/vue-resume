/** @type {import('tailwindcss').Config} */

import animate from 'tailwindcss-animate'
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Partial<Config>> {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      line_height: {
        tight: "calc(var(--line-height) - 0.5)",
        snug: "calc(var(--line-height) - 0.3)",
        normal: "var(--line-height)",
        relaxed: "calc(var(--line-height) + 0.3)",
        loose: "calc(var(--line-height) + 0.5)",
      },
      spacing: { custom: "var(--margin)" },
      keyframes: {
        "accordion-down": {
          from: { height: '0' },
          to: { height: "var(--reka-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--reka-accordion-content-height)" },
          to: { height: '0' },
        },
        "collapsible-down": {
          from: { height: '0' },
          to: { height: 'var(--reka-collapsible-content-height)' },
        },
        "collapsible-up": {
          from: { height: 'var(--reka-collapsible-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
      typography: () => ({
        foreground: {
          css: {
            "--tw-prose-body": "var(--foreground)",
            "--tw-prose-headings": "var(--foreground)",
            "--tw-prose-lead": "var(--foreground)",
            "--tw-prose-links": "var(--foreground)",
            "--tw-prose-bold": "var(--foreground)",
            "--tw-prose-counters": "var(--foreground)",
            "--tw-prose-bullets": "var(--foreground)",
            "--tw-prose-hr": "var(--foreground)",
            "--tw-prose-quotes": "var(--foreground)",
            "--tw-prose-quote-borders": "var(--foreground)",
            "--tw-prose-captions": "var(--foreground)",
            "--tw-prose-code": "var(--foreground)",
            "--tw-prose-pre-code": "var(--foreground)",
            "--tw-prose-pre-bg": "var(--background)",
            "--tw-prose-th-borders": "var(--foreground)",
            "--tw-prose-td-borders": "var(--foreground)",
          },
        },
      }),
    },
  },
  plugins: [animate, typography],
}