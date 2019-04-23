<template>
  <div id="contsemua" class="container max-width:50vh; min-height:100vh">
    <button v-if="twoPlayer" @click="play" type="button" class="btn btn-dark" id="btn1">MAIN BARENG</button>

    <audio controls id="myVideo" autoplay loop hidden>
      <source
        src="http://66.90.93.122/ost/bokujou-monogatari-harvest-moon-original-soundtrack/jmayhoyd/01%20-%20title.mp3"
        type="audio/wav"
      >
    </audio>

    <br>
    <span v-if="twoPlayer">{{sekon}}</span>
    <div id="SAPI_KIRI" class="d-flex d-flex justify-content-center flex-row bd-highlight mb-3">
      <div class="p-2 bd-highlight">
        <div class="ml-10 p-2 flex-fill bd-highlight justify-content-end">
          <img id="sapi1" style="max-width:150px; max-height:150px " src="../../assets/cow2.png">
          <br>
          <button
            v-if="checkPlayer() == true"
            @click="inc1"
            type="button"
            class="btn btn-dark"
            id="btn1"
          >MAKAN</button>
          <br>
          {{peternak_kiri_click}}
          <div class="border mt-2" id="kotakjerami1">
            <div class="row">
              <div class="column" style="max-width:250.734px">
                <img
                  v-for="(i, index) in total_makanan_kiri"
                  :key="index"
                  style="max-width:30px; max-height:30px "
                  src="../../assets/wheat.png"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2 bd-highlight">
        <div v-if="status" id="SAPI_KANAN" class="p-2 flex-fill bd-highlight justify-content-start">
          <img id="sapi2" style="max-width:150px; max-height:150px " src="../../assets/cow2.png">
          <br>
          <button
            v-if="checkPlayer() == false"
            @click="inc2"
            type="button"
            class="btn btn-dark"
            id="btn2"
          >MAKAN</button>
          <br>
          {{peternak_kanan_click}}
          <div class="border mt-2" id="kotakjerami2">
            <div class="row">
              <div class="column" style="max-width:250.734px">
                <img
                  v-for="(i, index) in total_makanan_kanan"
                  :key="index"
                  style="max-width:30px; max-height:30px "
                  src="../../assets/wheat.png"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import db from "@/firebase/firebase.js";
import firebase from "firebase";

import { log } from "util";
import { functions } from "firebase";
export default {
  data() {
    return {
      startTimer: false,
      playbtn: false,
      sekon: 30,
      pemain: [],
      twoPlayer: false,
      mayStartNow: false,
      total_makanan_kanan: 100,
      total_makanan_kiri: 100,
      peternak_kiri_click: 0,
      peternak_kanan_click: 0,
      room: {},
      pengeklikbutton: [],
      status: ""
    };
  },
  created() {
    this.getRoom();
    var audio = new Audio({
      src:
        ".http://66.90.93.122/ost/bokujou-monogatari-harvest-moon-original-soundtrack/jmayhoyd/01%20-%20title.mp3",
      autoplay: true,
      loop: true
    });
    audio.play();
    // console.log(this.pemain, "players");
    this.setScores();
  },
  computed: {},
  methods: {
    checkPlayer() {
      if (this.status == true) {
        return localStorage.getItem("user") == this.pemain[0];
      }
    },
    isDisabled(input) {
      // console.log(input, "APA INPUTNYA COY???????????");
      return input;
    },
    getRoom() {
      const dbRef = db.collection("Rooms");
      dbRef.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          // console.log(this.$route);
          if (doc.id === this.$route.params.roomID) {
            this.room = Object.assign({ id: doc.id }, doc.data());
            this.status = doc.data().status;
            this.pemain = [...this.room.players];
            this.pengeklikbutton = [...doc.data().pengeklikbutton];
          }
          // console.log(this.sekon, "BERAPA DETIK YA");
        });
      });
    },
    play() {
      // console.log(" KE KLIK GK YA");
      this.playbtn = true;

      db.collection("Rooms")
        .doc(this.$route.params.roomID)
        .update({
          pengeklikbutton: firebase.firestore.FieldValue.arrayUnion(
            localStorage.getItem("user")
          )
        });

      // this.startTimer = true //start di db true
    },
    inc1() {
      this.total_makanan_kiri -= 1;
      this.peternak_kiri_click += 1;
    },
    inc2() {
      this.total_makanan_kanan -= 1;
      this.peternak_kanan_click += 1;
    },
    suaraSapi() {
    var audio = new Audio(`http://soundbible.com/mp3/Single Cow-SoundBible.com-2051754137.mp3`)
    audio.play()
    },
    setScores() {
      db.collection("Rooms").onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.id == this.$route.params.roomID) {
            this.peternak_kiri_click = doc.data().leftPlayerClick;
            this.peternak_kanan_click = doc.data().rightPlayerClick;
          }
        });
      });
    },
    startInterval: function() {
      setInterval(() => {
        if (this.sekon == 0) {
          clearInterval(this.startInterval);
          db.collection("Rooms")
            .doc(this.$route.params.roomID)
            .update({ sekon: this.sekon - 1 });
        } else {
          this.sekon -= 1;
          // console.log(this.sekon, "disini brp detiknya");
        }
      }, 1000);
    },
    gameEnd() {
      // console.log("waktu habis~~");
    }
  },
  watch: {
    pemain: function(v) {
      // console.log(v.length);
      if (v.length == 2) {
        this.twoPlayer = true;
        this.status = true;
      }
    },
    sekon: function(val) {
      if (val == 0) {
        if (this.peternak_kiri_click > this.peternak_kanan_click) {
          db.collection("Rooms")
              .doc(this.$route.params.roomID)
              .update({ tampilin: false })
          // console.log(this.pemain[0], "WINS!!!!");
          swal(`${this.pemain[0]} WINS!!!!`)
          .then(() => {
            this.suaraSapi()
          })
          .catch(err => {
            console.log(err);     
          })
        } else if (this.peternak_kiri_click < this.peternak_kanan_click) {
          db.collection("Rooms")
                .doc(this.$route.params.roomID)
                .update({ tampilin: false });

          swal(`${this.pemain[1]} WINS!!!!`)
          .then(() => {
            this.suaraSapi()

          })
            .catch(err => {
              console.log(err);   
            })
          }
          // console.log(this.pemain[1], "WINS!!!!");
          this.$router.push({name : 'home'})
        }
    },
    peternak_kiri_click: function(value) {
      // console.log("VALUE BERUBAH KIRI", value);

      db.collection("Rooms")
        .doc(this.$route.params.roomID)
        .update({ leftPlayerClick: value });
    },
    peternak_kanan_click: function(value) {
      // console.log("VALUE BERUBAH KANAN", value);

      db.collection("Rooms")
        .doc(this.$route.params.roomID)
        .update({ rightPlayerClick: value });
    },
    startTimer: function(val) {
      if (this.startTimer) {
        this.startInterval();
      }
    },
    pengeklikbutton: function(v) {
      if (v.length == 2) {
        this.startTimer = true;
        db.collection("Rooms")
          .doc(this.$route.params.roomID)
          .update({ startTimer: true });
      }
    }
  }
};
</script>

<style>
#contsemua {
  margin-top: 2%;
}
body {
  background: url("../../assets/bg2.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

/* #sapi1 #btn1 { */
/* position: relative; */
/* position: absolute;
  top: 250px;
  right: 800px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover; */
/* background-image: url('../../assets/cow2.png');
    background-size: contain;
    background-repeat: no-repeat;
    width: 90%;
    height: 90%;
    height: 0;
    padding-top: 66.64%;  */

/* } */

/* #sapi2 #btn2 { */
/* position: relative; */
/* position: absolute;
  top: 250px;
  right: 500px;
} */
</style>
