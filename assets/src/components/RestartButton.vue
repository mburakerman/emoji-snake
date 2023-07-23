<template>
  <button class="button--restart" @click="handleClick" title="Restart" :disabled="isDisabled">
    <refresh-cw-icon></refresh-cw-icon>
  </button>
</template>

<script>
import { RefreshCwIcon } from "vue-feather-icons";

export default {
  name: 'RestartButton',
  components: {
    RefreshCwIcon
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('clicked')
    }
  }
}
</script>