// Function wrapper -> function composition
// Functors -> data structure with operations
// Monoid -> Composition of functors and operation with functors
// Monads -> binds
// Quarantine monad -> State monad with the functionality to return errors

export type Fun<a,b> = {
    f: (_:a) => b,
    then: <c>(g: Fun<b,c>) => Fun<a,c>
}

export let Fun = function <a, b>(f: ((_: a) => b)): Fun<a, b> {
    return {
        f: f,
        then: function <c>(this: Fun<a, b>, g: Fun<b, c>): Fun<a, c> {
            return Fun<a, c>(x => g.f(this.f(x)))
        }
    }
}