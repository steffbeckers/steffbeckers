<script setup>
import { addMonths, intervalToDuration, startOfDay, startOfToday } from "date-fns";

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
  start: addMonths(startOfDay(props.start), -1),
  end: props.end ? startOfDay(props.end) : startOfToday(),
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
