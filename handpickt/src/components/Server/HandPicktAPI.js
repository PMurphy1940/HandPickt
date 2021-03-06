const routeURL = "http://localhost:5002"

export default {

    loginQuery(value, searchType) {
    return fetch(`${routeURL}/users?${searchType}=${value}`)
    .then((response) => response.json())
    },

    addNew(newOject, pathway) {
        return fetch(`${routeURL}/${pathway}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newOject)
        }).then(data => data.json())
    },
    
    getAll(pathway) {
        return fetch(`${routeURL}/${pathway}` )
        .then((response) => response.json())
    },

    getOne(id, pathway, addquery) {
        return fetch(`${routeURL}/${pathway}?id=${id}${addquery}` )
        .then((response) => response.json())
    },

    updateOne(newOject, id, pathway) {
        return fetch(`${routeURL}/${pathway}/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newOject)
        }).then(data => data.json())
    },
    search(pathway, query) {
        return fetch(`${routeURL}/${pathway}?q=${query}`)
        .then((response)=> response.json())
    },

    searchPlantsDB(pathway, id, query) {
        return fetch(`${routeURL}/${pathway}?${id}&q=${query}`)
        .then((response)=> response.json())
    },

    searchUserPlants(pathway, id, query) {
        return fetch(`${routeURL}/${pathway}?${id}&q=${query}`)
        .then((response)=> response.json())
    },

    delete(pathway, id, ) {
        return fetch(`${routeURL}/${pathway}/${id}`, {
            method: "DELETE"
        }).then(data => data.json())
    },

}