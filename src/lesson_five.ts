export namespace lesson_five {

    type Fun<a,b> = {
        f: (_:a) => b,
        then: <c>(g: Fun<b,c>) => Fun<a,c>
    }

    let Fun = function <a, b>(f: ((_: a) => b)): Fun<a, b> {
        return {
            f: f,
            then: function <c>(this: Fun<a, b>, g: Fun<b, c>): Fun<a, c> {
                return Fun<a, c>(x => g.f(this.f(x)))
            }
        }
    }

    type Fun_n<a> = Fun<number,a>

    let incr : Fun<number, number> = Fun((x:number) => x + 1)
    let double : Fun<number, number> = Fun((x:number) => x * 2)

    let map_Fun_n = <a,b>(f:Fun<a,b>, p:Fun_n<a>) : Fun_n<b> => p.then(f)
    let unit_Fun_n = <a>() => Fun(x => Fun(i => x))
    //let join_Fun_n = <a>() => Fun(f => Fun(i => f.f(i).f(i)))

    type Pair<a,b> = { fst:a, snd:b }
    type withNum<a> = Pair<a, number>

    let id = <a>() : Fun<a, a> => Fun((_:a) => _)
    let fst = <a,b>():Fun<Pair<a,b>,a> => Fun((p : Pair<a,b>) => p.fst)
    let snd = <a,b>():Fun<Pair<a,b>,b> => Fun((p : Pair<a,b>) => p.snd)

    let map_Pair = <a,b,a1,b1>(f:Fun<a,a1>, g:Fun<b,b1>) : Fun<Pair<a,b>,Pair<a1,b1>> => 
        Fun((p : Pair<a,b>) => ({ fst:f.f(p.fst), snd:g.f(p.snd) }))

    let map_Withnum = <a,b>(f:Fun<a,b>) : Fun<withNum<a>, withNum<b>> =>
        map_Pair(f, id<number>())

    let p1 : Pair<number,number> = { fst: 1, snd: 2 }
    let p2 : Pair<number,number> = { fst: 3, snd: 4 }

    type Id<a> = a
    let map_Id = <a,b>(f:Fun<a,b>) : Fun<Id<a>,Id<b>> => f
}