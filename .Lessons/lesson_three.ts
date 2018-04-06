export module lesson_three{
// Part one
  // THIS IS A TYPE
    interface Fun<a, b> {
      // The underscore in (_:a) is a replacement for a parameter name. 
      // You could replace it by anything to name the parameter.
      f: (_:a) => b
      then: <c>(g: Fun<b, c>) => Fun<a, c>
  }

  // THIS IS A FUNCTION
  let Fun = function<a,b>(f: (_:a) => b): Fun<a, b> {
    return {
      f:f,
      then: function<c>(g: Fun<b, c>) : Fun<a, c> {
        return Fun<a, c>((x:a) => g.f(this.f(x)))
      }
    }
  }
// Part two
  interface Countainer<a> {
    value: a,
    counter: number,
    // map_countainer: <b>(f: Fun<a, b>) => Fun<a, b>
  }

  let Countainer = function<a>(v: a) : Countainer<a> {
    return { 
      value: v, 
      counter: 0
    }
  }

  let map_Countainer = function<a, b>(f: Fun<a, b>) : Fun<Countainer<a>, Countainer<b>> {
   return Fun<Countainer<a>, Countainer<b>>((c: Countainer<a>) => Countainer(f.f(c.value)))
  }

  let incr = Fun<number, number>(x => x + 1)
  let convert = Fun<number, string>(x => String(x))

// Part three
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
  }