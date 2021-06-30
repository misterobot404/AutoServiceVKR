<template>
    <div>
        <!-- Loading -->
        <v-overlay :value="loading">
            <div class="d-flex flex-column align-center text-center">
                <v-progress-circular
                    indeterminate
                    :size="128"
                />
            </div>
        </v-overlay>
        <template v-if="!loading">
            <div class="d-flex px-12 mt-4">
                <div class="d-flex flex-column">
                    <v-img src="assets/user.png" max-width="300px" max-height="300px"></v-img>
                    <h1>Пользователь</h1>
                    <h3 class="mt-2">{{user.name}}</h3>
                    <h3>{{user.email}}</h3>
                    <v-btn @click="logout()" class="mt-2" text color="primary">Выйти</v-btn>
                </div>
                <div class="d-flex flex-wrap pl-12 align-baseline">
                    <div
                        v-for="(el,index) in records"
                        :key="index"
                        class="ma-4 pa-3"
                        style="border: 1px solid #a9a8a8; border-radius: 30px;padding: 20px 0;"
                    >
                        <h2 class="mb-4">Данные о заявке</h2>
                        <div class="my-1">Выбранный бренд автомобиля: {{ el.brand }}</div>
                        <div class="my-1">Выбранная модель автомобиля: {{ el.model }}</div>
                        <div class="my-1 text-wrap" style="max-width: 420px">Выбранные услуги: {{ el.services }}</div>
                        <div class="my-1">Выбранный автосервис: {{ el.location }}</div>
                        <div class="my-1">Выбранная дата и время: {{ el.date }} {{ el.time }}</div>
                        <h2 class="primary--text text-uppercase mt-4">Ожидание</h2>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import axios from "axios";
import {mapState, mapMutations} from "vuex";

export default {
    name: "Services",
    data() {
        return {
            loading: true,
            records: []
        }
    },
    methods: {
        ...mapMutations('auth',["LOGOUT"]),
        logout() {
            this.LOGOUT();
            this.$router.push("/");
        }
    },
    computed: {
        ...mapState('auth',['user'])
    },
    beforeMount() {
        axios.get('/api/records')
            .then(response => this.records =  response.data.data.records)
            .finally(() => this.loading = false)
    }
}
</script>

<style scoped>

</style>
