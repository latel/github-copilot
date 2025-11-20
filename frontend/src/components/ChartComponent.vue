<template>
  <div ref="chartRef" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps } from 'vue';
import * as echarts from 'echarts';
import type { Component } from '../types';

const props = defineProps<{
  type: string;
  properties: Component['properties'];
}>();

const chartRef = ref<HTMLDivElement>();
let chartInstance: echarts.ECharts | null = null;

function initChart() {
  if (!chartRef.value) return;
  
  chartInstance = echarts.init(chartRef.value);
  updateChart();
}

function updateChart() {
  if (!chartInstance) return;

  let option: any = {
    title: {
      text: props.properties.title,
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
  };

  if (props.type === 'chart-bar') {
    option = {
      ...option,
      xAxis: {
        type: 'category',
        data: props.properties.xAxisData || [],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'bar',
          data: props.properties.seriesData || [],
          itemStyle: {
            color: props.properties.color,
          },
        },
      ],
    };
  } else if (props.type === 'chart-line') {
    option = {
      ...option,
      xAxis: {
        type: 'category',
        data: props.properties.xAxisData || [],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'line',
          data: props.properties.seriesData || [],
          smooth: props.properties.smooth,
          itemStyle: {
            color: props.properties.color,
          },
        },
      ],
    };
  } else if (props.type === 'chart-pie') {
    option = {
      title: {
        text: props.properties.title,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: props.properties.data || [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  chartInstance.setOption(option);
}

onMounted(() => {
  initChart();
  window.addEventListener('resize', () => {
    chartInstance?.resize();
  });
});

watch(() => props.properties, () => {
  updateChart();
}, { deep: true });
</script>
