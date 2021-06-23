<template>
  <div style="height: 100vh; width: 100vw" class="d-flex flex-column">
    <!-- Header -->
    <div style="padding: 120px 0 100px">
      <div class="d-flex justify-center">
        <img width="64" height="64" src="/favicon.png">
        <h1 class="my-auto ml-2" style="font-size: 40px;">AdapTest</h1>
      </div>
      <h3 class="mt-4">Адаптивное тестирование - сервис помогающий быстро и удобно определить уровень подготовки</h3>
    </div>
    <v-subheader inset style="font-size: 16px">
      Категории →  Программирование
    </v-subheader>
    <v-divider/>
    <!--  Main  -->
    <v-container class="d-flex">
      <v-row justify="center" class="ma-auto" style="max-width: 1200px">
        <v-col
            v-for="(item, index) in items"
            :key="index"
            class="mt-6"
            cols="auto"
        >
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                  @click="$router.push('/test')"
                  height="120"
                  width="300"
                  :elevation="hover ? 8 : 4"
                  style="background-color: rgba(0, 120, 201, 0.5);"
              >
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                  <h5 class="text-uppercase">{{item.title}}</h5>
                </v-row>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Topics',
  data: () => ({
    items: [
      {
        title: 'ООП',
      },
      {
        title: '1С',
      },
      {
        title: 'С#',
      },
      {
        title: 'C++',
      },
      {
        title: 'Базы данных',
      },
      {
        title: 'PHP'
      }
    ],
  }),
}
</script>

<style scoped>

</style>
