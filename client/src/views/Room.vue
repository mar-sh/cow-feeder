<template>
  <div id="contsemua" class="container max-width:50vh; min-height:100vh">
    <button v-if="!twoPlayer" @click="join" type="button" class="btn btn-dark" id="btn1">JOIN</button>
    <button v-if="twoPlayer" @click="play" type="button" class="btn btn-dark" id="btn1">MAIN</button>
    <br>
    {{sekon}}
    <div id="SAPI_KIRI" class="d-flex d-flex justify-content-center flex-row bd-highlight mb-3">
      <div class="p-2 bd-highlight">
        <div class="ml-10 p-2 flex-fill bd-highlight justify-content-end">
          <img id="sapi1" style="max-width:150px; max-height:150px " src="../../assets/cow2.png">
          <br>
          <button @click="inc1" type="button" class="btn btn-dark" id="btn1">MAKAN</button>
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
        <div
          v-if="mayStartNow"
          id="SAPI_KANAN"
          class="p-2 flex-fill bd-highlight justify-content-start"
        >
          <img id="sapi2" style="max-width:150px; max-height:150px " src="../../assets/cow2.png">
          <br>
          <button @click="inc2" type="button" class="btn btn-dark" id="btn2">MAKAN</button>
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
export default {
  data() {
    return {
      sekon: 30,
      pemain: [],
      twoPlayer: false,
      mayStartNow: false,
      total_makanan_kanan: 100,
      total_makanan_kiri: 100,
      peternak_kiri_click: 0,
      peternak_kanan_click: 0
    };
  },
  methods: {
    play() {
        this.startInterval();
    },
    join() {
      this.pemain.push("player2");
    },
    inc1() {
      this.total_makanan_kiri -= 1;
      this.peternak_kiri_click += 1;
    },
    inc2() {
      this.total_makanan_kanan -= 1;
      this.peternak_kanan_click += 1;
    },
    startInterval: function() {
      setInterval(() => {
        if (this.sekon == 0) {
          clearInterval(this.startInterval);
        } else {
          this.sekon = this.sekon - 1;
        }
      }, 1000);
    },
    gameEnd() {
      console.log("waktu habis~~");
    }
  },
  created() {
    this.pemain.push("peternak1");
    console.log(this.pemain, 'apa???');
    
  },
  watch: {
    pemain: function() {
      if (this.pemain.length == 2) {
        this.twoPlayer = true;
        this.mayStartNow = true
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
