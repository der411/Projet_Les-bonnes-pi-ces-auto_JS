let a = 0;
let b = 1;
let c = 0;

function fibonacci() {
  c = a + b;
  a = b;
  b = c;
  return b;
}

console.log(fibonacci()); // 1
console.log(fibonacci()); // 2
console.log(fibonacci()); // 3
console.log(fibonacci()); // 5
console.log(fibonacci()); // 8
console.log(fibonacci()); // 13

function fibonacci_test() {
  let max_n = 10;

  for (n = 0; n <= max_n; n++) {
    a = 0;
    b = 1;
    c = 0;

    if(n === 0){
        console.log("fibonacci(0)");
    }

    for(let i = 1; i <= n; i++){
        c = a + b;
        a = b;
        b = c;
    }
    console.log(`fibonacci(${n} = ${b})`);
    
  }
}

fibonacci_test();
