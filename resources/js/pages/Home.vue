<template>
  <div class="d-flex flex-column">
    <!-- Банер -->
    <div class="banner">
      <div style="max-width: 650px;">
        <div style="font-size: 70px; font-weight: 600; line-height: 80px;color: #fff; text-align: left">Быстрая запись на удобное время в ближайшее СТО</div>
        <div style="display: flex;flex-direction: row;align-items: center;justify-content: flex-start;margin-top: 48px;">
          <v-btn to="/record" x-large class="rounded-lg" color="orange lighten-1">Записаться на СТО</v-btn>
          <v-btn @click="$router.push('/dev')" large text class="text-decoration-underline ml-2" style="color: #6a747a;">Отменить запись</v-btn>
        </div>
      </div>
    </div>
    <!-- Акции -->
    <h1 id="bonus" class="text-left custom-header" style="margin: 54px 0 12px 48px">Акции</h1>
    <v-row>
      <v-col cols="4">
        <router-link to="/dev" class="text-decoration-none">
          <v-card class="rounded-xl my-4">
            <v-img
                src="/assets/1.jpg"
                class="white--text pa-4"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="auto"
            >
              <v-card-title>
                <div class="d-flex flex-column align-baseline">
                  <span style="font-size:28px; line-height: 32px;max-width: 290px;"> Скидка 50% </span>
                  <span style="font-family: Roboto; font-size: 16px;line-height: 24px;margin-top: 8px;max-width: 290px;"> На любую диагностику автомобиля </span>
                </div>
              </v-card-title>
            </v-img>
          </v-card>
        </router-link>
        <router-link to="/dev" class="text-decoration-none">
          <v-card class="rounded-xl my-4">
            <v-img
                src="/assets/2.png"
                class="white--text pa-4"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="auto"
            >
              <v-card-title>
                <div class="d-flex flex-column align-baseline" style="text-align: left">
                  <span style="font-size:28px; line-height: 32px;max-width: 290px;"> Двойные бонусы </span>
                  <span style="font-family: Roboto; font-size: 16px;line-height: 24px;margin-top: 8px;max-width: 290px;"> за покупку запчастей ERA </span>
                </div>
              </v-card-title>
            </v-img>
          </v-card>
        </router-link>
      </v-col>
      <v-col cols="4" class="flex-grow-1">
        <router-link to="/dev" class="text-decoration-none">
          <v-card class="rounded-xl my-5">
            <v-img
                src="/assets/3.jpg"
                class="white--text pa-4"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="auto"
            >
              <v-card-title>
                <div class="d-flex flex-column align-baseline" style="text-align: left">
                  <span style="font-size:28px; line-height: 32px;max-width: 290px;"> Бесплатная диагностика кондиционера </span>
                </div>
              </v-card-title>
            </v-img>
          </v-card>
        </router-link>
      </v-col>
      <v-col cols="4">
        <router-link to="/dev" class="text-decoration-none">
          <v-card class="rounded-xl my-4">
            <v-img
                src="/assets/4.png"
                class="white--text pa-4"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="auto"
            >
              <v-card-title>
                <div class="d-flex flex-column align-baseline" style="text-align: left">
                  <span style="font-size:28px; line-height: 32px;max-width: 290px;"> Бесплатная замена </span>
                  <span style="font-family: Roboto; font-size: 16px;line-height: 24px;margin-top: 8px;max-width: 290px;"> Воздушных и/или салонных фильтров MANN-FILTER </span>
                </div>
              </v-card-title>
            </v-img>
          </v-card>
        </router-link>
        <router-link to="/dev" class="text-decoration-none">
          <v-card class="rounded-xl my-4">
            <v-img
                src="/assets/5.png"
                class="white--text pa-4"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="auto"
            >
              <v-card-title>
                <div class="d-flex flex-column align-baseline" style="text-align: left">
                  <span style="font-size:28px; line-height: 32px;max-width: 290px;"> Двойные бонусы </span>
                  <span style="font-family: Roboto; font-size: 16px;line-height: 24px;margin-top: 8px;max-width: 290px;"> за покупку запчастей Master Kit </span>
                </div>
              </v-card-title>
            </v-img>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
    <!-- Услуги -->
    <div style="margin: 54px 0 0 52px;" class="d-flex flex-column">
      <div style="text-align: left;">
        <h1 class="text-left custom-header">Услуги</h1>
      </div>
      <div class="d-flex" style="margin-top: 12px;">
        <div style="flex-basis: 320px; text-align: left" class="pt-2">
          <div style="font-size: 28px;line-height: 32px;color: #172126;">Мы даем гарантию 1 год на все услуги и запчасти!</div>
          <v-btn x-large class="rounded-lg mt-4" outlined color="orange lighten-1">Все услуги</v-btn>
        </div>
        <div class="flex-grow-1 d-flex flex-column ml-12">
          <div class="flex-grow-1 d-flex mb-6">
            <v-col cols="6" class="d-flex flex-column pa-0">
              <v-subheader>Раздел</v-subheader>
              <v-divider/>
            </v-col>
            <v-col cols="6" class="d-flex flex-column pa-0">
              <v-subheader>Услуги</v-subheader>
              <v-divider/>
            </v-col>
          </div>
          <div class="d-flex flex-grow-1 my-3" v-for="el in services" :key="el.title">
            <v-col cols="6" class="d-flex flex-column pa-0 text-left">
              <h1>{{ el.title }}</h1>
            </v-col>
            <v-col cols="6" class="d-flex flex-column pa-0 text-left">
              <p>{{ el.text }}</p>
            </v-col>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Topics',
  data() {
    return {
      services: [
        {title: "Автосервис", text: "Двигатель, жидкости, рулевая, кондиционер, тормоза, трансмиссия, сход-развал, ходовка"},
        {title: "Диагностика", text: "Диагностика двигателя, КПП, кузова, кондиционера, тормозов, схода-развала, ходовки"},
        {title: "Шиномонтаж", text: "Шиномонтаж, нанесение герметика, ремонт покрышек, установка вентиля и др."},
        {title: "Восстановление АКПП", text: "Продажа и установка восстановленных АКПП и вариаторов"},
        {title: "Кузовной ремонт", text: "Ремонт стекол, оценка стоимости по фотографии"},
        {title: "ОСАГО", text: "Гарантируем подлинность полиса и его наличие в базе РСА и страховых компаниях"},
      ]
    }
  }
}
</script>

<style scoped>
.custom-header {
  font-size: 36px;
  line-height: 36px;
  color: #172126;
}


.banner {
  position: relative;
  border-radius: 20px;
  background: url(/assets/top.png) no-repeat right center/auto 100%, #172126;
  box-sizing: border-box;
  padding: 144px 120px 128px;
  color: #fff;
}
</style>
