export module lesson_six{
    type Either<a,b> = {
        kind: "left",
        value: a
    } | {
        kind: "right",
        value: b
    }

    type Unit = {}
    
    type Option<a> = Either<Unit, a>

    let Id = <a>(): Fun<a,a> => Fun((x:a) => x)

    let inl = <a, b>() : Fun<a, Either<a, b>> => {
        let g = (x: a) : Either<a,b> => {
            return {
                kind: "left",
                value: x
            }
        }
        return Fun(g)
    }

    let inr = <a, b>(): Fun<b, Either<a, b>> => {
        let g = (x: b) : Either<a,b> => {
            return {
                kind: "right",
                value: x
            }
        }
        return Fun(g)
    }

    let map_Option = <a, b>(f: Fun<a,b>): Fun<Option<a>, Option<b>> => {
        return map_Either<Unit, Unit, a, b>(Id<Unit>(), f)
    }

    let unit_Option = <a>(): Fun<a, Option<a>> => inr()

    // Function that goes from Functor<Functor<a>> to a Functor<a> => Flatten
    // let join_Option = <a>(): Fun<Option<Option<a>>, Option<a>> => {
    //     return Fun((opt: Option<Option<a>>)=> {
    //         if(opt.kind == "left") {
    //             return inl<Unit, a>().f({})
    //         }
    //         else {
    //             return opt.value
    //         }
    //     }
    // }

    let map_Either = <a, a1, b, b1>(f: Fun<a, a1>, g: Fun<b, b1>): Fun<Either<a,b>, Either<a1,b1>> => {
        return Fun((e: Either<a,b>) => {
            if(e.kind == 'left'){
                return inl<a1,b1>().f(f.f(e.value))
            }
            else {
                return inr<a1, b1>().f(g.f(e.value))
            }
        })
    }

    interface Pair<a,b> {
        fst: a,
        snd: b
    }

    let Pair = <a,b>(x: a, y: b): Pair<a,b> =>{
        return {
            fst: x,
            snd: y
        }
    }
    
    let map_Pair = <a, a1, b, b1>(f: Fun<a, a1>, g: Fun<b, b1>): Fun<Pair<a,b>, Pair<a1, b1>> => {
        return Fun((p: Pair<a,b>) => {
            return Pair<a1, b1>(f.f(p.fst), g.f(p.snd))
        })
    }

    type State<s,a> = Fun<s, Pair<a, s>>

    let map_State = <s, a, b>(f: Fun<a, b>) : Fun<State<s, a>, State<s, b>> => {
        return Fun<State<s, a>, State<s, b>>((p: State<s, a>) => {
            return p.then(map_Pair(f, Id<s>()))
        })
    }

    // unit_Functor = <a>(): Fun<a, Functor<a>>
    let unit_State = <s, a>(): Fun<a, State<s, a>> => {
        return Fun<a, State<s, a>>((x: a) => {
            return Fun<s, Pair<a,s>>((state: s) => {
                return Pair(x, state)
            })
        })
    }

    // join_Functor = <a>(): Fun<Functor<Functor<a>>, Functor<a>>
    // let join_State = <s, a>(): Fun<State<s, State<s,a>>, State<s,a>> => {
    //     return Fun<State<s, State<s,a>>, State<s,a>>((p: State<s, State<s, a>>) =>{
    //         let g = 
    //     })
    }
}