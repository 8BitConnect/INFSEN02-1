type Fun<a, b> = {
    f: (_: a) => b,
    then: <c>(g: Fun<b, c>) => Fun<a, c>
    repeat: (this:Fun<a,a>) => Fun<number, Fun<a, a>>
    repeatUntil: (this:Fun<a,a>) => Fun<Fun<a,boolean>, Fun<a, a>>
}

let Fun = function <a, b>(f: ((_: a) => b)): Fun<a, b> {
    return {
        f: f,
        then: function <c>(this: Fun<a, b>, g: Fun<b, c>): Fun<a, c> {
            return Fun<a, c>(x => g.f(this.f(x)))
        },
        repeat: function(this:Fun<a, a>): Fun<number, Fun<a, a>> {
            return Fun<number, Fun<a, a>>((x:number) => repeat(this, x))
        },
        repeatUntil: function(this: Fun<a, a>): Fun<Fun<a,boolean>, Fun<a, a>> {
            return Fun(pred => repeatUntil(this, pred))
          }
    }
};

let incr = Fun((x: number) => x + 1)
let decr = Fun((x:number) => x - 1)
let double = Fun((x: number) => x * 2)
let square = Fun((x: number) => x * x)
let isPositive = Fun((x: number) => x > 0)
let isEven = Fun((x: number) => x % 2 == 0)
let invert = Fun((x: number) => -x)
let squareRoot = Fun((x: number) => Math.sqrt(x))
let ifThenElse =
    function <a, b>(p: Fun<a, boolean>, _then: Fun<a, b>, _else: Fun<a, b>): Fun<a, b> {
        return Fun((x: a) => {
            if (p.f(x)) {
                return _then.f(x)
            }
            else {
                return _else.f(x)
            }
        })
    }

let objective_one = Fun((x: number) => {
    if (x >= 0) {
        return squareRoot.f(x)
    } else {
        return invert.then(squareRoot).f(x)
    }
})

let objective_two = Fun((x: number) => {
    return square.then(ifThenElse(isEven, invert, squareRoot)).f(x)
})
let nothing = function<a>() : Fun<a, a> {
    return Fun<a, a>(x => x)
}
let repeat = function <a>(f: Fun<a, a>, n: number): Fun<a, a> {
    if (n <= 0) {
        return nothing<a>()
    }
    else {
        return f.then(repeat(f, n - 1))
    }
}

let repeatUntil = function<a>(f: Fun<a, a>, predicate: Fun<a, boolean>) : Fun<a, a> {
    let g =
      (x: a) => {
        if (predicate.f(x)) {
          return nothing<a>().f(x)
        }
        else {
          return f.then(repeatUntil(f, predicate)).f(x)
        }
      }
    return Fun<a, a>(g)
  }

// console.log(incr.then(isPositive).f(5))
// console.log(incr.then(double).then(isPositive).f(5))
// console.log(objective_one.f(5))
// console.log(objective_one.f(-5))
// console.log(objective_two.f(5))
// console.log(objective_two.f(6))
//console.log(incr.repeat().f(5).f(5))
console.log(incr.repeatUntil().f(isPositive).f(-5))