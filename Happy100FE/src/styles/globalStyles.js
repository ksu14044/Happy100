import { css } from '@emotion/react';

export const globalStyles = css`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :root {
    --color-primary: #2563eb;
    --color-primary-dark: #1d4ed8;
    --color-secondary: #f97316;
    --color-surface: #f8fafc;
    --color-surface-strong: #eff4ff;
    --color-border: rgba(15, 23, 42, 0.08);
    --color-text: #0f172a;
    --color-muted: #475569;
    --content-max-width: min(1180px, 92vw);
    --radius-lg: 28px;
    --radius-md: 18px;
    --radius-sm: 12px;
    font-family: 'Pretendard', 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Segoe UI', system-ui, -apple-system, sans-serif;
    color-scheme: light;
  }

  html {
    height: 100%;
    scroll-behavior: smooth;
  }

  body {
    min-height: 100%;
    margin: 0;
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 16px;
    letter-spacing: -0.01em;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  #root {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 700;
    color: var(--color-text);
    line-height: 1.2;
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  button, input, textarea, select {
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }

  :focus-visible {
    outline: 3px solid rgba(37, 99, 235, 0.35);
    outline-offset: 2px;
  }

  img {
    max-width: 100%;
    display: block;
  }

  table {
    border-collapse: collapse;
  }

  @media (max-width: 480px) {
    body {
      font-size: 15px;
    }
  }
`;
