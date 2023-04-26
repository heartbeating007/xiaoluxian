<template>
  <Header />
  <NavSwiper />
  <AsyncNewGoodCourse />
  <Foot />
</template>

<script>
import Header from '../components/Header.vue';
import NavSwiper from '../components/Home/NavSwiper.vue';
import Foot from '../components/Foot.vue';
import { defineAsyncComponent } from 'vue';

const AsyncNewGoodCourse = defineAsyncComponent(() =>
  import('../components/Home/NewGoodCourse.vue')
);
export default {
  components: {
    Header,
    NavSwiper,
    AsyncNewGoodCourse,
    Foot
  }
};
</script>

<style></style>
