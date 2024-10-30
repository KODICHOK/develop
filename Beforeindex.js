// Масив об'єктів для зберігання даних
const data = [];

// Додаємо об'єкти в масив
for (let i = 1; i <= 50; i++) {
    data.push({ name: "Item" + i, value: i });
}

// Проста функція для додавання об'єктів у масив
function addItem(item) {
    data.push(item);
}

// Додаємо новий об'єкт у масив
addItem({ name: "NewItem", value: 51 });

// Функція для підрахунку кількості елементів у масиві
function countItems(array) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        count++;
    }
    return count;
}

console.log("Кількість елементів:", countItems(data));

// Функція для пошуку елементів за значенням
function findItem(array, name) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].name === name) {
            return array[i];
        }
    }
    return null;
}

console.log("Знайдений елемент:", findItem(data, "NewItem"));

// Функція для обчислення сумарного значення усіх об'єктів
function calculateTotal(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        total += array[i].value;
    }
    return total;
}

console.log("Сумарне значення:", calculateTotal(data));

// Фільтрація елементів за умовою
function filterItems(array, min) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].value >= min) {
            result.push(array[i]);
        }
    }
    return result;
}

console.log("Елементи з мінімальним значенням 25:", filterItems(data, 25));

// Масив строк для демонстрації роботи з рядками
const strings = ["apple", "banana", "cherry"];

// Додаємо новий рядок у масив
strings.push("date");

// Функція для об'єднання строк у рядок через кому
function joinStrings(array) {
    let result = "";
    for (let i = 0; i < array.length; i++) {
        result += array[i];
        if (i < array.length - 1) {
            result += ", ";
        }
    }
    return result;
}

console.log("З'єднаний рядок:", joinStrings(strings));

// Ітерація для демонстрації
for (let i = 0; i < 10; i++) {
    console.log("Ітерація:", i);
}

// Функція для створення нового масиву з модифікованими елементами
function modifyArray(array, increment) {
    const modified = [];
    for (let i = 0; i < array.length; i++) {
        modified.push({ name: array[i].name, value: array[i].value + increment });
    }
    return modified;
}

console.log("Модифікований масив:", modifyArray(data, 5));

// Простий об'єкт для зберігання параметрів
const settings = {
    theme: "dark",
    notifications: true,
    version: "1.0.0"
};

// Функція для виведення налаштувань
function displaySettings(config) {
    for (let key in config) {
        console.log(key + ":", config[key]);
    }
}

displaySettings(settings);
