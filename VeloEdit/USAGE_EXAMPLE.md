# VeloEdit 使用示例

## 完整示例：添加"Make it rainy"效果

### 步骤 1: 准备图片文件

假设你有15张图片，strength从0.00到0.70，步长0.05：

```
assets/Make it rainy_20260303_100000/
├── Make it rainy_strength0.00.png
├── Make it rainy_strength0.05.png
├── Make it rainy_strength0.10.png
├── Make it rainy_strength0.15.png
├── Make it rainy_strength0.20.png
├── Make it rainy_strength0.25.png
├── Make it rainy_strength0.30.png
├── Make it rainy_strength0.35.png
├── Make it rainy_strength0.40.png
├── Make it rainy_strength0.45.png
├── Make it rainy_strength0.50.png
├── Make it rainy_strength0.55.png
├── Make it rainy_strength0.60.png
├── Make it rainy_strength0.65.png
└── Make it rainy_strength0.70.png
```

### 步骤 2: 修改 script.js

在 `IMAGE_CONFIGS` 中添加配置：

```javascript
const IMAGE_CONFIGS = {
    'Turn off the light': {
        folder: 'assets/Turn off the light_20260302_174555',
        prompt: 'Turn off the light',
        minStrength: 0.00,
        maxStrength: 1.00,
        step: 0.10,
        count: 11
    },
    // 新增配置
    'Make it rainy': {
        folder: 'assets/Make it rainy_20260303_100000',
        prompt: 'Make it rainy',
        minStrength: 0.00,  // 最小值
        maxStrength: 0.70,  // 最大值
        step: 0.05,         // 步长
        count: 15           // 图片数量: (0.70 - 0.00) / 0.05 + 1 = 15
    }
};
```

在文件末尾添加滑杆设置：

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // ... 现有代码 ...
    
    // 添加新的滑杆
    setupAutoSlider('rainy-slider', 'rainy-image', 'Make it rainy');
});
```

### 步骤 3: 修改 index.html

在任意 `<section class="interactive-examples">` 中添加：

```html
<!-- Example: Make it rainy -->
<div class="example-tile">
    <div class="example-instruction">
        'Make it rainy'
    </div>
    <div class="example-slider-container">
        <div class="slider-container">
            <span class="strength-label">0.0</span>
            <input type="range" id="rainy-slider" class="strength-slider" min="0" max="14" value="0" step="1">
            <span class="strength-label">1.0</span>
        </div>
    </div>
    <div class="example-result">
        <img id="rainy-image" src="assets/Make it rainy_20260303_100000/Make it rainy_strength0.70.png" alt="Make it rainy Result" class="result-img">
    </div>
</div>
```

**注意：**
- `max="14"` 是占位值，JavaScript会自动更新为正确的值（count - 1 = 14）
- 初始图片使用最高强度：`strength0.70.png`

### 步骤 4: 测试

打开网页，你会看到：
- 滑杆有15个位置（0-14）
- 位置 0 显示 `strength0.70.png`（最强效果）
- 位置 14 显示 `strength0.00.png`（原图）
- 每滑动一次切换一张图片

---

## 更多示例

### 示例 1: 标准范围，11张图片

```javascript
'Turn off the light': {
    folder: 'assets/Turn off the light_20260302_174555',
    prompt: 'Turn off the light',
    minStrength: 0.00,
    maxStrength: 1.00,
    step: 0.10,
    count: 11  // 0.00, 0.10, 0.20, ..., 1.00
}
```

### 示例 2: 部分范围，13张图片

```javascript
'Increase brightness': {
    folder: 'assets/Increase brightness_20260303_120000',
    prompt: 'Increase brightness',
    minStrength: 0.20,
    maxStrength: 0.80,
    step: 0.05,
    count: 13  // 0.20, 0.25, 0.30, ..., 0.80
}
```

### 示例 3: 高密度，101张图片

```javascript
'Add snow': {
    folder: 'assets/Add snow_20260303_130000',
    prompt: 'Add snow',
    minStrength: 0.00,
    maxStrength: 1.00,
    step: 0.01,
    count: 101  // 0.00, 0.01, 0.02, ..., 1.00
}
```

---

## 快速检查清单

✅ 图片文件命名正确：`{Prompt}_strength{X}.{Y}.png`
✅ 图片放在正确的文件夹中
✅ `IMAGE_CONFIGS` 中添加了配置
✅ `minStrength`、`maxStrength`、`step`、`count` 计算正确
✅ HTML中添加了对应的滑杆和图片元素
✅ JavaScript中调用了 `setupAutoSlider()`
✅ 初始图片路径指向最高强度的图片

---

## 常见问题

**Q: 如何计算 count？**
A: `count = (maxStrength - minStrength) / step + 1`

**Q: 滑杆的 max 值应该设置为多少？**
A: 设置为任意值（如10），JavaScript会自动更新为 `count - 1`

**Q: 初始图片应该用哪张？**
A: 使用最高强度的图片，例如 `strength1.00.png` 或 `strength0.70.png`

**Q: 图片必须从0.00开始吗？**
A: 不需要！可以从任意值开始，比如0.20、0.50等

**Q: 支持多少张图片？**
A: 理论上无限制，但建议5-200张之间以保证性能
