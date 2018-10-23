<template>
    <div>
        <div class="row marginTopCustom">
            <div class="col-md-2">
               <Sidebar></Sidebar>
            </div>
            <div class="col-md-10">
               <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Topic from '@/views/Topic.vue'
export default {
  name: 'Home',
  components: {
    Sidebar, Topic
  }
}
</script>

<style>
#marginTopCustom {
  margin-top: 300px;
  margin-left: 60px;
  position: absolute;
}
</style>
