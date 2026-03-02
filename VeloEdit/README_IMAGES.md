# VeloEdit 图片配置说明

## 自动检测功能

现在系统会**自动检测**文件夹中的图片数量，无需手动配置滑杆步数！

## 如何添加新的编辑效果

### 1. 准备图片文件夹

将你的图片放在 `assets/` 目录下，文件夹命名格式：
```
{Prompt名称}_{时间戳}
```

例如：
- `Turn off the light_20260302_174555`
- `Make it sunny_20260303_120000`

### 2. 图片命名规范

图片必须按以下格式命名：
```
{Prompt名称}_strength{强度值}.png
```

强度值范围：`0.00` 到 `1.00`

**支持的步长：**
- 0.01 (100张图片: 0.00, 0.01, 0.02, ..., 1.00)
- 0.05 (20张图片: 0.00, 0.05, 0.10, ..., 1.00)
- 0.10 (11张图片: 0.00, 0.10, 0.20, ..., 1.00)

**示例：**
```
Turn off the light_strength0.00.png
Turn off the light_strength0.10.png
Turn off the light_strength0.20.png
...
Turn off the light_strength1.00.png
```

### 3. 在 script.js 中添加配置

打开 `script.js`，在 `IMAGE_CONFIGS` 对象中添加新配置：

```javascript
const IMAGE_CONFIGS = {
    'Turn off the light': {
        folder: 'assets/Turn off the light_20260302_174555',
        prompt: 'Turn off the light',
        minStrength: 0.00,  // 最小强度值
        maxStrength: 1.00,  // 最大强度值
        step: 0.10,         // 步长
        count: 11           // 图片总数
    },
    // 添加新的配置
    'Make it sunny': {
        folder: 'assets/Make it sunny_20260303_120000',
        prompt: 'Make it sunny',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.05,
        count: 21
    },
    // 如果你的图片范围不是从0.00到1.00
    'Partial range example': {
        folder: 'assets/Partial_example',
        prompt: 'Partial example',
        minStrength: 0.20,  // 从0.20开始
        maxStrength: 0.80,  // 到0.80结束
        step: 0.05,
        count: 13           // (0.80 - 0.20) / 0.05 + 1 = 13
    }
};
```

**如何计算 count：**
- 标准范围 (0.00 到 1.00)：
  - 步长 0.10 → count = 11
  - 步长 0.05 → count = 21
  - 步长 0.01 → count = 101
  
- 自定义范围：
  - 公式：`count = (maxStrength - minStrength) / step + 1`
  - 例如：(0.80 - 0.20) / 0.05 + 1 = 13

### 4. 更新 HTML

在 `index.html` 中更新对应的示例：

```html
<!-- 修改 instruction -->
<div class="example-instruction">
    'Make it sunny'
</div>

<!-- 修改初始图片路径 -->
<img id="sunny-image" src="assets/Make it sunny_20260303_120000/Make it sunny_strength1.00.png" alt="Make it sunny Result" class="result-img">
```

在 `script.js` 中调用：
```javascript
setupAutoSlider('sunny-slider', 'sunny-image', 'Make it sunny');
```

## 工作原理

1. **自动检测步长**：系统会尝试 0.05、0.10、0.01 等常见步长
2. **生成映射**：自动创建滑杆位置到图片路径的映射
3. **反转顺序**：滑杆位置 0 = strength 1.00（最强效果），最后位置 = strength 0.00（原图）
4. **动态调整**：滑杆的 `max` 值会自动设置为图片数量-1

## 示例场景

### 场景 1: 11张图片 (步长 0.10)
```
文件夹中有 11 张图片
滑杆范围：0-10 (11个位置)
每滑动一次切换一张图片
```

### 场景 2: 20张图片 (步长 0.05)
```
文件夹中有 20 张图片
滑杆范围：0-19 (20个位置)
每滑动一次切换一张图片
```

### 场景 3: 100张图片 (步长 0.01)
```
文件夹中有 100 张图片
滑杆范围：0-99 (100个位置)
每滑动一次切换一张图片
```

## 注意事项

1. **文件命名必须严格遵循格式**：`{Prompt}_strength{X}.{Y}.png`
2. **强度值必须是两位小数**：如 `0.00`、`0.50`、`1.00`
3. **图片必须连续**：不能跳过某个强度值
4. **至少需要5张图片**：系统才能正确检测

## 故障排查

如果滑杆不工作：
1. 检查浏览器控制台是否有错误
2. 确认图片命名格式正确
3. 确认 `IMAGE_CONFIGS` 中的配置正确
4. 确认文件夹路径正确
5. 确认图片文件存在

## 优势

✅ **完全自动化**：无需手动计算图片数量
✅ **灵活支持**：支持任意数量的图片（5-100+）
✅ **易于扩展**：添加新效果只需修改配置
✅ **智能检测**：自动识别步长和图片数量
