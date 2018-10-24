<template>
   <div>
      <h1>Edit Topic</h1>
      <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Title</label>
            <input type="text" class="form-control"
             v-model="detailtopictitle"
             aria-describedby="emailHelp" placeholder="Enter Title">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Description</label>
            <textarea type="text" v-model="detailtopicdescription"
             class="form-control" aria-describedby="emailHelp"
             placeholder="Enter Description">
             </textarea>
        </div>
    </form>
    <button class="btn btn-success"
       v-on:click="edittopic()">Update</button>
   </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Edittopic',
  props: ['id'],
  data () {
    return {
      detailtopictitle: '',
      detailtopicdescription: '',
      url: 'https://hacktivoverflow23api.efratsadeli.tech/'
    }
  },
  methods: {
    edittopic () {
      let self = this
      axios({
        method: 'PUT',
        url: `${self.url}/topics/${self.id}`,
        headers: {
          token: self.token
        },
        data: {
          title: self.detailtopictitle,
          description: self.detailtopicdescription
        }
      })
        .then(topic => {
          this.$store.dispatch('listoftopics')
          this.$router.push({ path: `/topic/${self.id}` })
        })
        .catch(error => {
          console.log('ERROR update topic ', error)
        })
    },
    getdetail () {
      let self = this
      axios({
        method: 'GET',
        url: `${self.url}/topics/${self.id}`
      })
        .then(topic => {
          let detailtopic = topic.data.data
          self.detailtopictitle = detailtopic.title
          self.detailtopicdescription = detailtopic.description
        })
        .catch(error => {
          console.log('ERROR Get detail topic', error)
        })
    }
  },
  created () {
    this.getdetail()
  },
  watch: {
    id (val) {}
  },
  computed: {
    token () {
      return this.$store.state.token
    },
    userbasicinfo () {
      return this.$store.state.userbasicinfo
    }
  }
}
</script>

<style>

</style>
