
const helper = {
    //remove any blank space from strings and replace with %20//
    removeSpace(string) {
    const splitString = string.split(" ");
    return splitString.join("%20")   
}
}

export default helper