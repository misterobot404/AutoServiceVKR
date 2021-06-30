<template>
    <v-dialog
        :value="authDialog"
        max-width="460px"
        @input="v => v || HIDE_AUTH_DIALOG()"
    >
        <v-card class="app text-left">
            <v-toolbar height="88"
                       extended
                       flat
            >
                <v-container fill-height class="mt-4">
                    <v-spacer/>
                    <v-img
                        src="favicon.png"
                        contain
                        height="48"
                        width="48"
                        max-width="48"
                    />
                    <h2 class="ml-4">Автосервис «Всё для Авто»</h2>
                    <v-spacer/>
                </v-container>

                <template #extension>
                    <v-tabs
                        v-model="currentTabIndex"
                        fixed-tabs
                    >
                        <v-tab>Войти</v-tab>
                        <v-tab>Создать аккаунт</v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>
            <v-divider/>
            <v-expand-transition>
                <component v-bind:is="currentTabName" @done="done()"/>
            </v-expand-transition>
        </v-card>
    </v-dialog>
</template>

<script>
import Authorization from "./Authorization"
import Registration from "./Registration"
import {mapMutations, mapState} from 'vuex'

export default {
    name: "IndexAuth",
    components: {
        Authorization,
        Registration
    },
    data() {
        return {
            currentTabIndex: 0,
            dialog: false
        }
    },
    computed: {
        ...mapState('layout', [
            'authDialog'
        ]),
        currentTabName() {
            if (this.currentTabIndex === 0) return "Authorization"
            else return "Registration"
        }
    },
    methods: {
        ...mapMutations('layout', ["HIDE_AUTH_DIALOG"]),
        done() {
            this.$router.push('/account');
            this.HIDE_AUTH_DIALOG();
        }
    }
}
</script>
