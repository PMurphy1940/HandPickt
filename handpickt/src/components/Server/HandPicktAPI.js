const routeURL = "http://localhost:5002"

export default {

    loginQuery(userName) {
    return fetch(`${routeURL}/users?userName=${userName}&_embed=passwords`)
    .then((response) => response.json())
    },

    addNew(newOject, pathway) {
        return fetch(`${routeURL}/${pathway}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newOject)
        }).then(data => data.json())
    }
}