// use map: country -> capital, largest cities (population)
var MAP = new Map();
MAP.set('Canada', 'Ottawa');
MAP.set('United States', 'Washington D.C.');
MAP.set('Mexico', 'Mexico City');

// return a random country
function randomCountry() {
    return Array.from(MAP.keys())[Math.floor(Math.random() * MAP.size)];
}


// export data
export { MAP, randomCountry };