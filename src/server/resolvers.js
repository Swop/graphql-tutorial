// Chargement du modèle
const { users, videos } = require ('./model');

module.exports = {
    // Définitions des queries
    Query: {
        video: (_, { id }) => {
            return videos.find(video => video.id == id)
        },
        videos: () => videos,
        user: (_, { id }) => users.find(users => user.id == id),
        users: () => users,
    },
    // Résolveur de l'objet vidéo
    Video: {
        id: video => video.id,
        title: video => video.title,
        // On récupère l'objet utilisateur qui correspond à l'id
        owner: video => users.find(user => user.id == video.owner_id)
    },
    // Résolveur de l'objet utilisateur
    User: {
        id: user => user.id,
        name: user => user.name,
        // On filtre les objets vidéos en ne gardant que celles qui ont le propriétaire spécifique
        videos: user => videos.filter(video => video.owner_id == user.id)
    },
    // Définitions des mutations
    Mutation: {
        createVideo: (_, { title, ownerId }) => {
            // Récupération du prochain ID à utiliser
            let maxId = videos.reduce((maxId, video) => {
                if (maxId < video.id) {
                    maxId = video.id;
                }

                return maxId;
            }, 0);

            // Construction de l'objet vidéo et ajout au catalogue
            const video = {
                id: maxId + 1,
                title,
                owner_id: ownerId
            };
            videos.push(video)

            // On termine par retourner l'objet vidéo créé
            return video;
        }
    }
}
