# Client feedback screenshots / 客户反馈截图

[English](#english) · [中文](#中文)

## English

This folder feeds the **"What clients told us" / 客户反馈** section on the Projects page (both languages).
The section is **hidden until at least one real screenshot is in this folder.**

### Rules

- Only real messages from real clients (email, WhatsApp, WeChat, LinkedIn, a review site). Never write,
  edit or "improve" a client's words, and never add star ratings or numbers that are not in the original.
- Get the client's permission before publishing.
- Blur or crop out personal data: phone numbers, email addresses, faces, order numbers, prices, and
  anything the client did not agree to show.

### How to add one

1. Save the screenshot as **WebP**, about **800 px wide** and **under 150 KB**
   (for example with squoosh.app). Use a simple file name with no spaces, e.g. `us-distributor-2026-03.webp`.
2. Put the file in this folder (`assets/testimonials/`).
3. Add a caption for it to `captions.json`, using the exact file name as the key:

   ```json
   "us-distributor-2026-03.webp": {
     "en": "Message from a US distributor after launch",
     "zh": "网站上线后美国经销商发来的留言"
   }
   ```

   The caption is shown under the image and is also its alt text. Keep it short and factual.
   Chinese captions must follow the Advertising Law: no 最 / 第一 / 唯一 / 顶级 / 首选 / 100% (the build stops if one appears).
4. Commit and push. The section appears on the next deploy. Image width and height are read from the file automatically.

To remove a screenshot, delete the image file (and its entry in `captions.json`).
An entry in `captions.json` whose image is missing is simply ignored. That is why the
`example-client-message.webp` entry is safe to leave in place.

## 中文

本文件夹用于项目案例页（中英文）的 **“客户反馈 / What clients told us”** 板块。
**文件夹里没有真实截图时，该板块不会显示。**

### 规则

- 只放真实客户的真实留言（邮件、WhatsApp、微信、LinkedIn、点评网站等）。不得编写、修改或“润色”客户原话，
  也不要添加原文中没有的星级评分或数字。
- 发布前请先征得客户同意。
- 请打码或裁掉个人信息：电话、邮箱、头像/人脸、订单号、价格，以及客户未同意公开的任何内容。

### 添加步骤

1. 把截图保存为 **WebP** 格式，宽度约 **800 像素**，大小 **不超过 150 KB**（可用 squoosh.app 压缩）。
   文件名用英文、不要有空格，例如 `us-distributor-2026-03.webp`。
2. 把文件放进本文件夹（`assets/testimonials/`）。
3. 在 `captions.json` 中为它添加说明，键名必须与文件名完全一致：

   ```json
   "us-distributor-2026-03.webp": {
     "en": "Message from a US distributor after launch",
     "zh": "网站上线后美国经销商发来的留言"
   }
   ```

   说明文字显示在图片下方，同时作为图片的替代文本（alt）。请简短、如实。
   中文说明须符合《广告法》：不要使用 最 / 第一 / 唯一 / 顶级 / 首选 / 100% 等词（出现时构建会失败）。
4. 提交并推送。下次部署后板块就会出现。图片宽高会自动从文件读取。

删除截图：删除图片文件（以及 `captions.json` 中对应的条目）即可。
`captions.json` 中找不到对应图片的条目会被自动忽略，所以示例条目 `example-client-message.webp` 可以保留。
