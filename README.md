<h2 align="center">
🚀 从零搭建 gkBlog 博客
</h2>

<p align="center">
基于 <a href="https://github.com/enjidev/enji.dev">enji.dev</a> 二次开发的现代化 Next.js 博客主题，使用 Turborepo + pnpm 构建
</p>

<p align="center">
  <img src="apps/gkBlog/src/contents/update/images/og-image.png" alt="gkBlog Cover Image" />
</p>

<div align="center">
  <img alt="GitHub License" src="https://img.shields.io/github/license/wangyyyqw/HB-blog?label=%F0%9F%93%9C%20License" />
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/wangyyyqw/HB-blog?label=%F0%9F%93%A6%20%E4%BB%93%E5%BA%93%E5%A4%A7%E5%B0%8F" />
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/wangyyyqw/HB-blog?label=%F0%9F%93%85%20%E6%9C%80%E8%BF%91%E6%8F%90%E4%BA%A4" />
</div>

---

这篇教程会手把手带你从零开始搭建一个基于 gkBlog 主题的个人博客。即使你是完全的新手，只要跟着步骤一步步来，也能顺利完成。整个过程大约需要 30-60 分钟，最终你会得到一个部署在 Cloudflare Pages 上、全球免费访问的个人博客。

## 📋 准备工作

在开始之前，你需要准备以下账号和工具：

| 工具/账号 | 用途 | 获取地址 |
| --- | --- | --- |
| GitHub 账号 | 存放代码 | [github.com](https://github.com) |
| Node.js 22+ | 运行环境 | [nodejs.org](https://nodejs.org) |
| pnpm | 包管理器 | [pnpm.io](https://pnpm.io) |
| Git | 版本控制 | [git-scm.com](https://git-scm.com) |
| Trae | 代码编辑器 | [trae.ai](https://trae.ai) |
| Cloudflare 账号 | 部署网站 | [cloudflare.com](https://cloudflare.com) |

> 如果你在中国大陆，访问 GitHub 可能需要科学上网工具。


### 🌐 网络环境推荐

搭建博客的过程中需要访问 GitHub、npm 仓库、Cloudflare、Vercel 等境外服务，如果你在中国大陆，建议提前准备好科学上网工具。以下是从网上搜集到的一些低价或免费的代理服务，仅供参考：

| 服务 | 价格 | 特点 |
| --- | --- | --- |
| ikuuu（ikuuu.cc） | 免费 | 每月 50GB 免费流量，适合轻度使用 |
| 抹茶 Matcha（matcha.su） | 24 元/年 | 价格便宜，包年划算 |
| 泡芙云（vyy.idsduf.com） | 4 元/月 或 20 元/年 | 月付 300GB 流量，性价比高 |

> ⚠️ 以上信息均来自网络搜集，作者本人未购买或使用过这些服务，不对其安全性、稳定性和可用性做任何担保。请自行甄别，注意保护个人隐私和账号安全。使用代理服务请遵守当地法律法规。

---

## 🔧 环境安装

### 注册 GitHub 账号

1. 访问 [github.com](https://github.com)，点击右上角 **Sign up**
2. 输入邮箱地址（建议使用 Gmail 或 Outlook 等国际邮箱，QQ 邮箱也可以）
3. 设置密码（至少 8 个字符，包含数字和小写字母）
4. 输入用户名（会出现在你的仓库地址中，建议简短好记）
5. 完成人机验证，点击 **Create account**
6. 去邮箱查收验证邮件，点击验证链接完成注册

### 注册 Cloudflare 账号

1. 访问 [cloudflare.com](https://cloudflare.com)，点击 **Sign up**
2. 输入邮箱和密码完成注册
3. 登录后你会看到 Cloudflare Dashboard，后面部署博客时会用到

### 安装 Node.js

Node.js 是博客项目的运行环境，没有它代码跑不起来。

**Windows 用户：**
1. 访问 [nodejs.org](https://nodejs.org)，点击 LTS 版本下载
2. 双击安装包，一路 Next 保持默认设置
3. 打开命令提示符（Win + R → 输入 cmd），验证：`node -v`（应显示 v22.x.x 或更高）

**macOS 用户：**
1. 访问 [nodejs.org](https://nodejs.org)，下载 macOS 版 LTS 安装包
2. 双击安装，打开终端验证：`node -v`

**Linux 用户：**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
# 重新打开终端后
nvm install 22
node -v
```

> 版本号必须是 22.0.0 以上，低版本可能导致项目无法正常运行。

### 安装 pnpm

```bash
npm install -g pnpm
pnpm -v
```

> 如果提示权限不足，macOS/Linux 用户在命令前加 `sudo`，Windows 用户用管理员身份运行。

### 安装 Git

**Windows：** 访问 [git-scm.com](https://git-scm.com) 下载安装，一路 Next 即可。

**macOS：**
```bash
xcode-select --install
```

**Linux（Ubuntu/Debian）：**
```bash
sudo apt update
sudo apt install git
```

### 安装 Trae 编辑器

1. 访问 [trae.ai](https://trae.ai) 下载对应系统版本
2. 安装后建议安装以下扩展：
   - **Chinese (Simplified) Language Pack**：中文语言包
   - **MDX**：MDX 文件语法高亮
   - **Tailwind CSS IntelliSense**：Tailwind CSS 智能提示
   - **ESLint**：代码规范检查

> Trae 内置的 AI 助手可以帮你写代码、解释代码、修复 bug，对新手非常友好。

### 配置 Git 用户信息

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

邮箱建议和 GitHub 注册邮箱一致。


---

## 📥 获取项目代码

### Fork 仓库

1. 登录 GitHub，访问 [github.com/wangyyyqw/HB-blog](https://github.com/wangyyyqw/HB-blog)
2. 点击右上角 **Fork** 按钮
3. Repository name 保持默认，点击 **Create fork**
4. 地址栏变成 `github.com/你的用户名/HB-blog` 说明成功

### 克隆到本地

```bash
cd ~/Documents
git clone https://github.com/你的用户名/HB-blog.git
cd HB-blog
```

> 如果 clone 速度很慢或失败，请检查科学上网工具是否正常。

### 用 Trae 打开项目

- **方式一：** 在终端中运行 `trae .`
- **方式二：** 打开 Trae → 文件 → 打开文件夹 → 选择 HB-blog

主要关注 `apps/gkBlog/` 目录，博客的所有代码都在里面。

### 安装依赖

```bash
pnpm install
```

首次安装可能需要 3-10 分钟。如果报错，可以尝试设置镜像源：

```bash
pnpm config set registry https://registry.npmmirror.com
```

---

## ⚙️ 配置环境变量

```bash
cp apps/gkBlog/.env.example apps/gkBlog/.env.local
```

打开 `apps/gkBlog/.env.local`，各变量说明：

| 变量名 | 说明 | 是否必填 |
| --- | --- | --- |
| `DATABASE_URL` | 数据库连接字符串，初期可留空 | 否 |
| `SALT_IP_ADDRESS` | 加密盐值，随便写一个字符串即可 | 是 |
| `NEXT_PUBLIC_BAIDU_TONGJI` | 百度统计代码 | 否 |
| `NEXT_PUBLIC_GOOGLE_ID` | 谷歌分析代码 | 否 |
| `NEXT_PUBLIC_CLARITY_TAG_ID` | 微软 Clarity 代码 | 否 |
| `NEXT_PUBLIC_WALINE_SERVER_URL` | Waline 评论系统地址，后面配置 | 否 |

> 所有以 `NEXT_PUBLIC_` 开头的变量会暴露在前端代码中，不要放密码等敏感信息。

---

## 🏃 本地运行

```bash
pnpm dev
```

看到 `Ready in xxxms` 就说明启动成功，打开浏览器访问 `http://localhost:3000` 即可预览。

> 首次启动需要编译所有页面，可能要等 10-30 秒。停止服务器按 `Ctrl + C`。

---

## ✨ 个性化修改

### 修改站点域名

编辑 `apps/gkBlog/src/helpers/url.ts`，修改 `getBaseUrl` 函数中的域名。

### 替换头像

将你的头像命名为 `avatar.jpg`，替换 `apps/gkBlog/public/assets/images/avatar.jpg`。建议 200x200 像素以上，大小控制在 200KB 以内。

### 修改侧边栏

编辑 `apps/gkBlog/src/components/sidebar/Sidebar.tsx`，修改二维码链接、推荐文章等。

### 修改导航菜单

编辑 `apps/gkBlog/src/components/Navigation.tsx`，修改 `title` 和 `href`。

### 修改页脚

编辑 `apps/gkBlog/src/components/Footer.tsx`，修改版权信息、备案号等。


---

## ✏️ 写第一篇文章

在 `apps/gkBlog/src/pages/blog/` 目录下，每个文件夹就是一篇文章，文件夹名会成为文章的 URL 路径。

1. 在 `apps/gkBlog/src/pages/blog/` 下新建文件夹（英文命名，短横线分隔，如 `my-first-post`）
2. 在文件夹中创建 `index.mdx`
3. 文件开头写 FrontMatter，下方写正文

### FrontMatter 字段说明

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期，格式 `YYYY-MM-DD` |
| `lang` | 是 | 语言代码，中文 `zh`，英文 `en` |
| `tags` | 是 | 标签数组 |
| `category` | 是 | 分类名称 |
| `description` | 是 | 文章摘要，用于 SEO |
| `cover` | 否 | 封面图片路径 |
| `layout` | 是 | 布局模板，固定写 `Post` |

示例：

```yaml
---
title: 我的第一篇博客
description: "这是我的第一篇博客文章"
date: "2026-02-26"
lang: zh
tags:
  - 入门
category: 生活随笔
layout: Post
---

正文内容写在这里，支持标准 Markdown 语法。
```

> 最简单的方式：复制已有文章的 `index.mdx`，修改 FrontMatter 和正文即可。

### 用 Trae AI 修改页面布局

按 `Cmd + I`（macOS）或 `Ctrl + I`（Windows）打开 AI 对话框，用自然语言描述你想要的修改。示例提示词：

- 「帮我修改博客首页的布局，把文章列表改成卡片式网格布局」
- 「在 pages 下新建一个 about.tsx 页面，包含头像、个人简介、技能标签」
- 「优化博客在手机端的显示效果，导航栏改成汉堡菜单」

---

## 🚀 部署到 Cloudflare Pages

### 为什么选 Cloudflare Pages

- **完全免费**：不限流量、不限带宽
- **全球 CDN**：数百个节点，访问速度快
- **自动部署**：推送代码自动构建
- **自带 HTTPS**：自动配置 SSL 证书
- **国内可访问**：相比 Vercel 和 Netlify 更友好

### 连接 GitHub 仓库

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 左侧菜单 → **Workers 和 Pages** → **创建** → **Pages**
3. 点击 **连接到 Git** → 授权 GitHub → 选择 **HB-blog** 仓库

### 配置构建设置

| 设置项 | 值 |
| --- | --- |
| 项目名称 | 随便起，如 `my-blog` |
| 生产分支 | `main` |
| 框架预设 | `None` |
| 构建命令 | `npx turbo run build` |
| 构建输出目录 | `apps/gkBlog/out` |

### 环境变量

| 变量名 | 值 | 说明 |
| --- | --- | --- |
| `NODE_VERSION` | `22` | 必须设置 |
| `NEXT_PUBLIC_WALINE_SERVER_URL` | 你的 Waline 地址 | 后面配置好再填 |

点击 **保存并部署**，等待 3-5 分钟，部署成功后会分配 `你的项目名.pages.dev` 域名。


---

## 💬 配置 Waline 评论系统

评论系统让读者可以在文章下面留言互动。整个配置分三步：创建数据库 → 部署服务端 → 配置博客连接。

### 第一步：创建 Neon 数据库

1. 访问 [neon.tech](https://neon.tech)，用 GitHub 账号登录
2. 点击 **Create a project**
3. 填写信息：
   - Project name：`waline-db`
   - Region：`US East (Ohio)`
   - Database name：保持默认 `neondb`
4. 创建成功后，记下 Host、Database name、User、Password

### 第二步：部署 Waline 到 Vercel

1. 打开 [Waline 官方文档](https://waline.js.org)，找到快速上手页面
2. 点击 **Vercel 一键部署**按钮，用 GitHub 账号登录
3. 项目名填 `waline-server`，展开 **Environment Variables**，添加：

| 变量名 | 值 |
| --- | --- |
| `PG_DB` | `neondb` |
| `PG_HOST` | Neon 提供的主机地址 |
| `PG_PASSWORD` | Neon 数据库密码 |
| `PG_PORT` | `5432` |
| `PG_USER` | Neon 数据库用户名 |
| `PG_SSL` | `true` |

4. 点击 **Deploy**，等待 1-2 分钟
5. 部署成功后访问分配的地址，看到 Waline 界面说明成功

> 第一次访问会提示注册管理员账号，建议立即注册。

### 第三步：配置博客连接 Waline

1. 编辑 `apps/gkBlog/.env.local`，设置 `NEXT_PUBLIC_WALINE_SERVER_URL` 为你的 Waline 地址
2. 编辑 `apps/gkBlog/.env.production`，同样设置该变量
3. 在 Cloudflare Pages 项目设置 → 环境变量中也添加该变量
4. 提交并推送：

```bash
git add .
git commit -m "配置 Waline 评论系统"
git push
```

> 中国大陆用户注意：Vercel 默认域名在国内可能无法访问，建议在 Vercel 项目设置中绑定自定义域名，通过 Cloudflare DNS 代理。

---

## 🌍 绑定自定义域名

### 免费域名推荐：DigitalPlat

如果暂时不想花钱买域名，推荐 [DigitalPlat](https://dash.domain.digitalplat.org) 提供的免费域名服务：

- 完全免费，注册即可使用
- 支持 Cloudflare DNS
- 提供 `.us.kg` 等多种后缀

注册后在 DNS 设置中添加 CNAME 记录指向你的 Cloudflare Pages 地址即可。

> 如果后续需要更专业的形象，推荐购买正式域名（Cloudflare Registrar 或 Namesilo，价格透明无套路）。

### 在 Cloudflare Pages 绑定域名

1. 进入 Pages 项目 → **自定义域** → **设置自定义域**
2. 输入你的域名，Cloudflare 会自动配置 DNS
3. 等待生效后即可通过自定义域名访问

如果域名不在 Cloudflare，需要先迁移 DNS：在 Cloudflare 首页 → 添加站点 → 选择 Free 计划 → 按提示修改域名注册商的 NS 记录。

---

## 📅 日常更新流程

### 写新文章

1. 在 `apps/gkBlog/src/pages/blog/` 下创建新文件夹
2. 创建 `index.mdx`，写好 FrontMatter 和正文
3. 本地 `pnpm dev` 预览确认

### 发布文章

```bash
git add .
git commit -m "新文章：文章标题"
git push
```

也可以用 Trae 左侧的源代码管理面板可视化操作。推送后 Cloudflare Pages 会自动构建部署，通常 1-3 分钟后上线。

---

## ❓ 常见问题

### pnpm install 报错

```bash
pnpm config set registry https://registry.npmmirror.com
```

然后删除 `node_modules` 重新安装。

### pnpm dev 启动报错（prisma generate 失败）

```bash
cd apps/gkBlog
npx prisma generate
cd ../..
pnpm dev
```

### 构建时报错 output export 相关

本项目在生产环境使用静态导出模式，API 路由在生产构建时不可用，这是设计如此。如果最终成功产出了 `out` 目录，就没问题。

### 评论区不显示

1. 检查 `.env.production` 中是否正确填写了 `NEXT_PUBLIC_WALINE_SERVER_URL`
2. 直接在浏览器中访问你的 Waline 地址，看是否能正常打开
3. 如果在国内打不开 Vercel 地址，需要给 Waline 绑定自定义域名
4. 检查 Cloudflare Pages 环境变量中是否也设置了该变量
5. 查看浏览器控制台（F12 → Console）是否有报错

### 图片不显示

如果使用外部图片链接，需要在 `apps/gkBlog/next.config.mjs` 的 `images.domains` 数组中添加图片所在的域名。

### Cloudflare Pages 构建失败

- 确保环境变量中设置了 `NODE_VERSION` 为 `22`
- 确认构建命令是 `npx turbo run build`，输出目录是 `apps/gkBlog/out`
- 依赖安装失败可尝试重新触发部署

### git push 失败

检查网络连接。如果提示认证失败，需要配置 GitHub Personal Access Token（GitHub Settings → Developer settings → Personal access tokens）。

---

## 📜 License

本仓库遵循 [MIT License](LICENSE) 开源协议。
