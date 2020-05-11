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
        search : function (state,page){
            
            switch(state.type){
                case 'post' : 
                    return getPost(state.q,page).then((res) => {
                        state.post = res.data.data
                    })
                case 'author' : 
                    return getAuthor(state.q,page).then((res) => {
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
