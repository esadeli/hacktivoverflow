<template>
    <div id="topicMarginCustom">
      <router-view></router-view>
    </div>
</template>

<script>
import Alltopics from '@/views/Alltopics.vue'
import Detailtopic from '@/views/Detailtopic.vue'
import Addtopic from '@/views/Addtopic.vue'
export default {
  name: 'Topic',
  components: {
    Alltopics, Detailtopic, Addtopic
  }
}
</script>

<style>
#topicMarginCustom{
   margin-top: 60px;
   margin-left: 80px;
}
</style>
