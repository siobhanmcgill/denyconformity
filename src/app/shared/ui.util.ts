

export function scrollToTop() {
  scrollTo(0);
}

export function scrollTo(to: number, duration?: number) {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  if (maxScroll < to) {
    duration = duration * (maxScroll / to);
    to = maxScroll;
  }

  const from = window.scrollY, difference = to - from;

  duration = duration || Math.min(Math.abs(difference), 1000);

  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    let reverse = c < 0, s, e;

    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    const val = -c / 2 * (t * (t - 2) - 1) + b;

    if (reverse) {
      return -val;
    } else {
      return val;
    }
  };

  let startTime = 0;

  const scrollFunc = (time: number) => {
    if (startTime === 0) {
      startTime = time;
    }
    if (window.scrollY === to || (time - startTime) >= duration) {
      window.scroll(0, to);
      return;
    }

    window.scroll(
        0, easeInOutQuad((time - startTime), from, difference, duration));
    requestAnimationFrame(scrollFunc);
  };

  requestAnimationFrame(scrollFunc);
}
