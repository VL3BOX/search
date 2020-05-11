const axios = require("axios");
const JX3BOX = require("@jx3box/jx3box-common/js/jx3box");

function getPost(title,page) {
    return axios.get(JX3BOX.__server + "post/list", {
        params: {
            title,
            page : page || 1
        },
    })
}

function getAuthor(name,page) {
    return axios.get(JX3BOX.__server + "user/list", {
        params: {
            name,
            page : page || 1
        },
    })
}

export { getPost, getAuthor };
