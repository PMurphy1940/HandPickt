const routeURL = "http://localhost:5002"

export default {
    loginQuery(userName) {
    return fetch(`${routeURL}/users?userName=${userName}`)
    .then((response) => response.json())
}
}