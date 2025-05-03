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
  years: {
    type: Boolean,
    default: true,
  },
  months: {
    type: Boolean,
    default: true,
  },
  singular: Boolean,
});

const duration = intervalToDuration({
  start: addMonths(startOfDay(props.start), -1),
  end: props.end ? startOfDay(props.end) : startOfToday(),
});
</script>

<template>
  <span class="not-prose">
    <span v-if="props.years && duration.years > 0">
      <span v-if="duration.years === 1 || props.singular"
        >{{ duration.years }} {{ $t("Year").toLowerCase() }}</span
      >
      <span v-else-if="duration.years > 1"
        >{{ duration.years }} {{ $t("Years").toLowerCase() }}</span
      >
      <span v-if="props.months && duration.months > 0">, </span>
    </span>
    <span v-if="props.months && duration.months > 0">
      <span v-if="duration.months === 1 || props.singular"
        >{{ duration.months }} {{ $t("Month").toLowerCase() }}</span
      >
      <span v-else-if="duration.months > 1"
        >{{ duration.months }} {{ $t("Months").toLowerCase() }}</span
      >
    </span>
  </span>
</template>
