'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const candidates = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm');

  const sumOfAges = candidates.reduce((sum, man) =>
    sum + (man.died - man.born), 0);

  return sumOfAges / candidates.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const candidates = people.filter(person =>
    withChildren
      ? person.sex === 'f'
      && people.some(human => human.mother === person.name)
      : person.sex === 'f');

  const sumOfAges = candidates.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0);

  return sumOfAges / candidates.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person =>
    onlyWithSon
      ? person.sex === 'm'
      && people.some(woman => woman.name === person.mother)
      : people.some(woman => woman.name === person.mother));

  const motherYears = children.map(child => {
    const mother = people.find(woman => child.mother === woman.name);

    return child.born - mother.born;
  });

  const sumOfAges = motherYears.reduce((a, b) => a + b, 0);

  return sumOfAges / motherYears.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
