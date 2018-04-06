import { incr, is_positive, double, invert, square, invert_num, is_even, sqrt } from './Computations'
import { Fun } from './Fun'

//1
console.log(incr.then(is_positive).f(4))

//2
console.log(incr.then(double.then(is_positive)).f(4))

//3
let three = Fun<number, number>((x:number) => {
    if(x >= 0){
        return square.f(x)
    } else {
        return invert_num.then(square).f(x)
    }
})
console.log(three.f(-3))

//4
let four = Fun<number,number>((x:number) => {
    if(is_even.f(square.f(x))){
        return square.then(invert_num).f(x)
    } else {
        return sqrt.f(x)
    }
})
console.log(four.f(3))

//5
console.log(incr.repeat().f(5).f(3))