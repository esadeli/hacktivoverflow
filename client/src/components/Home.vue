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
               <div v-if="token !== null && token !== ''">
                 <Chat></Chat>
               </div>
               <div v-if="token === null || token === ''">
                  <p>Chat session will be available after you register / login</p>
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
  },
  computed: {
    token () {
      return this.$store.state.token
    }
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
