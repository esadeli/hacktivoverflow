<template>
    <div id="topicMarginCustom">
      <router-view></router-view>
    </div>
</template>

<script>
import Alltopics from '@/views/Alltopics.vue'
export default {
  name: 'Topic',
  components: {
    Alltopics
  }
}
</script>

<style>
#topicMarginCustom{
   margin-top: 60px;
   margin-left: 80px;
}
</style>
