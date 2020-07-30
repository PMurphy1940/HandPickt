
const helper = {
    //remove any blank space from strings and replace with %20//
    removeSpace(string) {
        const splitString = string.split(" ");
        return splitString.join("%20")   
    },
     firstLetterCase(str) {
        return (str.charAt(0).toUpperCase() + str.slice(1));
     },
     
     dateConverter(suppliedDate) {
        let date = suppliedDate.toString()
        date = date.slice(0,10)
        date = date.split("-")
        return date = `${date[1]}-${date[2]}-${date[0]}`
    }

}

export default helper