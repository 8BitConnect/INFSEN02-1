import { Fun } from './Fun'

export let incr = Fun<number, number>((x : number) => x + 1)

export let double = Fun<number, number>((x:number) => x * 2)

export let square = Fun<number, number>((x:number) => x * x)

export let sqrt = Fun<number, number>((x:number) => Math.sqrt(x))

export let invert = Fun<boolean, boolean>((x:boolean) => !x)

export let invert_num = Fun<number, number>((x:number) => -x)

export let is_even = Fun<number, boolean>((x:number) => x % 2 == 0)

export let is_positive = Fun<number, boolean>((x:number) => x >= 0 ? true : false)