import { readFileSync } from 'fs';

type NumberMap = {
  str: string;
  replaceValue: string;
}
/**
 * str: OG lookup
 * replaceValue: keep the padding for the words incase two nums bump up
 * ex: 4nineeightseven2
 */
const NUMS_MAP: NumberMap[] = [
  {str:'one', replaceValue: 'o1e'},
  {str: 'two', replaceValue: 't2o'},
  {str: 'three', replaceValue: 't3e'},
  {str: 'four', replaceValue: 'f4r'},
  {str: 'five', replaceValue: 'f5e'},
  {str: 'six', replaceValue: 's6x'},
  {str: 'seven', replaceValue: 's7n'},
  {str: 'eight', replaceValue: 'e8t'},
  {str: 'nine', replaceValue: 'n9e'}
];

/**
 * transform any spelled out numbers into the replaceValue
 * @param word
 * @returns string
 */
const transformWordToNumber = (word: string): string => {
  NUMS_MAP.forEach(num => {
    if(word.includes(num.str)){
      word = word.replaceAll(num.str, num.replaceValue);
    }
  });

  return word;
};

// read and split
const words = readFileSync('./data/day1.txt', 'utf-8');
const strArr = words.split('\n');

// get total
const sum = strArr.reduce((acc, word) => {
  const transformedWord = transformWordToNumber(word);
  const transformedWordSplit = transformedWord.split('');

  const first = transformedWordSplit.find((char: string) => parseInt(char));
  const last = transformedWordSplit.findLast((char: string) => parseInt(char));

  return (first && last) ? parseInt(first + last) + acc : acc;
}, 0);

console.log(sum);
