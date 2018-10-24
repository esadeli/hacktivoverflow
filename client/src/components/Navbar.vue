<template>
    <div>
       <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <button class="btn btn-secondary" v-on:click="gotohome()">Forum Basa Basi</button>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav mr-auto">
            </ul>
            <!--Temporarily change to token instead of jwttoken for testing normal case-->
            <div id="gSignInWrapper" v-if="token === null || token === '' " data-width="300" data-height="200" data-longtitle="true">
                        <button id="google-signin-button" class="customGPlusSignIn">
                            Google Sign In
                        </button>
                    </div>
            <div v-if="token === null || token === '' ">
               <button class="btn btn-info my-2 my-sm-0" data-toggle="modal" data-target="#loginModal" type="button">Login</button>
            </div>
            <div v-if="token === null || token === '' ">
               <button class="btn btn-info my-2 my-sm-0" data-toggle="modal" data-target="#registerModal" type="button">Register</button>
            </div>
            <div v-if="token !== null && token !== '' ">
               <button class="btn btn-info my-2 my-sm-0" v-on:click="logout()" type="button">Logout</button>
            </div>
        </div>
      </nav>

        <!--Modal Parts -->
        <!--Login Modal -->
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email/Username</label>
                        <input v-model="entrylogin" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter email or username">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Password</label>
                        <input v-model="entrypassword" type="password" class="form-control" aria-describedby="emailHelp" placeholder="Enter password">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="loginUser()">Login</button>
                </div>
                </div>
            </div>
        </div>

        <!--Register Modal -->
        <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input v-model="entryname" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter name">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input v-model="entryusername" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter username">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input v-model="entryemail" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Password</label>
                        <input v-model="entrypassword" type="password" class="form-control" aria-describedby="emailHelp" placeholder="Enter password">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="registerUser()">Register</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'Navbar',
  data () {
    return {
      entryname: '',
      entryemail: '',
      entryusername: '',
      entrylogin: '',
      entrypassword: '',
      jwttoken: ''
    }
  },
  mounted () {
    /**
     * client_id: '742869772361-8bsmdes62f97gruqqiomk0qvjrlsdmdn.apps.googleusercontent.com',
     * cookiepolicy: 'single_host_origin'
     */
    window.gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      const auth2 = window.gapi.auth2.init({
        client_id: '155964938197-i2mrsj5i99v48tb1pl8m3apik9en4eo4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
        // Request scopes in addition to 'profile' and 'email'
        // scope: 'additional_scope'
      })
      this.attachSignin(auth2, document.getElementById('google-signin-button'))
    })
  },
  methods: {
    attachSignin (auth2Instance, element) {
      let self = this
      auth2Instance.attachClickHandler(element, {},
        function (googleUser) {
          const profile = googleUser.getBasicProfile()
          /* eslint-disable-next-line */
          const id_token = googleUser.getAuthResponse().id_token;
          console.log('Name: ' + profile.getName())
          console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
          self.logingoogle(id_token)
          self.logoutgoogle()
        }, function (error) {
          alert(JSON.stringify(error, undefined, 2))
        })
    },
    gotohome () {
      this.$store.dispatch('listoftopics')
      this.$router.push({ name: 'home' })
    },
    loginUser () {
      let loginObj = {
        logininput: this.entrylogin,
        password: this.entrypassword
      }
      this.$store.dispatch('loginobj', loginObj)
      this.entrylogin = ''
      this.entrypassword = ''
      /* eslint-disable-next-line */
      $('#loginModal').modal('hide')
    },
    registerUser () {
      let registerObj = {
        name: this.entryname,
        email: this.entryemail,
        username: this.entryusername,
        password: this.entrypassword
      }
      this.$store.dispatch('registerobj', registerObj)
      this.entryname = ''
      this.entryusername = ''
      this.entryemail = ''
      this.entrypassword = ''
      /* eslint-disable-next-line */
      $('#registerModal').modal('hide')
    },
    logingoogle (input) {
      this.$store.dispatch('logingoogle', input)
    },
    logoutgoogle () {
      // immediately signout from google
      let auth2 = window.gapi.auth2.getAuthInstance()
      auth2.signOut().then(function () {
        console.log('User signed out.')
      })
    },
    logout () {
      this.jwttoken = ''
      localStorage.removeItem('token')
      this.$store.dispatch('logoutobj')
      this.$router.push({ name: 'home' })
    }
  },
  created () {
    if (localStorage.getItem('token') === null) {
      // do nothing
    } else if (localStorage.getItem('token') !== null) {
      this.jwttoken = localStorage.getItem('token')
    }
  },
  computed: {
    token () {
      // this.jwttoken = localStorage.getItem('token')
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
