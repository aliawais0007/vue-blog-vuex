import { createStore } from "vuex";

export const store = createStore({
    status() {
        return {
            posts: [],
            filteredPosts: [],
            totalPages: 0,
            page: 1,
            currPost: {}
        }
    },
    mutations: {
        addPosts: function (state, payload) {
            state.posts = payload;
            state.filteredPosts = payload.slice(0, 10);
            state.totalPages = payload.length / 10;
        },
        paginatedPosts: function (state, payload) {
            let endIndex = payload * 10;
            let startIndex = endIndex - 10;
            state.filteredPosts = state.posts.slice(startIndex, endIndex);
        },
        postById: function (state, payload) {
            state.currPost = payload;
        }
    }
})