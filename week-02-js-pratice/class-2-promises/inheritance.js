class Shape {
    constructor(color) {
        this.color = color;
    }

    paint() {
        console.log(`Painting with color ${this.color}`);
    }

    getDescription() {
        console.log(`A shape with color ${this.color}`);
    }
}

class Rectangle extends Shape {
    constructor(width, height, color) {
        super(color);
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
    getDescription() {
        console.log(`A rectangle with width ${this.width}, height ${this.height} and color ${this.color}`)
    }
}

class Circle extends Shape {
    constructor(radius, color) {
        super(color);
        this.radius = radius;
    }
    area() {
        return this.radius * this.radius * Math.PI;
    }
    getDescription() {
        console.log(`A circle with radius ${this.radius} and color ${this.color}`)
    }
}

let rect = new Rectangle(2, 5, "red");
let cir = new Circle(3, "blue");

console.log(rect);

console.log(rect.area());
console.log(cir.area());

rect.paint();
cir.paint();