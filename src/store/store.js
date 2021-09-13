import { createStore } from "vuex";

export const store = createStore({
    status() {
        return {
            posts: [],
            filteredPosts: [],
            totalPages: 0,
            page: 1,
            currPost: {},
            isLoading: true,
            error: {}
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
        },
        handleError: function (state, payload) {
            state.error = payload
        }
    },
    actions: {
        addAsyncPosts: async function (context) {
            const handleResponse = async function (response) {
                if (response.status === 200) return await response.json();
                else {
                    if (response.status === 404) throw { "error": "API not found" }
                    else throw await response.json();
                }
            }

            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts", { method: "get" })
                const myData = await handleResponse(response);
                context.commit("addPosts", myData);
            }
            catch (error) {
                context.commit("handleError", error)
            }

        }
    }
})