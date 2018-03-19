export namespace lesson_four{

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

  type Option<a> = {
      kind: "None"
    } | {
      kind: "Some",
      value: a
    }
  
  let None = function<a>() : Option<a> {
    return { kind: "None" }
  }

  let Some = function<a>(v: a) : Option<a> {
    return { kind: "Some", value: v }
  }

  let map_Option = function<a, b>(f: Fun<a,b>) : Fun<Option<a>, Option<b>> {
    let g = ((opt: Option<a>) : Option<b> => {
      if (opt.kind == "None"){
        return None<b>()
      }
      else {
        return Some<b>(f.f(opt.value))
      }
    })
      return Fun<Option<a>, Option<b>>(g)
  }

  let opt = Some<number>(5)
  let id = Fun<number,number>(x => x)
  let convert = Fun<number, string>(x => String(x))
  //console.log(map_Option(id).f(opt))

  //LIST MONOID
  type List<a> = {
    kind : "empty"
  } | {
    kind : "::",
    head : a,
    tail : List<a>
  }
  
  let Empty = function<a>() : List<a> {
    return { kind : "empty" }
  }

  let Cons = function<a>(head: a, tail: List<a>) : List<a> {
    return {
      kind: "::",
      head: head,
      tail: tail
    }
  }

  let map_List = function<a, b>(mapper: Fun<a, b>) : Fun<List<a>,List<b>> {
    let g = (l: List<a>) : List<b> => {
      if(l.kind == "empty"){
        return Empty<b>()
      }
      else {
        let newHead = mapper.f(l.head)
        let newList = g(l.tail)
        return Cons<b>(newHead, newList)
      }
    }
    return Fun<List<a>, List<b>>(g)
  }

  let concat = function<a>(l1: List<a>, l2: List<a>) : List<a> {
    if(l1.kind == "empty"){
      return l2
    } else {
      let restConcat = concat(l1.tail, l2)
      return Cons<a>(l1.head, restConcat)
    }
  }

  let oneList = Cons(5, Cons(6, Empty()))
  let twoList = Empty()
  let nl = concat(oneList, twoList)
  console.log(nl)
}