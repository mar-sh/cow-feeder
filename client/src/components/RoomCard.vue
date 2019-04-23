<template>
  <div class="card my-3 py-3 px-1" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ owner }}</h6>
      <img
        class="card-img-top"
        src="data:image/png;base64,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"
        alt="Card image cap"
      >
      <div class="card-body">
        <p class="card-text"></p>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        :data-target="`#${id}`"
        data-whatever="Enter pin"
      >Enter Room</button>
    </div>

    <div
      :id="id"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="room-pin" class="col-form-label">Enter {{ owner }}'s Room Pin</label>
                <input type="text" v-model="pinlokal" class="form-control" id="room-pin">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click.prevent="enterRoom"
            >Join!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import db from "@/firebase/firebase";
import firebase from "firebase";

export default {
  name: "RoomCard",
  // props: {
  //   room: {
  //     type: Object
  //   },
  //   owner : {
  //     type : String
  //   },
  //    id : {
  //     type : String
  //   },
  //    name : {
  //     type : String
  //   },
  props: ["id", "name", "pin", "owner"],
  data() {
    return {
      pinlokal: ""
    };
  },
  created() {
    console.log(this.id, this.name, this.pin, this.owner, "???????");
  },
  methods: {
    enterRoom() {
      console.log('GUA MASU MASUK');
      const dbRef = db.collection("Rooms");

      dbRef.onSnapshot(querySnapshot => {
        const rooms = [];
        querySnapshot.forEach(doc => {
          if (doc.id == this.id) {
            if (this.pinlokal == this.pin) {
              dbRef
                .doc(this.id)
                .update({
                  players: firebase.firestore.FieldValue.arrayUnion(
                    localStorage.getItem("user")
                  ),
                  status: true
                });
              this.pinlokal = "";
              this.$router.push({ name: "room", params: { roomID: this.id } });
            }
          }
        });
      });

      //   const dbRef = db.collection('Rooms')
      //  if (this.pinlokal == this.pin) {
      //   //  const players = [localStorage.getItem('user'), ...room.players];
      //     dbRef.doc(this.id).update({
      //      players: firebase.firestore.FieldValue.arrayUnion(localStorage.getItem('user')),
      //      status : true
      //    });
      //    this.pinlokal = '';
      //    console.log('mau pindah ke link', this.id, '=======+++++++');

      //    this.$router.push({name: 'room', params:{roomID: this.id}});
      //  }
    }
  }
};
</script>

<style>
</style>
