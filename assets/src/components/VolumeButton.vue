<template>
  <button
      class="button--volume"
      title="Volume"
      @click="toggleVolume"
      v-if="!isMobile"
    >
      <volume-2-icon v-if="sound.isMuted"></volume-2-icon>
      <volume-x-icon v-if="!sound.isMuted"></volume-x-icon>
    </button>
</template>

<script>
import isMobile from '../helpers/is-mobile'
import {
  Volume2Icon,
  VolumeXIcon
} from "vue-feather-icons";

export default {
  name: 'VolumeButton',
  components : {
    Volume2Icon,
    VolumeXIcon
  },
  props : {
    sound : {
      type: Object,
      default : null
    }
  },
  data(){
    return {
      isMobile : false
    }
  },
  created() {
    this.isMobile = isMobile()
  },
  methods: {
    toggleVolume(){
      this.sound.isMuted = !this.sound.isMuted;
      this.$emit('volumeChanged', this.sound);
    }
  }
}
</script>