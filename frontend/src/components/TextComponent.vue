<template>
  <div
    :style="{
      fontSize: props.properties.fontSize + 'px',
      color: props.properties.color,
      fontWeight: props.properties.fontWeight,
      textAlign: props.properties.textAlign,
      width: '100%',
      height: '100%',
      padding: '8px',
    }"
  >
    {{ props.properties.content }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Component } from '../types';

const props = defineProps<{
  properties: Component['properties'];
}>();
</script>
