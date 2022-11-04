<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Todo</div>
        <div class="text-subtitle1">{{dateNow}}</div>
      </div>
      <q-img
        src ="https://99px.ru/sstorage/53/2018/05/tmb_227350_626925.jpg"
        class = "header-image absolute-top"
      />

    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="200"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple to="/" exact>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                Todo
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/help" exact>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>
              <q-item-section>
                Help
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://i.ytimg.com/vi/TiE9pWAwYOs/maxresdefault.jpg" style="height: 192px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0K9uuQbhM5GF2dLWLiAgKzO51z5mNZOqdsQ&usqp=CAU">
            </q-avatar>
            <div class="text-weight-bold">Daniil Matyash</div>
            <div>@hv0rost</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { date } from 'quasar'

export default {
  name: 'MainLayout',

  computed: {
    dateNow () {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd DD MMMM ')
    }

  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>

<style lang="scss">
  .header-image{
    height : 100%;
    z-index: -1;
    opacity: 0.2;
    filter: grayscale(100%);
  }
</style>
