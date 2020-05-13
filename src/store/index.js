import Vuex from "vuex";
import { getPost,getAuthor } from "@/service/search";

Vue.use(Vuex);

let store = {
    state: {
        type : 'post',
        q : '',
        post : {},
        author: {}
    },
    mutations: {
        changeQuery : function (state,payload){
            state.q = payload
        },
        changeType : function (state,payload){
            state.type = payload
        },
        search : function (state,payload){

            let q = payload && payload.q || state.q
            let type = payload && payload.type || state.type
            let page = payload && payload.page || 1

            console.log(q)
            
            switch(type){
                case 'post' : 
                    return getPost(q,page).then((res) => {
                        state.post = res.data.data
                    })
                case 'author' : 
                    return getAuthor(q,page).then((res) => {
                        state.author = res.data.data
                    })
                default:
                    
            }
        }
    },
    getters: {
    },
    actions: {},
    modules: {}
};

export default new Vuex.Store(store);
