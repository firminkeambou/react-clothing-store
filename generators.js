function* gen(i) {
  console.log('Hello');
  yield i + 1;
  console.log('World');
  yield i + 10;
  return 'Finished';
}
const g = gen(5);
// g();  // in the brwser console, we see nothing(suspended function)
console.log(g.next()); // {value: 6, done: false}
console.log(g.next()); // {value: 'World', done: false}
console.log(g.next()); // {value: 15, done: false}
console.log(g.next()); // {value: 'Finished', done: true}

// Output:
// Hello
// { value: 6, done: false }
// World
// { value: 15, done: false }
// { value: 'Finished', done: true }
