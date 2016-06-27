export function maxDivisor(a, b) {
  var divisor = 0,
    tmp = 1

  while(tmp) {
    tmp = b % a
    divisor = b / a
    b = a
    a = tmp
  }

  return b
}

export function forEach(list, fn) {
  return Array.prototype.forEach.call(list, fn);
}
