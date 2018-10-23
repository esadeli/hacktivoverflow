<template>
    <div>
        <nav id="sidebarCustom">
            <br>
            <br>
            <br>
            <br>
            <div class="sidebar-header"
              v-if= "token !== null & token !== '' ">
              <p>Welcome {{ userbasicinfo.name }}</p>
              <router-link :to="{name: 'Addtopic'}">
                <button type="button" class="btn btn-success">
                  Add Topic</button>
              </router-link>
             <br>
            <br>
            </div>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" v-model= "keyword" type="text" placeholder="Search" aria-label="Search">
            </form>
            <br>
            <button class="btn btn-outline-success my-2 my-sm-0" type="button" v-on:click="searchtopics()" >Search</button>
            <br>
            <br>
            <ul class="list-unstyled components">
                <p style="color: red">List of Topics</p>
                <hr>
                <ul class="list-unstyled" id="homeSubmenu">
                    <li v-for="(topic, index) in listoftopics" :key="index">
                     <router-link :to="{ name: 'id', params: { id: topic._id }}">{{ topic.title }}</router-link>
                    </li>
                </ul>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    searchtopics () {
      this.$store.dispatch('searchtopic', this.keyword)
      this.keyword = ''
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    },
    userbasicinfo () {
      return this.$store.state.userbasicinfo
    },
    listoftopics () {
      return this.$store.state.listoftopics
    }
  }
}
</script>

<style>
#sidebarCustom {
   margin-left: 10px;
}
</style>
