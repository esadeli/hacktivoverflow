<template>
    <div id="topicMarginCustom">
      <router-view></router-view>
    </div>
</template>

<script>
import Alltopics from '@/views/Alltopics.vue'
import Detailtopic from '@/views/Detailtopic.vue'
import Addtopic from '@/views/Addtopic.vue'
import Edittopic from '@/views/Edittopic.vue'
export default {
  name: 'Topic',
  components: {
    Alltopics, Detailtopic, Addtopic, Edittopic
  }
}
</script>

<style>
#topicMarginCustom{
   margin-top: 60px;
   margin-left: 80px;
}
</style>
