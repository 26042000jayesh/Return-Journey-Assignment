const Car = {
    brand: '',
    model: '',
    year: 0,
};

// Function to merge two car objects
const mergeObjects = (obj1, obj2) => {
    const merged = {};
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            merged[key] = obj1[key];
        }
    }
    for (const key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            if (typeof obj2[key] === 'function') {
                if (typeof merged[key] === 'function') {
                    merged[`${key}_from_obj2`] = obj2[key];
                } else {
                    merged[key] = obj2[key];
                }
            } else {
                merged[key] = obj2[key];
            }
        }
    }
    return merged;
}


const car1 = {
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    start: function () {
        console.log(`${this.brand} ${this.model} started from car1.`);
    },
    apply_brakes: function () {
        console.log(`${this.brand} ${this.model} applied brakes from car1.`);
    },
};

const car2 = {
    brand: 'Honda',
    model: 'Accord',
    year: 2019,
    start: function () {
        console.log(`${this.brand} ${this.model} started from car2.`);
    },
    stop: function () {
        console.log(`${this.brand} ${this.model} stopped from car2.`);
    },
};

const mergedCar = mergeObjects(car1, car2);
console.log(mergedCar);
