#!/usr/bin/env python3
"""
VeloEdit 配置生成工具
自动扫描图片文件夹并生成JavaScript配置代码
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict

def scan_image_folder(folder_path):
    """
    扫描文件夹中的图片文件
    返回: {
        'prompt': str,
        'images': [{'strength': float, 'filename': str}],
        'min_strength': float,
        'max_strength': float,
        'step': float,
        'count': int
    }
    """
    folder_path = Path(folder_path)
    
    if not folder_path.exists():
        raise FileNotFoundError(f"文件夹不存在: {folder_path}")
    
    # 从文件夹名提取prompt（去掉时间戳部分）
    folder_name = folder_path.name
    prompt = re.sub(r'_\d{8}_\d{6}$', '', folder_name)
    
    # 扫描所有PNG文件
    images = []
    pattern = re.compile(r'(.+)_strength(\d+\.\d+)\.png$')
    
    for file in folder_path.glob('*.png'):
        match = pattern.match(file.name)
        if match:
            file_prompt = match.group(1)
            strength = float(match.group(2))
            images.append({
                'strength': strength,
                'filename': file.name
            })
    
    if not images:
        raise ValueError(f"文件夹中没有找到符合格式的图片: {folder_path}")
    
    # 排序
    images.sort(key=lambda x: x['strength'])
    
    # 计算参数
    strengths = [img['strength'] for img in images]
    min_strength = min(strengths)
    max_strength = max(strengths)
    count = len(images)
    
    # 计算步长（取前两个图片的差值）
    if count > 1:
        step = round(strengths[1] - strengths[0], 2)
    else:
        step = 0.0
    
    return {
        'prompt': prompt,
        'folder': str(folder_path.relative_to(folder_path.parent.parent)),
        'images': images,
        'min_strength': min_strength,
        'max_strength': max_strength,
        'step': step,
        'count': count
    }

def generate_js_config(scan_result):
    """生成JavaScript配置代码"""
    config = f"""    '{scan_result['prompt']}': {{
        folder: '{scan_result['folder']}',
        prompt: '{scan_result['prompt']}',
        minStrength: {scan_result['min_strength']:.2f},
        maxStrength: {scan_result['max_strength']:.2f},
        step: {scan_result['step']:.2f},
        count: {scan_result['count']}
    }}"""
    return config

def generate_html_slider(scan_result, slider_id='new-slider', image_id='new-image'):
    """生成HTML滑杆代码"""
    max_index = scan_result['count'] - 1
    initial_image = f"{scan_result['folder']}/{scan_result['prompt']}_strength{scan_result['max_strength']:.2f}.png"
    
    html = f"""<!-- Example: {scan_result['prompt']} -->
<div class="example-tile">
    <div class="example-instruction">
        '{scan_result['prompt']}'
    </div>
    <div class="example-slider-container">
        <div class="slider-container">
            <span class="strength-label">0.0</span>
            <input type="range" id="{slider_id}" class="strength-slider" min="0" max="{max_index}" value="0" step="1">
            <span class="strength-label">1.0</span>
        </div>
    </div>
    <div class="example-result">
        <img id="{image_id}" src="{initial_image}" alt="{scan_result['prompt']} Result" class="result-img">
    </div>
</div>"""
    return html

def generate_js_setup(scan_result, slider_id='new-slider', image_id='new-image'):
    """生成JavaScript setup调用代码"""
    return f"    setupAutoSlider('{slider_id}', '{image_id}', \"{scan_result['prompt']}\");"

def main():
    import sys
    
    print("=" * 60)
    print("VeloEdit 配置生成工具")
    print("=" * 60)
    print()
    
    # 获取assets目录
    if len(sys.argv) > 1:
        assets_dir = Path(sys.argv[1])
    else:
        # 默认路径
        assets_dir = Path(__file__).parent / 'assets'
    
    if not assets_dir.exists():
        print(f"❌ Assets目录不存在: {assets_dir}")
        print(f"用法: python {sys.argv[0]} <assets目录路径>")
        return
    
    print(f"📁 扫描目录: {assets_dir}")
    print()
    
    # 扫描所有子文件夹
    configs = []
    for folder in sorted(assets_dir.iterdir()):
        if folder.is_dir():
            try:
                print(f"🔍 扫描: {folder.name}")
                result = scan_image_folder(folder)
                configs.append(result)
                print(f"   ✅ 找到 {result['count']} 张图片")
                print(f"   📊 范围: {result['min_strength']:.2f} - {result['max_strength']:.2f}")
                print(f"   📏 步长: {result['step']:.2f}")
                print()
            except Exception as e:
                print(f"   ⚠️  跳过: {e}")
                print()
    
    if not configs:
        print("❌ 没有找到任何有效的图片文件夹")
        return
    
    print("=" * 60)
    print("生成的配置代码")
    print("=" * 60)
    print()
    
    # 生成JavaScript配置
    print("📝 JavaScript 配置 (添加到 script.js 的 IMAGE_CONFIGS):")
    print()
    print("const IMAGE_CONFIGS = {")
    for i, config in enumerate(configs):
        print(generate_js_config(config))
        if i < len(configs) - 1:
            print(",")
    print("};")
    print()
    
    # 生成HTML代码
    print("=" * 60)
    print("📝 HTML 滑杆代码 (添加到 index.html):")
    print("=" * 60)
    print()
    for i, config in enumerate(configs):
        slider_id = f"slider-{i+1}"
        image_id = f"image-{i+1}"
        print(generate_html_slider(config, slider_id, image_id))
        print()
    
    # 生成JavaScript setup代码
    print("=" * 60)
    print("📝 JavaScript Setup 代码 (添加到 DOMContentLoaded):")
    print("=" * 60)
    print()
    for i, config in enumerate(configs):
        slider_id = f"slider-{i+1}"
        image_id = f"image-{i+1}"
        print(generate_js_setup(config, slider_id, image_id))
    print()
    
    # 保存到文件
    output_file = Path(__file__).parent / 'generated_config.txt'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("=" * 60 + "\n")
        f.write("VeloEdit 自动生成的配置\n")
        f.write("=" * 60 + "\n\n")
        
        f.write("JavaScript 配置:\n")
        f.write("-" * 60 + "\n")
        f.write("const IMAGE_CONFIGS = {\n")
        for i, config in enumerate(configs):
            f.write(generate_js_config(config))
            if i < len(configs) - 1:
                f.write(",\n")
        f.write("\n};\n\n")
        
        f.write("=" * 60 + "\n")
        f.write("HTML 滑杆代码:\n")
        f.write("=" * 60 + "\n\n")
        for i, config in enumerate(configs):
            slider_id = f"slider-{i+1}"
            image_id = f"image-{i+1}"
            f.write(generate_html_slider(config, slider_id, image_id))
            f.write("\n\n")
        
        f.write("=" * 60 + "\n")
        f.write("JavaScript Setup 代码:\n")
        f.write("=" * 60 + "\n\n")
        for i, config in enumerate(configs):
            slider_id = f"slider-{i+1}"
            image_id = f"image-{i+1}"
            f.write(generate_js_setup(config, slider_id, image_id))
            f.write("\n")
    
    print(f"✅ 配置已保存到: {output_file}")
    print()
    print("=" * 60)
    print("使用说明:")
    print("=" * 60)
    print("1. 复制上面的 JavaScript 配置到 script.js")
    print("2. 复制 HTML 滑杆代码到 index.html")
    print("3. 复制 JavaScript Setup 代码到 DOMContentLoaded 函数中")
    print("4. 刷新浏览器查看效果")
    print()

if __name__ == '__main__':
    main()
