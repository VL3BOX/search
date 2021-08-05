import axios from "./axios";
import { __server, __helperUrl } from "@jx3box/jx3box-common/data/jx3box.json";
import { $cms } from "@jx3box/jx3box-common/js/https";

function getPost(title, page) {
    return $cms().get("/api/cms/posts", {
        params: {
            search:title,
            page: page || 1,
        },
    });
}

function getAuthor(name, page) {
    return $cms().get("/api/cms/user/list", {
        params: {
            name,
            page: page || 1,
        },
    });
}

function getNamespace(key) {
    return axios.get(__helperUrl + "api/namespace", {
        params: {
            key,
        },
    });
}

function getCj(keyword, page) {
    return axios.get(__helperUrl + "api/achievement/search", {
        headers: {
            Accept: "application/prs.helper.v2+json",
        },
        params: {
            keyword,
            page,
        },
    });
}

function getItem(keyword, page) {
    return axios.get(__helperUrl + "api/item/search", {
        headers: {
            Accept: "application/prs.helper.v2+json",
        },
        params: {
            keyword,
            page,
        },
    });
}

export { getPost, getAuthor, getCj, getItem, getNamespace };
