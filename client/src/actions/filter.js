import ENV from '../config.js'
const API_HOST = ENV.api_host

export const filter = async (projectKind, projectLoc) => {
    const url = `${API_HOST}/api/posts/${projectKind}/${projectLoc}`;

    return fetch(url)
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }
    })
    .catch(error => {
        console.log(error);
    });
};