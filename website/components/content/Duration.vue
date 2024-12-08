<script setup>
import { intervalToDuration } from "date-fns";

const props = defineProps({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
  },
});

const duration = intervalToDuration({
  start: new Date(props.start),
  end: props.end ? new Date(props.end) : new Date(),
});
</script>

<template>
  <span class="not-prose">
    <span v-if="duration.years >= 1">
      {{ duration.years }} year{{ duration.years > 1 ? "s" : "" }},
    </span>
    <span v-if="duration.months >= 1">
      {{ duration.months }} month{{ duration.months > 1 ? "s" : "" }}
    </span>
  </span>
</template>
