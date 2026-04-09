interface Users {
  name: string;
  age: number;
  address?: {
    // this is an optional address field
    city: string;
    country: string;
    pincode: number;
  };
}

let user1: Users = {
  name: "Alice",
  age: 22,
  address: {
    city: "Delhi",
    country: "India",
    pincode: 123456,
  },
};

let user2: Users = {
  name: "Bob",
  age: 20,
};

if (user1.age > 18) {
  console.log(user1.name + " is Adult");
}
if (user2.age > 18) {
  console.log(user2.name + " is Adult");
}

interface Subject {
  subject1: string;
  subject2: string;
  subject3: string;
}

interface Student {
  name: string;
  rollNo: number;
  subjects?: Subject;
}

interface Teacher {
  name: string;
  subjects?: Subject;
}

const student1: Student = {
  name: "Alice",
  rollNo: 3,
  subjects: {
    subject1: "Physics",
    subject2: "Chemistry",
    subject3: "Mathematics",
  },
};

const teacher1: Teacher = {
  name: "Mr. Bob",
  subjects: {
    subject1: "Physics",
    subject2: "Chemistry",
    subject3: "Mathematics",
  },
};
console.log(student1);
console.log(teacher1);

// ------------------------- Class Inheritance and Method Overriding -----------------------------
class Shape {
  // Base method for calculating area
  area(): void {
    console.log("This is a generic area calculation for a Shape.");
  }
}

class Circle extends Shape {
  // Re-defining the area method specifically for circular logic
  area(): void {
    console.log("Calculating area using the formula: π * r^2.");
  }
  // Unique method belonging only to the Circle class
  perimeter(): void {
    console.log("Calculating circumference using the formula: 2 * π * r.");
  }
}

const basicShape = new Shape();
basicShape.area();

const myCircle = new Circle();
myCircle.area(); // Uses the specialized Circle version
myCircle.perimeter(); // Uses the Circle-specific method

// ---------------------- Interfaces and Shorthand Constructors ---------------------------------

interface Human {
  name: string;
  age: number;
  greet: () => string;
  isLegal: () => boolean;
}

class Manager implements Human {
  // if Human Interface is implemented, we must define the properties name and age
  // 'phone' is a private detail not required by the Human interface
  phone: number;

  // name: string;
  // age: number;
  // constructor(name: string, age: number) {
  //   this.name = name;
  //   this.age = age;
  //   this.phone = 555010203; // Assigning a default business contact number
  // }

  // Using the public keyword in the constructor automatically initializes
  // the variables 'name' and 'age' without needing extra code lines.
  constructor(
    public name: string,
    public age: number,
  ) {
    this.phone = 555010203; // Assigning a default business contact number
  }

  // Implementation of the greet method using an arrow function
  greet = () => {
    return "Greetings, my name is " + this.name;
  };

  // Logic to determine if the manager meets the age requirement (21+)
  isLegal() {
    return this.age >= 21;
  }
}

const leadManager = new Manager("Alice", 28);

console.log(leadManager);
console.log(`Manager Age: ${leadManager.age}`);

const introMessage = leadManager.greet();
console.log(introMessage);

// Referencing the function without executing it
console.log(leadManager.isLegal);

// ---------------------------- Abstract Classes -------------------------------------

abstract class User {
  name: string;

  // Constructor to ensure every User has a name property
  constructor(name: string) {
    this.name = name;
  }

  // Abstract: Every child class MUST write their own greet logic
  abstract greet(): string;

  // Concrete: Every child class inherits this exact behavior
  hello(): void {
    console.log("System Broadcast: Welcome to the platform!");
  }
}

class Employee1 extends User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    // Calling the parent (User) constructor
    super(name);
    this.name = name;
    this.age = age;
  }

  // Completing the abstract requirement
  greet(): string {
    return "Welcome back, " + this.name + ". Ready to work?";
  }
}

const staffMember = new Employee1("Alice Z", 25);

console.log(staffMember.greet());
staffMember.hello(); // Inherited from the abstract User class

// ----------------------------------- Intersection and Union Types -----------------------------

// Define a core Employment structure
type Employee = {
  name: string;
  startDate: string;
};

// Define a structural Department structure
type Staff = {
  name: string;
  department: string;
};

// Combine both structures using an Intersection (&)
type TeamLead = Employee & Staff;

const regularWorker: Employee = {
  name: "Yuli",
  startDate: "2022-01-01",
};
const supportStaff: Staff = {
  name: "Sarah",
  department: "Customer Success",
};

// This object must satisfy all properties from both Employee and Staff
const leadAccountant: TeamLead = {
  name: "Vicky",
  startDate: "2022-01-01",
  department: "Financial Operations",
};

// Union Types

// Restricting values to specific strings
type PaymentStatus = "paid" | "unpaid" | "pending";

let transactionStatus: PaymentStatus;
transactionStatus = "pending"; // This works!

// --------------------------- Array Filtering and Objects --------------------

type ProductType = {
  name: string;
  price: number;
  category: string;
};

function filterProductsByPrice(
  products: ProductType[],
  minPrice: number,
): ProductType[] {
  // Use the built-in filter method to find items meeting the price threshold
  return products.filter((item) => item.price >= minPrice);
}

const inventoryResults = filterProductsByPrice(
  [
    { name: "Smartphone", price: 850, category: "Tech" },
    { name: "Digital Pen", price: 45, category: "Accessories" },
    { name: "4K Monitor", price: 320, category: "Tech" },
  ],
  100, // Minimum price threshold
);

console.log(inventoryResults);

// User Filtering
interface UserName {
  name: string;
  state: string;
  age: number;
}

function filterUser(users: UserName[]) {
  const verifiedUsers: UserName[] = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    // Only include users who are 18 or older
    if (user && user.age >= 18) {
      verifiedUsers.push(user);
    }
  }

  return verifiedUsers;
}

const activeMembers = filterUser([
  { name: "Ayush", state: "Washington", age: 25 },
  { name: "Vicky", state: "Oregon", age: 17 },
  { name: "Yuli", state: "California", age: 31 },
  { name: "Advit", state: "Nevada", age: 14 },
]);

console.log(activeMembers); // Displays only Ayush and Yuli
