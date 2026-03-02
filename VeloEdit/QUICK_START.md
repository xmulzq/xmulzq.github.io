# VeloEdit 快速使用指南

## ✅ 已完成

`script.js` 已自动更新，包含所有11个编辑效果的配置！

## 📋 当前配置的效果

1. Add a graffiti to the girl's face (21张)
2. Add flowers to the helmet (21张)
3. Convert to color image (21张)
4. Convert to pixel style (21张)
5. It is raining now (21张)
6. Make the bird fluffy (21张)
7. The lake is frozen (21张)
8. Turn into Van Gogh's style (21张)
9. Turn into a simple line drawing (21张)
10. Turn off the light (11张)
11. Turn the horse into a bronze horse (21张)

## 🎯 下一步：更新 HTML

你需要在 `index.html` 中添加滑杆。有两个选择：

### 选项 1: 使用现有的9个滑杆
如果你只想展示部分效果，可以修改现有的滑杆ID和配置名称。

例如，修改 `index.html` 中的：
```javascript
// 在 script.js 的 DOMContentLoaded 中
setupAutoSlider('strength-slider', 'result-image', "Turn into Van Gogh's style");
setupAutoSlider('light-slider-1', 'light-image-1', "Add a graffiti to the girl's face");
setupAutoSlider('light-slider-2', 'light-image-2', "Add flowers to the helmet");
// ... 等等
```

### 选项 2: 添加所有11个滑杆
从 `generated_config.txt` 复制所有HTML代码到 `index.html`。

## 🚀 测试

1. 打开 `index.html` 在浏览器中
2. 检查浏览器控制台是否有错误
3. 测试滑杆是否正常工作

## 🔧 故障排查

如果滑杆不工作：
1. 打开浏览器开发者工具 (F12)
2. 查看 Console 标签页
3. 检查是否有错误信息
4. 确认图片路径正确

## 📝 添加新效果的流程

以后添加新效果时：

```bash
# 1. 添加图片到 assets 文件夹
# 2. 运行配置生成工具
python3 generate_config.py assets

# 3. 工具会自动更新 generated_config.txt
# 4. 复制新的配置到 script.js（或让我帮你自动更新）
# 5. 在 index.html 中添加对应的滑杆
# 6. 刷新浏览器
```

## 💡 提示

- 所有配置都在 `IMAGE_CONFIGS` 对象中
- 每个效果的key（如 'Turn into Van Gogh\'s style'）必须与 `setupAutoSlider()` 中的第三个参数完全匹配
- 图片路径会自动生成，无需手动指定每张图片

## ✨ 完成！

现在你的 VeloEdit 项目已经配置好了所有11个编辑效果！
