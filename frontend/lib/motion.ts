export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.45, 0.36, 0.95] }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } }
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

export const hoverLift = {
  y: -6,
  transition: { duration: 0.25, ease: "easeOut" }
};

export const press = {
  scale: 0.98,
  transition: { duration: 0.1 }
};
