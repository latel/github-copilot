# 更新日志

所有重要的项目变更都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.0.0] - 2025-11-20

### 新增 (Added)

#### 后端功能
- 基于 MidwayJS 3 的后端服务
- TypeORM + MySQL 数据持久化
- RESTful API 接口
- 项目管理 API（CRUD）
- 报表管理 API（CRUD）
- 组件管理 API（CRUD + 批量更新）
- CORS 跨域支持
- 数据库自动同步（开发模式）

#### 前端功能
- 基于 Vue 3 的单页应用
- 项目列表和管理界面
- 报表列表和管理界面
- 拖放式报表编辑器
- 组件面板（拖放添加组件）
- 属性编辑器（实时编辑）
- 报表查看模式（只读）
- Vue Router 路由管理
- Pinia 状态管理
- Axios HTTP 客户端

#### 组件库
- 文本组件
  - 可配置内容、字体大小、颜色、粗细、对齐
- 柱状图组件
  - 基于 ECharts
  - 可配置标题、X轴、数据、颜色
- 折线图组件
  - 基于 ECharts
  - 可配置标题、X轴、数据、颜色、平滑曲线
- 饼图组件
  - 基于 ECharts
  - 可配置标题和数据

#### 交互功能
- 拖拽添加组件到画布
- 拖拽移动组件位置
- 调整组件大小（8个调整手柄）
- 选中组件显示边框
- 点击选择/取消选择组件
- 实时属性编辑和预览
- 自动保存组件更改

#### 用户界面
- Bootstrap 5 响应式布局
- Bootstrap Icons 图标库
- 模态对话框（创建项目/报表）
- 卡片式列表展示
- 三栏布局编辑器
  - 左侧：组件面板
  - 中间：画布区域
  - 右侧：属性编辑器

#### 数据模型
- Project 实体（项目）
- Report 实体（报表）
- Component 实体（组件）
- 实体关联关系
- JSON 字段存储复杂数据

#### 文档
- README.md - 项目概览和快速开始
- SETUP.md - 详细安装配置指南
- ARCHITECTURE.md - 系统架构文档
- CONTRIBUTING.md - 贡献指南
- FEATURES.md - 功能展示文档
- CHANGELOG.md - 本更新日志
- database.sql - 数据库初始化脚本

#### 开发工具
- TypeScript 支持（前后端）
- Vite 构建工具
- start.sh - Linux/Mac 启动脚本
- start.bat - Windows 启动脚本
- package.json - 便捷脚本
- .env.example - 环境变量示例
- .gitignore - Git 忽略规则

### 技术规格

#### 前端
- Vue 3.5.24
- Vue Router 4.6.3
- Pinia 3.0.4
- Axios 1.13.2
- Bootstrap 5.3.8
- Bootstrap Icons 1.13.1
- ECharts 6.0.0
- Vite 7.2.2
- TypeScript 5.9.3

#### 后端
- MidwayJS 3.20.11
- TypeORM 0.3.27
- MySQL 5.7+
- Node.js 16+
- TypeScript 5.9.3

### 数据库结构

#### projects 表
- id: 主键
- name: 项目名称
- description: 项目描述
- isActive: 是否激活
- createdAt: 创建时间
- updatedAt: 更新时间

#### reports 表
- id: 主键
- name: 报表名称
- description: 报表描述
- project_id: 所属项目ID（外键）
- layout: 布局配置（JSON）
- isActive: 是否激活
- createdAt: 创建时间
- updatedAt: 更新时间

#### components 表
- id: 主键
- report_id: 所属报表ID（外键）
- type: 组件类型
- properties: 组件属性（JSON）
- position: 位置信息（JSON）
- dataSource: 数据源配置（JSON）
- zIndex: 层级
- createdAt: 创建时间
- updatedAt: 更新时间

### API 端点

#### 项目管理
- GET /api/projects - 获取项目列表
- GET /api/projects/:id - 获取项目详情
- POST /api/projects - 创建项目
- PUT /api/projects/:id - 更新项目
- DELETE /api/projects/:id - 删除项目

#### 报表管理
- GET /api/reports?projectId=:id - 获取报表列表
- GET /api/reports/:id - 获取报表详情
- POST /api/reports - 创建报表
- PUT /api/reports/:id - 更新报表
- DELETE /api/reports/:id - 删除报表

#### 组件管理
- GET /api/components?reportId=:id - 获取组件列表
- GET /api/components/:id - 获取组件详情
- POST /api/components - 创建组件
- PUT /api/components/:id - 更新组件
- POST /api/components/batch - 批量更新组件
- DELETE /api/components/:id - 删除组件

### 构建和部署

- 前端生产构建：`npm run build:frontend`
- 后端生产构建：`npm run build:backend`
- 前端输出目录：`frontend/dist`
- 后端输出目录：`backend/dist`
- 支持 PM2 进程管理
- 支持 Nginx 反向代理

### 已知限制

- 不支持用户认证和权限管理
- 不支持数据源配置（静态数据）
- 不支持报表导出功能
- 不支持组件复制/粘贴
- 不支持撤销/重做操作
- 单个报表建议不超过20个组件
- 图表数据点建议不超过100个

### 浏览器支持

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+
- ❌ IE 11（不支持）

### 性能指标

- 首页加载时间：< 2秒
- 报表编辑器加载：< 3秒
- API响应时间：< 200ms（本地）
- 前端构建产物：~1.3MB（gzip后 ~430KB）

---

## [未发布] - 规划中

### 计划新增

- 更多组件类型
  - 表格组件
  - 散点图
  - 雷达图
  - 仪表盘
  - 地图组件
  - 图片组件
  - 视频组件
  
- 数据源功能
  - API 数据源配置
  - 数据库查询配置
  - Excel/CSV 数据导入
  - 实时数据更新
  
- 导出功能
  - 导出为 PDF
  - 导出为 PNG/JPG
  - 导出为 Excel
  - 分享链接
  
- 交互功能
  - 组件联动
  - 点击事件
  - 参数传递
  - 钻取功能
  
- 编辑增强
  - 撤销/重做
  - 复制/粘贴
  - 组件对齐工具
  - 网格吸附
  - 标尺和辅助线
  
- 协作功能
  - 用户认证
  - 权限管理
  - 协同编辑
  - 评论功能
  - 版本历史
  
- 模板系统
  - 报表模板
  - 组件模板
  - 主题切换
  
- 性能优化
  - 虚拟滚动
  - 懒加载
  - 缓存策略
  
- 移动端
  - 响应式优化
  - 触摸操作支持
  - 移动端查看器

### 计划改进

- 优化 TypeScript 类型定义
- 添加单元测试
- 添加E2E测试
- 改进错误处理
- 添加日志系统
- 优化数据库查询
- 添加数据验证
- 改进文档

---

## 版本说明

### 版本号规则

格式：`主版本号.次版本号.修订号`

- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 变更类型

- `新增 (Added)`: 新功能
- `变更 (Changed)`: 对现有功能的变更
- `弃用 (Deprecated)`: 即将移除的功能
- `移除 (Removed)`: 已移除的功能
- `修复 (Fixed)`: 任何bug修复
- `安全 (Security)`: 修复安全问题

---

[1.0.0]: https://github.com/latel/github-copilot/releases/tag/v1.0.0
