# 服务安装步骤
1. 安装依赖环境`node`、`npm`、`npm`包`pm2`
2. 根据操作系统，安装图片处理相关依赖
---   
   OS | Command
  - | - 
  Ubuntu | sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
  Fedora | sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
---
3. 执行`npm install`，最好执行`npm install --unsafe-perm=true --allow-root`，这个服务有部分依赖需要高权限安装，`npm`默认的`nobody`权限可能会报错
4. 安装中文字体
5. 在此目录下执行`npm run pm2`
6. 配置`nginx`代理 （约定域名，线上：`node-service.317hu.com`、测试：`node-service-sit.317hu.com`）
 