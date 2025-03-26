/*
--transpile-only
javascriptremotero46 RO
7:29 PM
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "target": "ESNext",
    "strict": true
  }
}
  */

let userId: number; // Should be a number
let userName: string; // Should be a string
let isPremiumUser: boolean; // Should be a boolean

userId = 123;
userName = "Alice";
isPremiumUser = true;

type Car = {
  // Define properties here
  brand: string;
  model: string;
  year: number;
};

const myCar: Car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
};

function multiply(a: number, b: number): number {
  return a * b;
}

type Role = "admin" | "user" | "unknown";

let userRole: Role;

userRole = "admin"; // Valid
userRole = "user"; // Valid
userRole = "unknown"; // Should cause a TypeScript error

type Thumb = {
  _id: string;
  public_id: string;
  url: string;
} | null;

type Profile = {
  // Add properties here
  name: string;
  email?: string;
  thumb?: Thumb;
};

const profile: Profile = {
  name: "John",
};

type Book = {
  readonly id: string;
  title: string;
};

const book: Book = {
  id: "1",
  title: "TypeScript Basics",
};

const languages: string[] = ["JavaScript", "TypeScript", "Python"];

type Tuple_1 = [number, number, string?];

const el: Tuple_1 = [1, 2, "3"];

const el_2: any = "2, ";

el_2.split(",")[0];

export enum CartActions {
  SET_CART = "SET_CART",
  INC_QTY = "ADD_CART",
  DEC_QTY = "DEQ_QTY",
  DEL_ITEM = "DEL_ITEM",
  DEL_CART = "DEL_CART",
}
