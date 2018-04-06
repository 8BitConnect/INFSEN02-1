export type Fun<a, b> = {
    // f: a -> b
    f: (x: a) => b,
    then: <c>(g:Fun<b,c>) => Fun<a,c>,
    repeat: (this:Fun<a,a>) => Fun<number, Fun<a, a>>,
    repeatUntil: (this:Fun<a,a>) => Fun<Fun<a,boolean>, Fun<a, a>>
}

export let Fun = function<a,b>(f: (_:a) => b) : Fun<a, b> {
    return {
        f : f,
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
}

export let id = <a>() => { return Fun<a,a>(x => x) }

let repeat = function <a>(f: Fun<a, a>, n: number): Fun<a, a> {
    if (n <= 0) {
        return id<a>()
    }
    else {
        return f.then(repeat(f, n - 1))
    }
}

let repeatUntil = function<a>(f: Fun<a, a>, predicate: Fun<a, boolean>) : Fun<a, a> {
    let g =
      (x: a) => {
        if (predicate.f(x)) {
          return id<a>().f(x)
        }
        else {
          return f.then(repeatUntil(f, predicate)).f(x)
        }
      }
    return Fun<a, a>(g)
  }