export const apiTimeout = (source, timeout) => {
  setTimeout(function(){ source.cancel("Canceled") }, timeout);
}
