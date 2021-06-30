export default {
    namespaced: true,
    state: {
        feedbackDialog: false,
        // show auth dialog
        authDialog: false,
    },
    mutations: {
        SHOW_FEEDBACK_DIALOG(state) {
            state.feedbackDialog = true;
        },
        HIDE_FEEDBACK_DIALOG(state) {
            state.feedbackDialog = false;
        },

        SHOW_AUTH_DIALOG(state) {
            state.authDialog = true;
        },
        HIDE_AUTH_DIALOG(state) {
            state.authDialog = false;
        }
    }
}

