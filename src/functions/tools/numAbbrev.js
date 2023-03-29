module.exports = (client) => {
    client.numAbbrev = async (string) => {
        const input = string.toLowerCase().replace(/ /g, '').replace(/,/g, '');

        const numberString = input.match(/[^a-z]+/); // Separates the number (and its decimal points) from the string
        const multiplierString = input.match(/[a-z]+/); // Separates the multiplier if given

        if (multiplierString == null) { // If no multi is provided
            return Number(numberString[0]); // Returns just the number (as a Number)
        } else if (numberString == null) { // If no numbers are provided
            return false;
        } else if (Number(numberString[0]) == NaN || null) { // If numberString isn't actually a number
            return false;
        } else {
            const numberIn = Number(numberString[0]);
            const multi = multiplierString[0];
            if (['k', 'thousand'].includes(multi)) {
                return (numberIn * 1000);
            } else if (['m', 'mil', 'mill', 'million'].includes(multi)) {
                return (numberIn * 1000000);
            } else if (['b', 'bil', 'bill', 'billion'].includes(multi)) {
                return (numberIn * 1000000000);
            } else {
                return false;
            }
        }
    }
}