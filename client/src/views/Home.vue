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
