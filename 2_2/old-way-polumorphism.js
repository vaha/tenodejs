function Car(model, color, power) {
    this.model;
    this.color = color;
    this.power = power
};

Car.prototype.beep = function() {
    console.log("Beep");
}

Car.prototype.showColor = function() {
    console.log(this.color);
}

function Truck(model, color, power, wheels, deadWeight) {
    Car.call(this, model, color, power);
    this.wheels = wheels;
    this.deadWeight = deadWeight;
}

Truck.prototype = new Car();

function MotorCar(model, color, power, passengers) {
    Car.call(this, model, color, power);
    this.passengers = passengers;
}

MotorCar.prototype = new Car();
MotorCar.prototype.showPower = function() {
    console.log("Wrooom: " + this.power);
}

function Taxi(model, color, power, passengers, price) {
    MotorCar.call(this, model, color, power, passengers);
    this.price = price;
}

Taxi.prototype = new MotorCar();


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