fetch = require('node-fetch');

// Fonction d'appel API générique
const call = (body) => {
    fetch('http://localhost:4000/graphql', {
        body,
        headers: {
            'content-type': 'application/graphql',
        },
        method: 'POST',
    })
    //.then(response => response.json())
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}
// Demande d'information à l'API (query)
call(
    `query {
        videos {
            id
            title
            owner {
                name
            }
        }
    }`
);
// Ajout d'un nouvel objet à l'API (mutation)
call(
    `mutation {
        createVideo(title: "Mon super titre", ownerId: 1) {
            id
            title
            owner {
                name
            }
        }
    }`
);
