# 可视化报表系统 (Visual Report System)

一个功能强大的可视化报表系统，支持多个报表项目管理，每个项目有独立的菜单和报表页面。

## 功能特性

### 核心功能
- **多项目管理**: 支持创建和管理多个报表项目
- **报表编辑器**: 强大的拖放式报表编辑器
- **组件库**: 内置多种报表组件（文本、柱状图、折线图、饼图等）
- **可视化图表**: 使用 ECharts 实现的专业图表展示
- **属性编辑**: 基于 JSON Schema 的实时属性编辑
- **自由布局**: 通过拖拽实现组件的自由布局和调整大小

### 技术栈

**前端**:
- Vue 3 - 渐进式 JavaScript 框架
- Bootstrap 5 - UI 框架
- Bootstrap Icons - 图标库
- ECharts - 数据可视化库
- Vue Router - 路由管理
- Pinia - 状态管理
- Axios - HTTP 客户端
- TypeScript - 类型安全

**后端**:
- MidwayJS - Node.js 企业级框架
- TypeORM - ORM 框架
- MySQL - 数据库
- TypeScript - 类型安全

## 项目结构

```
github-copilot/
├── backend/              # 后端服务
│   ├── src/
│   │   ├── controller/  # 控制器
│   │   ├── service/     # 业务逻辑
│   │   ├── entity/      # 数据库实体
│   │   └── config/      # 配置文件
│   └── package.json
├── frontend/            # 前端应用
│   ├── src/
│   │   ├── components/  # 组件
│   │   ├── views/       # 页面视图
│   │   ├── stores/      # 状态管理
│   │   ├── utils/       # 工具函数
│   │   └── types/       # TypeScript 类型
│   └── package.json
└── README.md
```

## 快速开始

### 环境要求

- Node.js 16+
- MySQL 5.7+
- npm 或 yarn

### 数据库设置

1. 创建 MySQL 数据库:
```sql
CREATE DATABASE report_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 配置后端环境变量:
```bash
cd backend
cp .env.example .env
# 编辑 .env 文件，填入数据库连接信息
```

### 安装和运行

#### 后端服务

```bash
cd backend
npm install
npm run dev
```

后端服务将在 http://localhost:7001 启动

#### 前端应用

```bash
cd frontend
npm install
npm run dev
```

前端应用将在 http://localhost:3000 启动

## API 接口

### 项目管理

- `GET /api/projects` - 获取项目列表
- `GET /api/projects/:id` - 获取项目详情
- `POST /api/projects` - 创建项目
- `PUT /api/projects/:id` - 更新项目
- `DELETE /api/projects/:id` - 删除项目

### 报表管理

- `GET /api/reports?projectId=:projectId` - 获取项目下的报表列表
- `GET /api/reports/:id` - 获取报表详情
- `POST /api/reports` - 创建报表
- `PUT /api/reports/:id` - 更新报表
- `DELETE /api/reports/:id` - 删除报表

### 组件管理

- `GET /api/components?reportId=:reportId` - 获取报表下的组件列表
- `GET /api/components/:id` - 获取组件详情
- `POST /api/components` - 创建组件
- `PUT /api/components/:id` - 更新组件
- `POST /api/components/batch` - 批量更新组件
- `DELETE /api/components/:id` - 删除组件

## 使用指南

### 创建项目

1. 在首页点击"创建项目"按钮
2. 输入项目名称和描述
3. 点击"创建"完成项目创建

### 创建报表

1. 进入项目详情页
2. 点击"创建报表"按钮
3. 输入报表名称和描述
4. 点击"创建"完成报表创建

### 编辑报表

1. 在报表列表中点击"编辑"按钮
2. 从左侧组件库拖拽组件到画布
3. 选中组件后在右侧编辑属性
4. 拖动和调整组件大小进行布局
5. 点击"保存"保存报表

### 查看报表

1. 在报表列表中点击"查看"按钮
2. 查看已配置的报表内容
3. 点击"刷新"重新加载数据

## 组件类型

### 文本组件
- 支持自定义内容、字体大小、颜色、粗细和对齐方式

### 柱状图
- 支持自定义标题、X 轴数据、系列数据和颜色

### 折线图
- 支持自定义标题、X 轴数据、系列数据、颜色和平滑曲线

### 饼图
- 支持自定义标题和数据项

## 开发计划

- [ ] 更多图表类型（散点图、雷达图等）
- [ ] 表格组件
- [ ] 图片组件
- [ ] 数据源配置（API、数据库查询等）
- [ ] 报表导出（PDF、Excel）
- [ ] 用户权限管理
- [ ] 报表分享和发布

## 许可证

ISC