<template>
  <div class="home">
    <div class="row">
      <div class="col-6 col-md-4 d-flex justify-content-around mt-5" v-for="(room, index) in rooms" :key="index">
        <RoomCard :room="room" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState} from 'vuex'
import RoomCard from "@/components/RoomCard";

export default {
  name: "home",
  components: {
    RoomCard
  },
  created() {
    this.getRooms();
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
