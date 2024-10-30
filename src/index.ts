//Для початку створимо початкові данні які буудемо використовувати, а саме дні тижня, час проведення пар та тип пар
type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

// Створимо основу
type Professor = {
    id: number;
    name: string;
    department: string;
};

type Classroom = {
    number: string;
    capacity: number;
    hasProjector: boolean;
};

type Course = {
    id: number;
    name: string;
    type: CourseType;
};

type Lesson = {
    courseId: number;
    professorId: number;
    classroomNumber: string;
    dayOfWeek: DayOfWeek;
    timeSlot: TimeSlot;
};

type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};
//---------------------------------------

// Тепер, створимо масив до кожного типу данних
let professors: Professor[] = [];
let classrooms: Classroom[] = [];
let courses: Course[] = [];
let schedule: Lesson[] = [];

function addProfessor(professor: Professor): void {
    professors.push(professor);
}

// Функція для додавання заняття, після перевірок, при додаванні не докінця конкретної інформації уроку або коли вийшов конфлікт, отримали очікуваний результат конфлікту
function addLesson(lesson: Lesson): boolean {
    const conflict = validateLesson(lesson);
    if (conflict === null) {
        schedule.push(lesson);
        return true;
    }
    console.log("Conflict found:", conflict);
    return false;
}

// Пошук вільних аудиторій у вказаний час
function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map(lesson => lesson.classroomNumber);

    return classrooms
        .map(classroom => classroom.number)
        .filter(classroomNumber => !occupiedClassrooms.includes(classroomNumber));
}

// Розклад конкретного викладача
function getProfessorSchedule(professorId: number): Lesson[] {
    return schedule.filter(lesson => lesson.professorId === professorId);
}

// Перевірка на конфлікти при додаванні заняття, також працює коректно
function validateLesson(lesson: Lesson): ScheduleConflict | null {
    const professorConflict = schedule.find(l => 
        l.professorId === lesson.professorId &&
        l.timeSlot === lesson.timeSlot &&
        l.dayOfWeek === lesson.dayOfWeek
    );

    if (professorConflict) {
        return { type: "ProfessorConflict", lessonDetails: professorConflict };
    }

    const classroomConflict = schedule.find(l => 
        l.classroomNumber === lesson.classroomNumber &&
        l.timeSlot === lesson.timeSlot &&
        l.dayOfWeek === lesson.dayOfWeek
    );

    if (classroomConflict) {
        return { type: "ClassroomConflict", lessonDetails: classroomConflict };
    }

    return null;
}

// Відсоток використання аудиторії
function getClassroomUtilization(classroomNumber: string): number {
    const totalSlots = 5 * 5; 
    const usedSlots = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
    return (usedSlots / totalSlots) * 100;
}

// Найпопулярніший тип заняття
function getMostPopularCourseType(): CourseType {
    const courseTypeCount: Record<CourseType, number> = {
        Lecture: 0,
        Seminar: 0,
        Lab: 0,
        Practice: 0
    };

    schedule.forEach(lesson => {
        const course = courses.find(c => c.id === lesson.courseId);
        if (course) {
            courseTypeCount[course.type]++;
        }
    });

    return Object.keys(courseTypeCount).reduce((a, b) => 
        courseTypeCount[a as CourseType] > courseTypeCount[b as CourseType] ? a : b
    ) as CourseType;
}

// Зміна аудиторії для заняття
function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
    const lesson = schedule.find(lesson => lesson.courseId === lessonId);
    if (!lesson) {
        return false;
    }

    const conflict = validateLesson({ ...lesson, classroomNumber: newClassroomNumber });
    if (conflict === null) {
        lesson.classroomNumber = newClassroomNumber;
        return true;
    }
    return false;
}

// Видалення заняття з розкладу
function cancelLesson(lessonId: number): void {
    schedule = schedule.filter(lesson => lesson.courseId !== lessonId);
}

// Для перевірки було вибрано 5 уявних професорів
addProfessor({ id: 1, name: "Олександр Сергійович", department: "Computer Science" });  
addProfessor({ id: 2, name: "Валентин Григорович", department: "Physics" });         
addProfessor({ id: 3, name: "Михайло Олегович", department: "Mathematics" });     
addProfessor({ id: 4, name: "Джон Сміт", department: "English" });          
addProfessor({ id: 5, name: "Артем Олександрович", department: "Philosophy" });     

// Також було додано 5 аудиторій
classrooms.push({ number: "101", capacity: 30, hasProjector: true });
classrooms.push({ number: "102", capacity: 25, hasProjector: false });
classrooms.push({ number: "103", capacity: 35, hasProjector: true });
classrooms.push({ number: "104", capacity: 20, hasProjector: false });
classrooms.push({ number: "105", capacity: 50, hasProjector: true });

// Додання курсів кожного типу, а саме лекцій, семінарів, лабораторних та практичних
courses.push({ id: 1, name: "Programming", type: "Lecture" });
courses.push({ id: 2, name: "Physics", type: "Lecture" });
courses.push({ id: 3, name: "Higher Mathematics", type: "Lecture" });
courses.push({ id: 4, name: "English", type: "Lecture" });
courses.push({ id: 5, name: "Philosophy", type: "Lecture" });

courses.push({ id: 6, name: "Programming", type: "Seminar" });
courses.push({ id: 7, name: "Physics", type: "Seminar" });
courses.push({ id: 8, name: "Higher Mathematics", type: "Seminar" });
courses.push({ id: 9, name: "English", type: "Seminar" });
courses.push({ id: 10, name: "Philosophy", type: "Seminar" });

courses.push({ id: 11, name: "Programming", type: "Lab" });
courses.push({ id: 12, name: "Physics", type: "Lab" });
courses.push({ id: 13, name: "Higher Mathematics", type: "Lab" });
courses.push({ id: 14, name: "English", type: "Lab" });
courses.push({ id: 15, name: "Philosophy", type: "Lab" });

courses.push({ id: 16, name: "Programming", type: "Practice" });
courses.push({ id: 17, name: "Physics", type: "Practice" });
courses.push({ id: 18, name: "Higher Mathematics", type: "Practice" });
courses.push({ id: 19, name: "English", type: "Practice" });
courses.push({ id: 20, name: "Philosophy", type: "Practice" });

//додавання пар, понеділок кожний професор проводить 2 лекції
addLesson({
    courseId: 1,
    professorId: 1,
    classroomNumber: "101",
    dayOfWeek: "Monday",
    timeSlot: "8:30-10:00"
});
addLesson({
    courseId: 1,
    professorId: 1,
    classroomNumber: "101",
    dayOfWeek: "Monday",
    timeSlot: "10:15-11:45"
});

addLesson({
    courseId: 2,
    professorId: 2,
    classroomNumber: "102",
    dayOfWeek: "Monday",
    timeSlot: "12:15-13:45"
});
addLesson({
    courseId: 2,
    professorId: 2,
    classroomNumber: "102",
    dayOfWeek: "Monday",
    timeSlot: "15:45-17:15"
});

addLesson({
    courseId: 3,
    professorId: 3,
    classroomNumber: "103",
    dayOfWeek: "Monday",
    timeSlot: "8:30-10:00"
});
addLesson({
    courseId: 3,
    professorId: 3,
    classroomNumber: "103",
    dayOfWeek: "Monday",
    timeSlot: "12:15-13:45"
});

addLesson({
    courseId: 4,
    professorId: 4,
    classroomNumber: "104",
    dayOfWeek: "Monday",
    timeSlot: "10:15-11:45"
});
addLesson({
    courseId: 4,
    professorId: 4,
    classroomNumber: "104",
    dayOfWeek: "Monday",
    timeSlot: "15:45-17:15"
});

addLesson({
    courseId: 5,
    professorId: 5,
    classroomNumber: "105",
    dayOfWeek: "Monday",
    timeSlot: "14:00-15:30"
});
addLesson({
    courseId: 5,
    professorId: 5,
    classroomNumber: "105",
    dayOfWeek: "Monday",
    timeSlot: "15:45-17:15"
});
//----------------------------
//У вівторок та середу практичні дні, преподи викладають практичні по своєму предмету (по 1 на день)
addLesson({
    courseId: 16,
    professorId: 1,
    classroomNumber: "101",
    dayOfWeek: "Tuesday",
    timeSlot: "12:15-13:45"
});
addLesson({
    courseId: 17,
    professorId: 2,
    classroomNumber: "102",
    dayOfWeek: "Tuesday",
    timeSlot: "8:30-10:00"
});
addLesson({
    courseId: 18,
    professorId: 3,
    classroomNumber: "103",
    dayOfWeek: "Tuesday",
    timeSlot: "14:00-15:30"
});
addLesson({
    courseId: 19,
    professorId: 4,
    classroomNumber: "104",
    dayOfWeek: "Tuesday",
    timeSlot: "15:45-17:15"
});
addLesson({
    courseId: 20,
    professorId: 5,
    classroomNumber: "105",
    dayOfWeek: "Tuesday",
    timeSlot: "10:15-11:45"
});

addLesson({
    courseId: 16,
    professorId: 1,
    classroomNumber: "101",
    dayOfWeek: "Wednesday",
    timeSlot: "12:15-13:45"
});
addLesson({
    courseId: 17,
    professorId: 2,
    classroomNumber: "102",
    dayOfWeek: "Wednesday",
    timeSlot: "8:30-10:00"
});
addLesson({
    courseId: 18,
    professorId: 3,
    classroomNumber: "103",
    dayOfWeek: "Wednesday",
    timeSlot: "14:00-15:30"
});
addLesson({
    courseId: 19,
    professorId: 4,
    classroomNumber: "104",
    dayOfWeek: "Wednesday",
    timeSlot: "15:45-17:15"
});
addLesson({
    courseId: 20,
    professorId: 5,
    classroomNumber: "105",
    dayOfWeek: "Wednesday",
    timeSlot: "10:15-11:45"
});
//----------------------------------
//Четвер, день семінара філософії та математики, на них виділена подвійна пара
addLesson({
    courseId: 8,
    professorId: 3,
    classroomNumber: "103",
    dayOfWeek: "Thursday",
    timeSlot: "8:30-10:00"
});
addLesson({
    courseId: 8,
    professorId: 3,
    classroomNumber: "103",
    dayOfWeek: "Thursday",
    timeSlot: "10:15-11:45"
});

addLesson({
    courseId: 10,
    professorId: 5,
    classroomNumber: "105",
    dayOfWeek: "Thursday",
    timeSlot: "14:00-15:30"
});
addLesson({
    courseId: 10,
    professorId: 5,
    classroomNumber: "105",
    dayOfWeek: "Thursday",
    timeSlot: "15:45-17:15"
});
//П'ятниця день лабораторних, преподи викладають по одній лабораторні
addLesson({
    courseId: 11,
    professorId: 1,
    classroomNumber: "101",
    dayOfWeek: "Friday",
    timeSlot: "15:45-17:15"
});
addLesson({
    courseId: 12,
    professorId: 2,
    classroomNumber: "102",
    dayOfWeek: "Friday",
    timeSlot: "14:00-15:30"
});
addLesson({
    courseId: 13,
    professorId: 3,
    classroomNumber: "103",
    dayOfWeek: "Friday",
    timeSlot: "8:30-10:00"
});
addLesson({
    courseId: 14,
    professorId: 4,
    classroomNumber: "104",
    dayOfWeek: "Friday",
    timeSlot: "12:15-13:45"
});
addLesson({
    courseId: 15,
    professorId: 5,
    classroomNumber: "105",
    dayOfWeek: "Friday",
    timeSlot: "10:15-11:45"
});
//-------------------------------
//перевірка розкладу препода
console.log("Розклад викладача Олександра Сергійовича:", getProfessorSchedule(1));
console.log("Розклад викладача Валентина Григоровича:", getProfessorSchedule(2));
console.log("Розклад викладача Михайла Олеговича:", getProfessorSchedule(3));
console.log("Розклад викладача Джона Сміта:", getProfessorSchedule(4));
console.log("Розклад викладача Артема Олександровича:", getProfessorSchedule(5));

console.log("Вільні аудиторії на понеділок з 8:30 до 10:00:", findAvailableClassrooms("8:30-10:00", "Monday"));
console.log("Розклад викладача Олександра Сергійовича:", getProfessorSchedule(1));
console.log("Використання аудиторії 101:", getClassroomUtilization("101"));
console.log("Найпопулярніший тип заняття:", getMostPopularCourseType());

// Виведемо розклад, щоб знайти урок, який потрібно видалити
console.log(schedule);
cancelLesson(16);
console.log("Розклад після видалення заняття в середу:");
console.log(schedule);