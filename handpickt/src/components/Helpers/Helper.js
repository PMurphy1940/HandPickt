
const helper = {
    //remove any blank space from strings and replace with %20//
    removeSpace(string) {
        const splitString = string.split(" ");
        return splitString.join("%20")   
    },
     firstLetterCase(str) {
        return (str.charAt(0).toUpperCase() + str.slice(1));
     }

}

export default helper