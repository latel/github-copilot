@echo off
chcp 65001 >nul
echo ==========================================
echo 可视化报表系统启动脚本
echo ==========================================
echo.

REM 检查 Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: Node.js 未安装
    echo 请先安装 Node.js (https://nodejs.org/)
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js 版本: %NODE_VERSION%
echo.

echo 正在启动服务...
echo.

REM 启动后端
echo 📦 启动后端服务...
cd backend

if not exist "node_modules" (
    echo 正在安装后端依赖...
    call npm install
)

if not exist ".env" (
    echo ⚠️  警告: .env 文件不存在，从 .env.example 复制
    copy .env.example .env
)

start "后端服务" cmd /k "npm run dev"
echo ✅ 后端服务已启动
echo    访问地址: http://localhost:7001
echo.

REM 等待后端启动
timeout /t 3 /nobreak >nul

cd ..

REM 启动前端
echo 🎨 启动前端服务...
cd frontend

if not exist "node_modules" (
    echo 正在安装前端依赖...
    call npm install
)

start "前端服务" cmd /k "npm run dev"
echo ✅ 前端服务已启动
echo    访问地址: http://localhost:3000
echo.

cd ..

echo ==========================================
echo 🎉 服务启动完成！
echo ==========================================
echo.
echo 访问 http://localhost:3000 开始使用
echo.
echo 关闭此窗口不会停止服务
echo 要停止服务，请关闭后端和前端的命令行窗口
echo.
pause
