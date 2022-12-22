
/**
 * This function will be used in the Register functions for the Material UI inputs: 
 * we want to take the name passed to the components let's say: First Name
 * remove the spaces, and make the first letter lower cased, because our Apis will have
 * the names in camel lowercase e.g: firstName
 */
const lowerNoSpace = (string: string): string => {
    // Make the first letter lowercased and return the string
    const lowercased = string.charAt(0).toLowerCase() + string.slice(1)
    // 
    const withNoSpaces = lowercased.split(' ').join('');
    return withNoSpaces;
}

export default lowerNoSpace