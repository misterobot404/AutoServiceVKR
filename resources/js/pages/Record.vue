<template>
    <div>
        <v-dialog
            :value="wasSend"
            transition="dialog-bottom-transition"
            max-width="400"
        >
            <template v-slot:default="dialog">
                <v-card class="pa-2">
                    <v-card-text style="margin-top: 40px">
                        <h2>Вы записаны!</h2>
                    </v-card-text>
                    <v-card-actions class="justify-end ma-4">
                        <v-btn
                            color="primary"
                            @click="$router.push('/')"
                        >Далее</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <v-stepper v-model="step" class="mb-12">
            <v-stepper-header>
                <v-stepper-step
                    :complete="step > 1"
                    step="1"
                >
                    Выбрать автомобиль
                </v-stepper-step>
                <v-divider/>
                <v-stepper-step
                    :complete="step > 2"
                    step="2"
                >
                    Выбрать услуги
                </v-stepper-step>
                <v-divider/>
                <v-stepper-step :complete="step > 3" step="3">
                    Выбор автосервиса
                </v-stepper-step>
                <v-divider/>
                <v-stepper-step step="4">
                    Подтверждение
                </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items class="pa-6">
                <v-stepper-content step="1" class="mx-auto" style="width: 600px">
                    <div>
                        <v-select
                            :items="cars"
                            v-model="selectedCar"
                            item-text="brand"
                            item-value="brand"
                            label="Марка"
                            return-object
                            prepend-icon="mdi-tow-truck"
                            class="mt-4"
                            outlined
                        ></v-select>
                        <v-select
                            :disabled="!selectedCar"
                            :items="selectedCar ? selectedCar.models : []"
                            v-model="selectedCarModel"
                            label="Модель"
                            outlined
                        ></v-select>
                    </div>
                    <v-btn
                        class="mr-2"
                        color="primary"
                        @click="step = 2"
                        :disabled="!selectedCar || !selectedCarModel"
                    >
                        Продолжить
                    </v-btn>
                </v-stepper-content>
                <v-stepper-content step="2" class="mx-auto" style="width: 800px">
                    <v-expansion-panels
                        popout
                        multiple
                        class="mb-8"
                    >
                        <v-expansion-panel v-for="(services_el, index) in services_list" :key="index" style="border: 1px solid #c1c0c0;" class="mb-2">
                            <v-expansion-panel-header>{{ services_el.category }}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <div class="d-flex justify-space-between my-1" v-for="(service, index) in services_el.services" :key="index">
                                    <v-checkbox
                                        v-model="selectedServices"
                                        :label="service.name"
                                        :value="service"
                                        hide-details
                                        class="my-auto"
                                    />
                                    <p class="my-auto grey--text">≈ {{ service.price }} ₽</p>
                                </div>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <v-btn @click="step--" text>
                        Назад
                    </v-btn>
                    <v-btn
                        :disabled="!selectedServices.length"
                        class="ml-2"
                        color="primary"
                        @click="step = 3"
                    >
                        Продолжить
                    </v-btn>
                </v-stepper-content>
                <v-stepper-content step="3" class="mx-auto" style="width: 1000px">
                    <div class="mx-auto text-left">
                        <h2>Выберите станцию</h2>
                        <v-select
                            :items="locations"
                            v-model="selectedLocation"
                            label="Выберите станцию"
                            prepend-icon="mdi-map-marker"
                            class="mt-4"
                            outlined
                        ></v-select>
                    </div>
                    <div class="d-flex text-left ">
                        <div>
                            <h2>Укажите дату</h2>
                            <v-date-picker class="mt-4" :min="nowDate" v-model="selectedDate" full-width/>
                        </div>
                        <div style="min-width: 290px; margin-left: 60px">
                            <h2>Укажите время</h2>
                            <v-time-picker
                                format="24hr"
                                min="09:00"
                                max="19:00"
                                v-model="selectedTime"
                                full-width
                                no-title
                                class="mt-10"
                            />
                        </div>
                    </div>
                    <v-btn @click="step--" text>
                        Назад
                    </v-btn>
                    <v-btn
                        :disabled="!selectedTime || !selectedDate || !selectedLocation"
                        class="ml-2"
                        color="primary"
                        @click="step++"
                    >
                        Продолжить
                    </v-btn>
                </v-stepper-content>
                <v-stepper-content step="4" class="mx-auto" style="width: 600px">
                    <div class="mx-auto" style="border: 1px solid #a9a8a8; border-radius: 30px;padding: 20px 0;">
                        <h2 class="mb-4">Данные о заявке</h2>
                        <div class="my-1">Выбранный бренд автомобиля: {{ selectedCar ? selectedCar.brand : "" }}</div>
                        <div class="my-1">Выбранная модель автомобиля: {{ selectedCarModel }}</div>
                        <div class="my-1">Выбранные услуги:</div>
                        <div
                            v-for="(service,index) in selectedServices"
                            class="text-decoration-underline"
                            :key="index"
                        >
                            {{ service.name }} - {{ service.price }} ₽
                        </div>
                        <div class="my-1">Выбранный автосервис: {{ selectedLocation }}</div>
                        <div class="my-1">Выбранная дата и время: {{ selectedDate }} {{ selectedTime }}</div>
                    </div>
                    <div v-if="!isAuth" class="mt-8 mx-auto">
                        <v-text-field outlined hide-details label="Телефон для связи" rounded/>
                        <p class="mt-2 font-weight-bold" style="color: #8b9090">*Для отслеживания состояния ТО зарегистрируйтесь в системе</p>
                    </div>
                    <h4 class="mt-8 bold mx-auto">Ориентировочная цена: <span>≈ {{ servicePrice }} ₽</span></h4>
                    <v-btn class="mt-4" @click="step--" text>
                        Назад
                    </v-btn>
                    <v-btn
                        :loading="loading"
                        class="mt-4"
                        color="primary"
                        @click="done()"
                    >
                        Подтвердить
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
    name: "Record",
    data() {
        return {
            nowDate: new Date().toISOString().slice(0, 10),
            step: 1,
            records: [
                {
                    data: "25 июня",
                    time: [
                        {time: "11:00", status: false},
                        {time: "12:00", status: false},
                        {time: "13:00", status: false},
                        {time: "14:00", status: false},
                    ]
                },
                {
                    data: "26 июня",
                    time: [
                        {time: "11:00", status: false},
                        {time: "12:00", status: false},
                        {time: "13:00", status: false},
                        {time: "14:00", status: false},
                    ]
                },
                {
                    data: "27 июня",
                    time: [
                        {time: "11:00", status: false},
                        {time: "12:00", status: false},
                        {time: "13:00", status: false},
                        {time: "14:00", status: false},
                    ]
                },
                {
                    data: "28 июня",
                    time: [
                        {time: "11:00", status: false},
                        {time: "12:00", status: false},
                        {time: "13:00", status: false},
                        {time: "14:00", status: false},
                    ]
                }
            ],
            cars: [
                {
                    brand: "Audi",
                    models: ["Audi A3", "Audi A4", "Audi A5", "Audi A6", "Audi A7", "Audi A8", "Audi Q3"]
                },
                {
                    brand: "Ford",
                    models: ['Mondeo', 'Focus', 'Focus Хэтчбек', 'Focus Универсал', 'Ford EcoSport', 'Ford Explorer', 'Ford Kuga', 'Ford Fiesta']
                },
                {
                    brand: "Honda",
                    models: ['Honda Accord']
                },
                {
                    brand: "Hyundai",
                    models: ['Hyundai Accent', 'Hyundai Coupe', 'Hyundai Creta', 'Hyundai Elantra']
                },
                {
                    brand: "Kia",
                    models: ['Kia Bongo', 'Kia Cadenza', 'Kia Carens', 'Kia Carnival', 'Kia Ceed']
                }
            ],
            services_list: [
                {
                    category: "Автосервис",
                    services: [
                        {
                            name: "Двигатель",
                            price: 5000,
                        },
                        {
                            name: "Жидкости",
                            price: 1500,
                        }, {
                            name: "Рулевая",
                            price: 3000,
                        },
                        {
                            name: "Кондиционер",
                            price: 1000,
                        },
                        {
                            name: "Тормоза",
                            price: 4000,
                        },
                        {
                            name: "Трансмиссия",
                            price: 7000,
                        },
                        {
                            name: "Сход-развал",
                            price: 6000,
                        },
                        {
                            name: "Ходовка",
                            price: 10000,
                        }
                    ]
                },
                {
                    category: "Диагностика",
                    services: [
                        {
                            name: "Диагностика двигателя",
                            price: 1000,
                        },
                        {
                            name: "Диагностика КПП",
                            price: 1500,
                        },
                        {
                            name: "Диагностика кузова",
                            price: 1000,
                        },
                        {
                            name: "Диагностика кондиционера",
                            price: 200,
                        },
                        {
                            name: "Диагностика тормозов",
                            price: 1000,
                        },
                        {
                            name: "Диагностика схода-развала",
                            price: 2000,
                        },
                        {
                            name: "Диагностика ходовки",
                            price: 1000,
                        }
                    ]
                },
                {
                    category: "Шиномонтаж",
                    services: [
                        {
                            name: "Шиномонтаж",
                            price: 1000,
                        },
                        {
                            name: "Нанесение герметика",
                            price: 500,
                        },
                        {
                            name: "Ремонт покрышек",
                            price: 800,
                        },
                        {
                            name: "Установка вентиля",
                            price: 500,
                        }
                    ]
                },
                {
                    category: "Восстановление АКПП",
                    services: [
                        {
                            name: "Продажа и установка восстановленных АКПП и вариаторов",
                            price: 5000,
                        }
                    ]
                },
                {
                    category: "Кузовной ремонт",
                    services: [
                        {
                            name: "Ремонт стекол",
                            price: 1000,
                        },
                        {
                            name: "Оценка стоимости по фотографии",
                            price: 500,
                        }
                    ]
                }
            ],
            locations: [
                "Ленина, 14",
                "Мира, 44"
            ],
            selectedCar: null,
            selectedCarModel: null,
            selectedServices: [],
            selectedLocation: null,
            selectedDate: null,
            selectedTime: null,
            loading: false,
            wasSend: false,
        }
    },
    computed: {
        ...mapGetters('auth', ['isAuth']),
        servicePrice() {
            let res = 0;
            this.selectedServices.forEach(el => res += el.price)
            return res;
        }
    },
    methods: {
        done() {
            if (this.isAuth) {
                let payload = {
                    brand: this.selectedCar.brand,
                    model: this.selectedCarModel,
                    services: (this.selectedServices.map(el => el.name)).join(),
                    location: this.selectedLocation,
                    date: this.selectedDate,
                    time: this.selectedTime,
                    price: this.servicePrice
                }
                this.loading = true;
                axios.post('/api/records', payload)
                    .then(() => this.$router.push("/account")
                        .finally(() => this.loading = false))
            } else {
                this.loading = true;
                setTimeout(() => {
                    this.wasSend = true;
                    this.loading = false;
                }, 600);
            }
        }
    }
}
</script>

<style scoped>

</style>
