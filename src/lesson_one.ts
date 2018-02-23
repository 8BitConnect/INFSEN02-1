//DO NOT USE CLASSES IN THIS COURSE! ONLY FOR THIS EXAMPLE!
export namespace lesson_one {
    class Int {
        value: number

        constructor() {
            this.value = 0
        }

        incr() {
            this.value++
        }

        decr() {
            this.value--
        }
    }

    class EvenCounter {
        value: Int
        constructor() {
            this.value = new Int()
        }

        tick() {
            this.value.incr()
            this.value.incr()
            return this
        }
    }

    class Counter {
        value: Int
        constructor() {
            this.value = new Int()
        }

        tick() {
            this.value.incr()
            return this
        }
    }

    let ec = new EvenCounter()
    let c = new Counter()

    //Assigning a value does not assign ec.value with the value of c.value, but copies its reference (now points to the same value on the heap).
    ec.value = c.value

    ec.tick()
    c.tick()

    // console.log(ec.value)
    // console.log(c.value)
}