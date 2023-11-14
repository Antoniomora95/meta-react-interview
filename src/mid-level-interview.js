// given a string ABCDDEFGHJK
//get the longest substring that does not have repeated characters and return it

//AAABBCD

const getlongestUniqueCharacters = (str = '') => {
    let longest = '';
    let iterationsLongest = '';

    for (const char of str) {
        const includesChar = iterationsLongest.includes(char);
        iterationsLongest = !includesChar ? iterationsLongest+char : char;

        if (iterationsLongest.length > longest.length) {
            longest = iterationsLongest;
        }
    }
    return longest;
}

export default getlongestUniqueCharacters;