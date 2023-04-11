export  function throttle(func, wait=500) {
    let lastArgs, lastThis, lastInvokeTime = 0;
  
    return function(...args) {
      const now = Date.now();
      if (now - lastInvokeTime >= wait) {
        lastInvokeTime = now;
        lastArgs = args;
        lastThis = this;
        return func.apply(this, args);
      }
    };
  }
 export function debounce(fn, delay=500) {
    let timer = null;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  }
  export function formatTime(ms) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
  }
  export function intToPercent(num) {
    return `${num}%`;
  }