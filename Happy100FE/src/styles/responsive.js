export const BREAKPOINTS = {
    mobile: 480,
    tablet: 768,
    desktop: 1200,
};

export const mediaQuery = {
    mobile: `@media (max-width: ${BREAKPOINTS.mobile}px)`,
    tablet: `@media (max-width: ${BREAKPOINTS.tablet}px)`,
    desktop: `@media (max-width: ${BREAKPOINTS.desktop}px)`,
};

export const mediaQueryUp = {
    tablet: `@media (min-width: ${BREAKPOINTS.tablet + 1}px)`,
    desktop: `@media (min-width: ${BREAKPOINTS.desktop + 1}px)`,
};

export const responsiveFont = (min, max) => `clamp(${min}, 1.2vw, ${max})`;
