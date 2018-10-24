<template>
   <div>
      <h1>Chat Session</h1>
      <div id="chatroom">
        <ul class="list-group" v-for="(chat,index) in allchats" :key="index">
          <li class="list-group-item">
              <div class="row">
                <div class="col-md-4">
                   <h6><span class="badge badge-secondary">{{ chat.name }}</span></h6>
                </div>
                <div class="col-md-8">
                    {{ chat.chat }}
                </div>
              </div>
          </li>
        </ul>
      </div>
      <br>
      <br>
      <hr>
      <input type="text" v-model="newchat" class="form-control" aria-describedby="emailHelp" placeholder="Enter chat here and press send">
      <br>
      <button type="button" class="btn btn-secondary" v-on:click="addchat()">Send</button>
   </div>
</template>

<script>
import db from '../../googlekey.js'
export default {
  name: 'Chat',
  data () {
    return {
      newchat: '',
      allchats: []
    }
  },
  methods: {
    addchat () {
      let self = this
      db.ref('/chat/').push({
        name: self.userbasicinfo.name,
        chat: self.newchat
      }, (error) => {
        if (!error) {
          self.newchat = ''

          // repopulate data
          db.ref('/chat').on('value', function (snapshot) {
            self.allchats = []
            snapshot.forEach(detailsnapshot => {
              self.allchats.push(detailsnapshot.val())
              console.log(detailsnapshot.val())
            })
          })
        } else {
          console.log('ERROR Add chat ', error)
        }
      })
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    },
    userbasicinfo () {
      return this.$store.state.userbasicinfo
    }
  },
  watch: {
    allchats (val) {}
  }
}
</script>

<style>
#chatroom {
  height:200px;
  overflow-y: scroll;
}
</style>
