# 系统架构文档

## 整体架构

```
┌─────────────────────────────────────────────────────────────────┐
│                        用户浏览器 (Browser)                        │
│                      http://localhost:3000                       │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 │ HTTP/AJAX
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     前端应用 (Vue 3 SPA)                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Vue Router  │  │    Pinia     │  │   Axios      │          │
│  │  路由管理     │  │   状态管理    │  │  HTTP客户端   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐      │
│  │              页面组件 (Views)                         │      │
│  ├──────────────────────────────────────────────────────┤      │
│  │  • ProjectList    - 项目列表                          │      │
│  │  • ReportList     - 报表列表                          │      │
│  │  • ReportEditor   - 报表编辑器 (拖拽布局)              │      │
│  │  • ReportView     - 报表查看                          │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐      │
│  │           可复用组件 (Components)                      │      │
│  ├──────────────────────────────────────────────────────┤      │
│  │  • DraggableComponent  - 可拖拽容器                    │      │
│  │  • ComponentPalette    - 组件面板                     │      │
│  │  • PropertyEditor      - 属性编辑器                    │      │
│  │  • TextComponent       - 文本组件                     │      │
│  │  • ChartComponent      - 图表组件 (ECharts)           │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐      │
│  │                UI框架                                 │      │
│  │  • Bootstrap 5      - 响应式样式                       │      │
│  │  • Bootstrap Icons  - 图标库                          │      │
│  │  • ECharts          - 图表可视化                       │      │
│  └──────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 │ REST API
                                 │ /api/*
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   后端服务 (MidwayJS)                             │
│                 http://localhost:7001                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐      │
│  │              控制器层 (Controllers)                    │      │
│  ├──────────────────────────────────────────────────────┤      │
│  │  • ProjectController    - 项目管理API                 │      │
│  │  • ReportController     - 报表管理API                 │      │
│  │  • ComponentController  - 组件管理API                 │      │
│  └──────────────────────────────────────────────────────┘      │
│                          ▼                                       │
│  ┌──────────────────────────────────────────────────────┐      │
│  │              服务层 (Services)                         │      │
│  ├──────────────────────────────────────────────────────┤      │
│  │  • ProjectService       - 项目业务逻辑                 │      │
│  │  • ReportService        - 报表业务逻辑                 │      │
│  │  • ComponentService     - 组件业务逻辑                 │      │
│  └──────────────────────────────────────────────────────┘      │
│                          ▼                                       │
│  ┌──────────────────────────────────────────────────────┐      │
│  │          数据访问层 (TypeORM Repositories)             │      │
│  ├──────────────────────────────────────────────────────┤      │
│  │  • Repository<Project>                                │      │
│  │  • Repository<Report>                                 │      │
│  │  • Repository<Component>                              │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐      │
│  │               实体模型 (Entities)                      │      │
│  ├──────────────────────────────────────────────────────┤      │
│  │  • Project      - 项目实体                            │      │
│  │  • Report       - 报表实体                            │      │
│  │  • Component    - 组件实体                            │      │
│  └──────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 │ SQL
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      数据库 (MySQL)                               │
│                      report_system                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   projects   │  │   reports    │  │  components  │          │
│  │              │  │              │  │              │          │
│  │  • id        │  │  • id        │  │  • id        │          │
│  │  • name      │  │  • name      │  │  • report_id │          │
│  │  • desc      │  │  • project_id│  │  • type      │          │
│  │  • isActive  │  │  • layout    │  │  • properties│          │
│  │  • created   │  │  • isActive  │  │  • position  │          │
│  │  • updated   │  │  • created   │  │  • dataSource│          │
│  └──────────────┘  │  • updated   │  │  • zIndex    │          │
│                    └──────────────┘  │  • created   │          │
│                                      │  • updated   │          │
│                                      └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## 核心技术栈

### 前端
- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **路由**: Vue Router 4
- **状态管理**: Pinia
- **HTTP客户端**: Axios
- **UI框架**: Bootstrap 5
- **图标**: Bootstrap Icons
- **图表库**: ECharts
- **语言**: TypeScript

### 后端
- **框架**: MidwayJS 3
- **Web框架**: Koa
- **ORM**: TypeORM
- **数据库**: MySQL
- **语言**: TypeScript

## 数据流

### 创建报表组件流程

```
用户操作
   │
   ├─► 1. 从组件面板拖拽组件
   │
   ▼
前端处理
   │
   ├─► 2. 监听 dragstart 事件
   ├─► 3. 监听 drop 事件
   ├─► 4. 计算组件位置 (x, y)
   ├─► 5. 创建组件数据对象
   │
   ▼
API请求
   │
   ├─► 6. POST /api/components
   │      Body: { reportId, type, properties, position, zIndex }
   │
   ▼
后端处理
   │
   ├─► 7. ComponentController.create()
   ├─► 8. ComponentService.create()
   ├─► 9. componentRepository.save()
   │
   ▼
数据库操作
   │
   ├─► 10. INSERT INTO components
   │
   ▼
响应返回
   │
   ├─► 11. 返回创建的组件数据
   │
   ▼
前端更新
   │
   └─► 12. 更新本地组件列表
        13. 渲染新组件
```

### 编辑组件属性流程

```
用户操作
   │
   ├─► 1. 选择组件
   │
   ▼
前端处理
   │
   ├─► 2. 设置 selectedComponent
   ├─► 3. 右侧面板显示属性编辑器
   ├─► 4. 用户修改属性值
   │
   ▼
实时更新
   │
   ├─► 5. @input 事件触发
   ├─► 6. updateProperty() 方法
   ├─► 7. 更新本地组件对象
   │
   ▼
API请求
   │
   ├─► 8. PUT /api/components/:id
   │      Body: { properties, position }
   │
   ▼
后端处理
   │
   ├─► 9. ComponentController.update()
   ├─► 10. ComponentService.update()
   ├─► 11. componentRepository.update()
   │
   ▼
数据库操作
   │
   ├─► 12. UPDATE components SET ...
   │
   ▼
响应返回
   │
   └─► 13. 返回更新后的组件数据
```

## 组件系统

### 组件类型和Schema定义

每个组件类型都有一个 Schema 定义，包括：

1. **type**: 组件类型标识符
2. **label**: 组件显示名称
3. **icon**: Bootstrap Icon 图标类名
4. **defaultProps**: 默认属性值
5. **schema**: JSON Schema 定义（用于属性编辑器）

示例：

```typescript
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
      xAxisData: { type: 'array', title: 'X轴数据' },
      seriesData: { type: 'array', title: '数据' },
      color: { type: 'string', title: '颜色', format: 'color' },
    },
  },
}
```

### 组件渲染流程

```
ReportEditor
   │
   ├─► 加载报表和组件列表
   │
   ▼
画布容器
   │
   ├─► 遍历 components 数组
   │
   ▼
DraggableComponent (循环)
   │
   ├─► 包装组件，提供拖拽/调整大小功能
   │
   ▼
实际组件 (根据type选择)
   │
   ├─► TextComponent      (type === 'text')
   ├─► ChartComponent     (type === 'chart-bar')
   ├─► ChartComponent     (type === 'chart-line')
   └─► ChartComponent     (type === 'chart-pie')
```

## API接口设计

### RESTful API规范

| 方法   | 路径                      | 说明           |
|--------|---------------------------|----------------|
| GET    | /api/projects             | 获取项目列表   |
| GET    | /api/projects/:id         | 获取项目详情   |
| POST   | /api/projects             | 创建项目       |
| PUT    | /api/projects/:id         | 更新项目       |
| DELETE | /api/projects/:id         | 删除项目       |
| GET    | /api/reports?projectId=:id| 获取报表列表   |
| GET    | /api/reports/:id          | 获取报表详情   |
| POST   | /api/reports              | 创建报表       |
| PUT    | /api/reports/:id          | 更新报表       |
| DELETE | /api/reports/:id          | 删除报表       |
| GET    | /api/components?reportId=:id| 获取组件列表 |
| GET    | /api/components/:id       | 获取组件详情   |
| POST   | /api/components           | 创建组件       |
| PUT    | /api/components/:id       | 更新组件       |
| POST   | /api/components/batch     | 批量更新组件   |
| DELETE | /api/components/:id       | 删除组件       |

### 数据模型

#### Project (项目)
```json
{
  "id": 1,
  "name": "销售报表项目",
  "description": "包含各类销售数据报表",
  "isActive": true,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

#### Report (报表)
```json
{
  "id": 1,
  "name": "销售总览",
  "description": "展示销售数据的总体情况",
  "projectId": 1,
  "layout": null,
  "isActive": true,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

#### Component (组件)
```json
{
  "id": 1,
  "reportId": 1,
  "type": "chart-bar",
  "properties": {
    "title": "月度销售额",
    "xAxisData": ["1月", "2月", "3月"],
    "seriesData": [100, 200, 150],
    "color": "#5470c6"
  },
  "position": {
    "x": 100,
    "y": 100,
    "width": 400,
    "height": 300
  },
  "dataSource": null,
  "zIndex": 0,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

## 安全性考虑

1. **CORS配置**: 后端配置了CORS中间件，允许跨域请求
2. **输入验证**: 应该在实际部署时添加输入验证
3. **SQL注入防护**: TypeORM提供参数化查询
4. **XSS防护**: Vue自动转义模板内容
5. **认证授权**: 当前版本未实现，建议在生产环境添加

## 性能优化建议

1. **前端**:
   - 使用动态导入进行代码分割
   - 图表组件懒加载
   - 虚拟滚动（大量组件时）
   - 组件更新防抖

2. **后端**:
   - 数据库索引优化
   - 查询结果缓存
   - 分页加载
   - 数据库连接池

3. **数据库**:
   - 添加适当的索引
   - 定期优化表结构
   - 使用读写分离

## 扩展性

系统设计考虑了以下扩展点：

1. **新组件类型**: 在 `componentSchemas.ts` 中添加新的组件定义
2. **数据源**: 组件实体包含 `dataSource` 字段，可扩展数据获取逻辑
3. **权限控制**: 可在控制器层添加权限验证中间件
4. **报表分享**: 可添加报表发布和分享功能
5. **导出功能**: 可集成PDF/Excel导出库
