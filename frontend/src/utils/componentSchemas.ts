import type { ComponentSchema } from '../types';

export const componentSchemas: ComponentSchema[] = [
  {
    type: 'text',
    label: '文本',
    icon: 'bi-fonts',
    defaultProps: {
      content: '文本内容',
      fontSize: 14,
      color: '#333333',
      fontWeight: 'normal',
      textAlign: 'left',
    },
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string', title: '内容' },
        fontSize: { type: 'number', title: '字体大小', minimum: 12, maximum: 72 },
        color: { type: 'string', title: '颜色', format: 'color' },
        fontWeight: { 
          type: 'string', 
          title: '字体粗细',
          enum: ['normal', 'bold', 'bolder', 'lighter'],
        },
        textAlign: {
          type: 'string',
          title: '对齐方式',
          enum: ['left', 'center', 'right'],
        },
      },
    },
  },
  {
    type: 'chart-bar',
    label: '柱状图',
    icon: 'bi-bar-chart-fill',
    defaultProps: {
      title: '柱状图',
      xAxisData: ['周一', '周二', '周三', '周四', '周五'],
      seriesData: [120, 200, 150, 80, 70],
      color: '#5470c6',
    },
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', title: '标题' },
        xAxisData: { 
          type: 'array',
          title: 'X轴数据',
          items: { type: 'string' },
        },
        seriesData: {
          type: 'array',
          title: '数据',
          items: { type: 'number' },
        },
        color: { type: 'string', title: '颜色', format: 'color' },
      },
    },
  },
  {
    type: 'chart-line',
    label: '折线图',
    icon: 'bi-graph-up',
    defaultProps: {
      title: '折线图',
      xAxisData: ['周一', '周二', '周三', '周四', '周五'],
      seriesData: [120, 200, 150, 80, 70],
      color: '#91cc75',
      smooth: true,
    },
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', title: '标题' },
        xAxisData: {
          type: 'array',
          title: 'X轴数据',
          items: { type: 'string' },
        },
        seriesData: {
          type: 'array',
          title: '数据',
          items: { type: 'number' },
        },
        color: { type: 'string', title: '颜色', format: 'color' },
        smooth: { type: 'boolean', title: '平滑曲线' },
      },
    },
  },
  {
    type: 'chart-pie',
    label: '饼图',
    icon: 'bi-pie-chart-fill',
    defaultProps: {
      title: '饼图',
      data: [
        { name: '类目A', value: 335 },
        { name: '类目B', value: 310 },
        { name: '类目C', value: 234 },
        { name: '类目D', value: 135 },
        { name: '类目E', value: 148 },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', title: '标题' },
        data: {
          type: 'array',
          title: '数据',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              value: { type: 'number' },
            },
          },
        },
      },
    },
  },
];

export function getComponentSchema(type: string): ComponentSchema | undefined {
  return componentSchemas.find(schema => schema.type === type);
}
