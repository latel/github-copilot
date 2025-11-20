# 贡献指南

感谢您对本项目的关注！我们欢迎各种形式的贡献。

## 如何贡献

### 报告问题

如果您发现了bug或有功能建议：

1. 检查 [Issues](https://github.com/latel/github-copilot/issues) 确保问题未被报告
2. 创建新的 Issue，提供以下信息：
   - 问题的详细描述
   - 重现步骤
   - 期望的行为
   - 实际的行为
   - 环境信息（操作系统、Node.js版本、浏览器等）
   - 截图（如果适用）

### 提交代码

1. **Fork 项目**
   ```bash
   # 点击 GitHub 页面右上角的 "Fork" 按钮
   ```

2. **克隆您的 Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/github-copilot.git
   cd github-copilot
   ```

3. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

4. **进行修改**
   - 遵循项目代码风格
   - 添加必要的注释
   - 更新相关文档

5. **提交更改**
   ```bash
   git add .
   git commit -m "描述你的更改"
   ```

   提交信息格式建议：
   - `feat: 添加新功能`
   - `fix: 修复bug`
   - `docs: 更新文档`
   - `style: 代码格式调整`
   - `refactor: 重构代码`
   - `test: 添加测试`
   - `chore: 构建/工具相关`

6. **推送到您的 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **创建 Pull Request**
   - 前往原项目的 GitHub 页面
   - 点击 "New Pull Request"
   - 选择您的分支
   - 填写 PR 描述，说明：
     - 这个PR解决了什么问题
     - 如何测试您的更改
     - 相关的 Issue 编号（如果有）

## 代码风格

### TypeScript

- 使用 TypeScript 编写代码
- 避免使用 `any` 类型
- 为函数参数和返回值添加类型注解
- 使用接口定义复杂类型

### Vue 组件

- 使用 Composition API
- 使用 `<script setup>` 语法
- Props 使用 TypeScript 类型定义
- 组件命名使用 PascalCase

### 命名规范

- 变量和函数：camelCase
- 类和接口：PascalCase
- 常量：UPPER_SNAKE_CASE
- 文件名：kebab-case 或 PascalCase（组件）

### 代码组织

```typescript
// 1. 导入
import { ref, computed } from 'vue';
import type { MyType } from './types';

// 2. Props/Emits 定义
const props = defineProps<{
  value: string;
}>();

const emit = defineEmits<{
  update: [value: string];
}>();

// 3. 响应式数据
const count = ref(0);
const doubled = computed(() => count.value * 2);

// 4. 方法
function increment() {
  count.value++;
}

// 5. 生命周期
onMounted(() => {
  // ...
});
```

## 开发流程

### 设置开发环境

1. **安装依赖**
   ```bash
   # 安装所有依赖
   npm run install:all
   
   # 或分别安装
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **配置数据库**
   ```bash
   # 创建数据库
   mysql -u root -p < database.sql
   
   # 配置后端环境变量
   cd backend
   cp .env.example .env
   # 编辑 .env 文件
   ```

3. **启动开发服务器**
   ```bash
   # 使用启动脚本
   ./start.sh  # Linux/Mac
   start.bat   # Windows
   
   # 或分别启动
   npm run dev:backend
   npm run dev:frontend
   ```

### 测试

目前项目还没有完整的测试套件，但我们鼓励：

1. **手动测试**
   - 测试您修改的功能
   - 确保没有破坏现有功能

2. **跨浏览器测试**
   - Chrome
   - Firefox
   - Safari
   - Edge

3. **响应式测试**
   - 测试不同屏幕尺寸

### 构建

```bash
# 构建后端
npm run build:backend

# 构建前端
npm run build:frontend

# 构建所有
npm run build:all
```

## 添加新组件类型

如果您想添加新的报表组件类型：

1. **定义组件 Schema**
   
   编辑 `frontend/src/utils/componentSchemas.ts`:
   
   ```typescript
   {
     type: 'my-component',
     label: '我的组件',
     icon: 'bi-icon-name',
     defaultProps: {
       // 默认属性
     },
     schema: {
       type: 'object',
       properties: {
         // JSON Schema 定义
       },
     },
   }
   ```

2. **创建组件实现**
   
   创建 `frontend/src/components/MyComponent.vue`:
   
   ```vue
   <template>
     <div>
       <!-- 组件UI -->
     </div>
   </template>
   
   <script setup lang="ts">
   import { defineProps } from 'vue';
   import type { Component } from '../types';
   
   const props = defineProps<{
     properties: Component['properties'];
   }>();
   </script>
   ```

3. **注册组件**
   
   在 `DraggableComponent.vue` 中添加：
   
   ```typescript
   const componentMap: Record<string, any> = {
     // 现有组件...
     'my-component': MyComponent,
   };
   ```

## 文档

- README.md - 项目概览和使用说明
- SETUP.md - 详细的安装配置指南
- ARCHITECTURE.md - 系统架构文档
- CONTRIBUTING.md - 本文件

更新文档时，请确保：
- 信息准确
- 格式统一
- 中文使用简体中文
- 代码示例可运行

## 发布流程

（由项目维护者执行）

1. 更新版本号
2. 更新 CHANGELOG
3. 创建 Git Tag
4. 发布 Release

## 社区准则

- 尊重他人
- 建设性反馈
- 保持专业
- 欢迎新手

## 许可证

提交代码即表示您同意按照项目的 ISC 许可证授权您的贡献。

## 联系方式

- Issues: [GitHub Issues](https://github.com/latel/github-copilot/issues)
- Pull Requests: [GitHub PRs](https://github.com/latel/github-copilot/pulls)

## 常见问题

### Q: 我应该从哪里开始？

A: 查看标记为 "good first issue" 的 Issues，这些通常比较适合新贡献者。

### Q: 我的 PR 多久会被审查？

A: 我们会尽快审查，通常在几天内。如果超过一周没有回应，可以在 PR 中评论提醒。

### Q: 我可以同时提交多个 PR 吗？

A: 可以，但建议等第一个 PR 被审查后再提交第二个，以避免重复工作。

### Q: 需要编写测试吗？

A: 目前测试不是必需的，但我们鼓励添加测试，特别是对于复杂的功能。

---

再次感谢您的贡献！🎉
