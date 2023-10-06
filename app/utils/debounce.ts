// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
//ref. https://davidwalsh.name/javascript-debounce-function#:~:text=Here%27s%20the%20basic%20JavaScript%20debounce%20function%20%28as%20taken,it%20stops%20being%20called%20for%20%2F%2F%20N%20milliseconds.

//Alt ref which does not allow for arguments in the debounce function
//https://github.com/getsentry/sentry-javascript/commit/23a7d0b2fc418a90ae2559f2680c6d417b6d17d2

export const debounce = (func, wait, immediate = null) => {
  let timeout: number | null;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout!);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
