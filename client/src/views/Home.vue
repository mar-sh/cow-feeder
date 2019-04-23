<template>

  <div class="home" v-if="$store.state.isLogin" >
    <div class="row">
      <div class="col-6 col-md-4 d-flex justify-content-around mt-5" v-for="(room, index) in this.$store.state.rooms" :key="index">
        <RoomCard 
        :id="room.id"
        :name="room.name"
        :owner="room.owner"
        :pin="room.pin">
        </RoomCard>


      </div>
    </div>
    <div class="main-home" v-else>
      <div>
        <img src="http://bestanimations.com/Animals/Mammals/Bulls&Cows/funny-cute-cow-dancing-animation.gif#.XL6R6fmm8os.link" alt="">
        <img src="https://storage.googleapis.com/gcs-upload-demo/upload/dancing-pig.gif" alt="">
        <img src="http://bestanimations.com/Animals/Mammals/Bulls&Cows/funny-cute-cow-dancing-animation.gif#.XL6R6fmm8os.link" alt="">
      </div>
      <div class="game-title">
        <img src="https://i.imgur.com/7wZOKeJ.gif" alt="">
      </div>
      
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from 'vuex'
import RoomCard from "@/components/RoomCard";

export default {
  name: "home", 
  components: {
    RoomCard
  },
  mounted() {
    this.getRooms();
    console.log('APAAN YA');
    
  },
  methods: {
    ...mapActions([
      'getRooms'
    ])
  },
  computed: {
    ...mapState([
      'rooms',
    ])
  }
};
</script>

<style scoped>
.main-home {
  margin-top: 7%;
}

.game-title {
  margin-top: 7%;
}
</style>

