class Car {
    constructor(model, color, power) {
        this.model;
        this.color = color;
        this.power = power
    };

    beep() {
        console.log("Beep");
    };

    showColor () {
        console.log(this.color);
    };
}

class Truck extends Car {
    constructor(model, color, power, wheels, deadWeight) {
        super(model, color, power);
        this.wheels = wheels;
        this.deadWeight = deadWeight;
    };
}

class MotorCar extends Car {
    constructor(model, color, power, passengers) {
        super(model, color, power);
        this.passengers = passengers;
    };

    showPower() {
        console.log("Wrooom: " + this.power);
    };
}

class Taxi extends MotorCar {
    constructor(model, color, power, passengers, price) {
        super(model, color, power, passengers);
        this.price = price;
    }
}

let truck = new Truck("Volvo", "silver", 1000, 6, 1000);
let taxi = new Taxi("VAZ", "yellow", 100, 3, 10);
let auto = new MotorCar("SEAT", "white", 150, 3);

truck.beep();
taxi.beep();
auto.beep();

truck.showColor();
taxi.showColor();
auto.showColor();

auto.showPower();