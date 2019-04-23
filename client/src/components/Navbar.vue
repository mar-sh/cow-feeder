<template>
  <div class="navbar-container">
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <div class="navbar-header">
          <router-link to="/">
            <img style="max-width:50px; max-height:50px;" src="https://img.icons8.com/plasticine/100/000000/cow.png"> FTC
          </router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav navbar-nav ml-auto">
            <li class="nav-item" v-if="!$store.state.isLogin">
              <router-link to="/member-area">
                <a class="nav-link">Login</a>
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-toggle="modal" v-if="$store.state.isLogin" data-target="#roomModal">Create a room</a>
            </li>
            <li class="nav-item" v-if="$store.state.isLogin">
              <a class="nav-link" @click.prevent="onClickLogout">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="roomModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create a new Room</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Room Name:</label>
            <input type="text" v-model=roomName class="form-control" id="recipient-name">
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Enter Pin:</label>
            <input type="number" v-model=roomPin class="form-control" id="recipient-name">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success" data-dismiss="modal" @click.prevent="createRoom">Start a room</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import { mapMutations, mapActions} from 'vuex'
import db from '@/firebase/firebase'

export default {
  name: "MainNavbar",
  data() {
    return {
      roomName: '',
      roomPin: ''
    }
  },
  computed: {
    isLogin(state) {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    ...mapMutations([
      'addActiveRooms'
    ]),
    ...mapActions([
      'userLogout'
    ]),
    onClickLogout() {
      this.userLogout()
    },
    createRoom() {
      const dbRef = db.collection('Rooms')

      dbRef.add({
        name: this.roomName,
        pin: this.roomPin,
        status: false,
        players: [localStorage.getItem('user')],
        leftPlayerClick: 0,
        rightPlayerClick: 0,
        sekon : 30,
        startTimer : false,
        pengeklikbutton : [],
        tampilin : true,
        owner: localStorage.getItem('user')
      })
        .then((doc) => {
          this.roomName = '';
          this.roomPin = '';
          this.addActiveRooms(doc.id);
          this.$router.push({name: 'room', params: {roomID: doc.id}});
        })
        .catch((err) => {
          console.log(err)
        })

    }
  }
};
</script>

<style scoped>
.navbar-container {
  max-width: 100%;
}

img {
  width: 130px;
}

a:active {
  border: none;
}

input[type='number'] {
    -moz-appearance:textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>