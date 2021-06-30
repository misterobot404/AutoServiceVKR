<template>
  <v-app>
    <v-main class="app">
      <div style="padding: 48px 48px 24px; max-width: 1440px;" class="mx-auto">
        <div class="d-flex align-center justify-space-between">
          <router-link to="/" class="d-flex">
            <img width="64" height="64" src="/favicon.png">
            <img height="43" src="/assets/title.png" class="my-auto ml-2">
          </router-link>
          <div class="d-flex align-center">
            <router-link to="/record" class="custom-link">
              Запись
            </router-link>
            <div @click="goToExamples" class="custom-link">
              Акции
            </div>
            <div @click="$router.push('/').finally(() => $vuetify.goTo(pageHeight))" class="custom-link">
              О компании
            </div>
          </div>
          <v-btn @click="isAuth ? $router.push('/account') : SHOW_AUTH_DIALOG()" x-large icon class="ml-8" style="margin-top: 12px;">
            <v-icon large >
              mdi-account-box-outline
            </v-icon>
          </v-btn>
        </div>
      </div>
      <v-container style="max-width: 1440px" class="mx-auto">
        <router-view/>
      </v-container>
      <!-- О нас   -->
      <footer v-if="$route.name ==='Home' || $route.name ==='Record'" class="page-footer mt-12">
        <div style="width: 1440px; padding: 74px 0 0;">
          <div class="d-flex justify-space-between">
            <div class="text-left">
              <h3>Автосервис «Всё для Авто»</h3>
              <div class="mt-12">
                <h4>info@allforauto.ru</h4>
                <p>
                  Служба контроля качества: <br/>
                  8 800 757-53-56
                </p>
              </div>
            </div>
            <div class="text-left">
              <span class="page-footer-header">Услуги СТО</span>
              <div class="mt-12">
                <p>
                  Диагностика
                </p>
                <p>
                  Автосервис
                </p>
                <p>
                  Кузовной ремонт
                </p>
                <p>
                  Шиномонтаж
                </p>
              </div>
            </div>
            <div class="text-left">
              <span class="page-footer-header">Адреса станций</span>
              <div class="mt-12">
                <p>
                  Ленина, 14<br>
                  +7 (4217) 55-11-12<br>
                  9:00-19:00<br>
                </p>
                <p>
                  Мира, 44<br>
                  +7 (4217) 55-17-12<br>
                  9:00-19:00<br>
                </p>
              </div>
            </div>
            <div class="text-left">
              <div style="font-weight: bold;font-size: 16px;line-height: 24px;color: #90979C; max-width: 220px">В наших автосервисах доступна оплата по картам</div>
              <div class="d-flex mt-6">
                <v-img src="assets/visa.png" class="mr-2"></v-img>
                <v-img src="assets/mir.png" class="mr-2"></v-img>
                <v-img src="assets/mastercard.png" class="mr-2"></v-img>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column align-baseline" style="max-width: 1000px">
            <div class="mb-4">© 2021 Автосервис «Всё для Авто»</div>
            <p class="text-left">Все цены, указанные на сайте приведены как справочная информация и не являются публичной офертой, определяемой положениями статьи 437 Гражданского кодекса Российской Федерации и могут быть изменены в любое время без предупреждения.</p>
          </div>
        </div>
      </footer>
      <!-- Feedback -->
      <v-fab-transition>
        <v-btn
            @click="SHOW_FEEDBACK_DIALOG"
            fab
            dark
            large
            fixed
            bottom
            right
            color="primary"
            style="bottom: 34px; right: 34px"
        >
          <v-icon>mdi-help-circle-outline</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-fab-transition>
        <Feedback v-if="feedbackDialog"/>
      </v-fab-transition>
      <!-- Auth dialog -->
      <AuthDialog v-if="authDialog"/>
    </v-main>
  </v-app>
</template>

<script>
import Feedback from "./components/Feedback";
import AuthDialog from "./components/Auth"
import {mapState, mapMutations,mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    Feedback,
    AuthDialog
  },
  computed: {
    ...mapState('layout',["feedbackDialog", 'authDialog']),
      ...mapGetters('auth',["isAuth"]),
    pageHeight () {
      return document.body.scrollHeight
    }
  },
  methods: {
    ...mapMutations('layout',["SHOW_FEEDBACK_DIALOG","SHOW_AUTH_DIALOG"]),
    async goToExamples() {
      if (this.$route.path === "/") {
        let slide = document.getElementById("bonus");
        let top = window.scrollY + slide.getBoundingClientRect().y;
        await this.$vuetify.goTo(top - 160);
      } else {
        await this.$router.push("/").then(() => {
          let slide = document.getElementById("bonus");
          // Определение расстояния от начала страницы до нужного элемента
          let top = window.scrollY + slide.getBoundingClientRect().y;
          this.$vuetify.goTo(top - 160);
        });
      }
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Circe Regular';
  src: url('assets/Circe-Regular.ttf');
}

.app {
  font-family: 'Circe Regular', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.custom-link {
  cursor: pointer;
  text-decoration: none;
  letter-spacing: .03em;
  text-transform: uppercase;
  color: #172126 !important;
  white-space: pre;
  padding-top: 12px;
  font-weight: 600;
  margin-left: 60px;
}

.page-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 0 48px 100px;
  background: #172126;
  color: #fff;
  width: 100vw;
  overflow: hidden;
}

.page-footer-header {
  font-weight: bold;font-size: 16px;line-height: 24px;color: #90979C;
}

</style>
