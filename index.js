
function createUser(name, age) {
    return { name, age };
}


const users = [];

// Додаємо користувачів
for (let i = 1; i <= 50; i++) {
    users.push(createUser(`User${i}`, 20 + i));
}


function calculateAverageAge(userList) {
    const totalAge = userList.reduce((sum, user) => sum + user.age, 0);
    return totalAge / userList.length;
}

console.log("Середній вік:", calculateAverageAge(users));


function isAdult(user) {
    return user.age >= 18;
}

// Перевіряємо кожного користувача на повноліття
users.forEach(user => {
    console.log(`${user.name} є повнолітнім: ${isAdult(user)}`);
});


function greet(name) {
    return `Привіт, ${name}!`;
}

/** @type {string[]} */
const greetings = users.map(user => greet(user.name));

greetings.forEach(greeting => console.log(greeting));


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генеруємо випадкові числа для демонстрації
for (let i = 0; i < 10; i++) {
    console.log("Випадкове число:", getRandomNumber(1, 100));
}


function createBook(title, author, year) {
    return { title, author, year };
}


const library = [
    createBook("To Kill a Mockingbird", "Harper Lee", 1960),
    createBook("1984", "George Orwell", 1949),
    createBook("The Great Gatsby", "F. Scott Fitzgerald", 1925),
];

// Виводимо інформацію про кожну книгу
library.forEach(book => {
    console.log(`Назва: ${book.title}, Автор: ${book.author}, Рік: ${book.year}`);
});


function countCharacters(str) {
    return str.length;
}

console.log("Кількість букв у рядку 'Hello World':", countCharacters("Hello World"));


function filterBooksByYear(books, year) {
    return books.filter(book => book.year >= year);
}

const modernBooks = filterBooksByYear(library, 1950);
console.log("Книги після 1950 року:", modernBooks);

// Ітерація для демонстрації
for (let i = 0; i < 20; i++) {
    console.log("Ітерація:", i);
}
