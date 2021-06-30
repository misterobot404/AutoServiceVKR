<template>
    <div>
        <v-card-text class="pt-2 px-6 pb-0">
            <v-form v-model="valid">
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="name"
                                      @input="inputName"
                                      :error-messages="nameError"
                                      :loading="nameLoading"
                                      :rules="rules.name"
                                      label="Телефон"
                                      autocomplete="name"
                                      prepend-icon="mdi-phone"
                                      hint="Этот телефон будет использоваться для связи с Вами."
                                      required/>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="email"
                                      @input="inputEmail"
                                      :error-messages="emailError"
                                      :loading="emailLoading"
                                      :rules="rules.email"
                                      label="Эл. почта"
                                      autocomplete="email"
                                      prepend-icon="mdi-mail"
                                      hint="Вам нужно будет подтвердить, что этот адрес электронной почты принадлежит вам."
                                      required/>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="password"
                                      label="Пароль"
                                      :type="passwordShow ? 'text' : 'password'"
                                      :append-icon="passwordShow ? 'mdi-eye-off' : 'mdi-eye'"
                                      @click:append="passwordShow = !passwordShow"
                                      autocomplete="new-password"
                                      prepend-icon="mdi-lock"
                                      :rules="rules.password"
                                      hint="Пароль должен содержать не менее 6 символов."
                                      required/>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="passwordConfirm"
                                      label="Подтвердите пароль"
                                      :type="passwordConfirmShow ? 'text' : 'password'"
                                      :append-icon="passwordConfirmShow ? 'mdi-eye-off' : 'mdi-eye'"
                                      @click:append="passwordConfirmShow = !passwordConfirmShow"
                                      prepend-icon="mdi-lock"
                                      :rules="rules.passwordConfirm"
                                      required/>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
        <v-card-actions class="px-6 pb-6 justify-center">
            <v-btn color="primary"
                   outlined
                   class="px-5"
                   :loading="registrationProcess"
                   :disabled="!valid || !filled || nameLoading || nameInputSuccessful || emailLoading || emailInputSuccessful"
                   @click="registration()">Зарегистироваться
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script>
import debounce from "lodash/debounce"
import axios from "axios"

export default {
    name: "Registration",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",

            valid: false,
            nameInputSuccessful: false,
            nameLoading: false,
            nameError: "",
            emailInputSuccessful: false,
            emailLoading: false,
            emailError: "",
            passwordShow: false,
            passwordConfirmShow: false,
            registrationProcess: false,

            rules: {
                name: [
                    v => !v || RegExp('^[+0-9]+( [+0-9]+)*$').test(v) || 'Телефон пользователя должен содержать только цифры.',
                    v => !v || v.length >= 10 && v.length <= 20 || 'Телефон пользователя должно содержать от 10 до 12 символов.',
                    // workaround for delayed asynchronous data validation
                    v => {
                        this.nameError = '';
                        if (v && RegExp('^[+0-9]+( [+0-9]+)*$').test(v) && v.length >= 10 && v.length <= 12) this.nameInputSuccessful = true;
                        return true
                    }
                ],
                email: [
                    v => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return !v || pattern.test(v) || 'Введите корректный адрес электронной почты..'
                    },
                    // workaround for delayed asynchronous data validation
                    v => {
                        this.emailError = '';
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (v && pattern.test(v)) this.emailInputSuccessful = true;
                        return true
                    }
                ],
                password: [v => !v || v.length >= 6 || 'Пароль должен содержать от 6 символов.'],
                passwordConfirm: [v => !v || v === this.password || 'Пароли не совпадают. Повторите попытку.']
            }
        }
    },
    computed: {
        filled() { return this.name.length !== 0 && this.email.length !== 0 && this.password.length !== 0 && this.passwordConfirm.length !== 0 }
    },
    methods: {
        registration() {
            const payload = {
                name: this.name,
                email: this.email,
                password: this.password
            };

            this.registrationProcess = true;
            this.$store.dispatch('auth/register', {
                name: payload.name,
                email: payload.email,
                password: payload.password
            })
                .then(() => {
                    this.$store.dispatch('auth/login', {
                        email: payload.email,
                        password: payload.password
                    })
                        .then(() => this.$emit('done'))
                        .finally(() => this.registrationProcess = false)
                })
                .catch(() => this.registrationProcess = false)
        },

        // waiting for user input to finish
        inputName: debounce(function (v) {
            // if the input was successful this.nameLoading will be TRUE
            if (this.nameInputSuccessful) {
                this.nameLoading = true;

                // Checking name for repetition via api
                axios.get('/api/users/' + v + '/check-available')
                    .catch(() => {
                        if (v === this.name)
                            this.nameError = 'Это имя пользователя недоступно.';
                    })
                    .finally(() => {
                        this.nameLoading = false;
                    });

                this.nameInputSuccessful = false;
            }
        }, 400),
        inputEmail: debounce(function (v) {
            // if the input was successful this.nameLoading will be TRUE
            if (this.emailInputSuccessful) {
                this.emailLoading = true;

                // Checking name for repetition via api
                axios.get('/api/users/' + v + '/check-available')
                    .catch(() => {
                        if (v === this.email)
                            this.emailError = 'Эта почта уже используется.';
                    })
                    .finally(() => {
                        this.emailLoading = false;
                    });

                this.emailInputSuccessful = false;
            }
        }, 400) // time to last input
    }
}
</script>
