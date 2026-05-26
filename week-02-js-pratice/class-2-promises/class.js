class Rectangle {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }

    area() {
        return this.width * this.height;
    }
    paint() {
        console.log(`Painting with color ${this.color}`);
    }

}

let rect = new Rectangle(2, 4, "blue");

let area = rect.area();
console.log(area);
rect.paint();


