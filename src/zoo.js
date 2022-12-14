const { species, employees, prices, hours } = require('./data');
const data = require('./data');

// Documentação - https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
function getSpeciesByIds(...ids) {
  return species.filter(({ id }) => ids.includes(id));
}

function getAnimalsOlderThan(animal, idade) {
  return species.find((animals) => animals.name === animal)
    .residents.every((oldAge) => oldAge.age >= idade);
}

function getEmployeeByName(names) {
  if (names === undefined) {
    return {};
  }
  return employees.filter(({ firstName, lastName }) => firstName === names || lastName === names)
    .find((fullName) => fullName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(animais) {
  if (animais === undefined) {
    const objetoBichos = {};
    species.forEach((element) => {
      objetoBichos[element.name] = element.residents.length;
    });
    return objetoBichos;
  }
  return species.find(({ name }) => name === animais).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;

  const adultTicket = Adult * prices.Adult;
  const oldTicket = Senior * prices.Senior;
  const kidsTicket = Child * prices.Child;
  return adultTicket + oldTicket + kidsTicket;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const daysList = Object.entries(hours);
  const cronograma = {};
  daysList.forEach(([chave, valor]) => {
    const { open, close } = valor;
    if (dayName === chave || !dayName) {
      cronograma[chave] = (open === 0 && close === 0)
        ? 'CLOSED'
        : `Open from ${open}am until ${close - 12}pm`;
    }
  });
  return cronograma;
}

function getOldestFromFirstSpecies(ids) {
  const employeesName = employees.find(({ id }) => id === ids);
  const speciesName = employeesName.responsibleFor[0];
  const speciesGeneration = species.find(({ id }) => id === speciesName).residents;
  const oldSpecies = speciesGeneration.reduce((acc, curr) => (acc.age > curr.age ? acc : curr));
  return Object.values(oldSpecies);
}

function increasePrices(percentage) {
  const percentageNumber = (percentage / 100) + 1;
  prices.Adult = Math.round(((percentageNumber) * prices.Adult) * 100) / 100;
  prices.Senior = Math.round(((percentageNumber) * prices.Senior) * 100) / 100;
  prices.Child = Math.round(((percentageNumber) * prices.Child) * 100) / 100;
  return prices;
}

function fullNameSpecies(idOrName) {
  const discripitionPerson = employees.find((person) => person.firstName === idOrName
    || person.id === idOrName || person.lastName === idOrName);
  const animalDescripition = employees
    .filter((animals) => discripitionPerson.responsibleFor === animals.responsibleFor);
  const animalId = animalDescripition.map((nameBicho) => nameBicho.responsibleFor);
  const animalSpecies = animalId[0].map((animalBicho) => species
    .filter((bichos) => bichos.id === animalBicho));
  const nameAnimais = animalSpecies.map((bichos) => bichos[0].name);
  const table = {};
  const information = `${discripitionPerson.firstName} ${discripitionPerson.lastName}`;
  table[information] = nameAnimais;
  return table;
}

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    return employees.reduce((acc, curr) => {
      const fullName = `${curr.firstName} ${curr.lastName}`;
      const nameAnimal = curr.responsibleFor.map((animal) => species
        .find((bicho) => bicho.id === animal));
      const animalSpecies = nameAnimal.map((nameBicho) => nameBicho.name);
      acc[fullName] = animalSpecies;
      return acc;
    }, {});
  }
  return fullNameSpecies(idOrName);
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
