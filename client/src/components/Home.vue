<template>
    <div>
        <div class="row marginTopCustom">
            <div class="col-md-2">
               <Sidebar></Sidebar>
            </div>
            <div class="col-md-7">
               <router-view></router-view>
            </div>
            <div class="col-md-3">
               <br>
               <br>
               <br>
               <br>
               <div>
                 <Chat></Chat>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Topic from '@/views/Topic.vue'
import Chat from '@/components/Chat.vue'
export default {
  name: 'Home',
  components: {
    Sidebar, Topic, Chat
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
