/** Shared motion tokens — REYPA luxury UX */
export const easeLux = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeLux },
  },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.06,
    },
  },
};

export const tabSlide = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 28 : -28,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: easeLux },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -22 : 22,
    transition: { duration: 0.28, ease: easeLux },
  }),
};

export const pageFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.45, ease: easeLux } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: easeLux } },
};
