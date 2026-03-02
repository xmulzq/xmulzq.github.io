#!/usr/bin/env python3
"""
图片裁剪工具 - 从顶部裁剪以匹配目标分辨率
"""

from PIL import Image
import os
import sys
from pathlib import Path

def get_reference_size(reference_image_path):
    """获取参考图片的尺寸"""
    try:
        img = Image.open(reference_image_path)
        return img.size
    except Exception as e:
        print(f"❌ 无法读取参考图片: {e}")
        return None

def crop_from_top(image_path, target_width, target_height, output_path=None):
    """
    从顶部裁剪图片以匹配目标尺寸
    
    Args:
        image_path: 输入图片路径
        target_width: 目标宽度
        target_height: 目标高度
        output_path: 输出路径（如果为None，则覆盖原文件）
    """
    try:
        img = Image.open(image_path)
        current_width, current_height = img.size
        
        # 计算需要裁剪的高度
        crop_height = current_height - target_height
        
        if crop_height < 0:
            print(f"⚠️  {os.path.basename(image_path)}: 图片高度不足，无法裁剪")
            return False
        
        if current_width != target_width:
            print(f"⚠️  {os.path.basename(image_path)}: 宽度不匹配 ({current_width} vs {target_width})")
            # 如果宽度也不匹配，可以选择居中裁剪
            if current_width > target_width:
                left = (current_width - target_width) // 2
                right = left + target_width
            else:
                print(f"❌ {os.path.basename(image_path)}: 宽度不足")
                return False
        else:
            left = 0
            right = current_width
        
        # 从顶部裁剪：去除顶部的 crop_height 像素
        top = crop_height
        bottom = current_height
        
        # 执行裁剪
        cropped_img = img.crop((left, top, right, bottom))
        
        # 保存
        if output_path is None:
            output_path = image_path
        
        cropped_img.save(output_path)
        
        return True
        
    except Exception as e:
        print(f"❌ 处理 {os.path.basename(image_path)} 时出错: {e}")
        return False

def main():
    if len(sys.argv) < 3:
        print("用法: python crop_images.py <参考图片路径> <目标文件夹路径>")
        print("示例: python crop_images.py reference.jpg assets/folder/")
        sys.exit(1)
    
    reference_path = sys.argv[1]
    target_folder = sys.argv[2]
    
    print("=" * 60)
    print("图片裁剪工具 - 从顶部裁剪")
    print("=" * 60)
    print()
    
    # 获取参考图片尺寸
    print(f"📏 读取参考图片: {reference_path}")
    target_size = get_reference_size(reference_path)
    
    if target_size is None:
        sys.exit(1)
    
    target_width, target_height = target_size
    print(f"✅ 目标分辨率: {target_width} x {target_height}")
    print()
    
    # 获取目标文件夹中的所有PNG图片
    folder_path = Path(target_folder)
    if not folder_path.exists():
        print(f"❌ 文件夹不存在: {target_folder}")
        sys.exit(1)
    
    image_files = sorted(folder_path.glob("*.png"))
    
    if not image_files:
        print(f"❌ 文件夹中没有PNG图片: {target_folder}")
        sys.exit(1)
    
    print(f"📁 找到 {len(image_files)} 张图片")
    print()
    
    # 处理每张图片
    success_count = 0
    fail_count = 0
    
    for i, image_file in enumerate(image_files, 1):
        print(f"[{i}/{len(image_files)}] 处理: {image_file.name}")
        
        # 显示原始尺寸
        try:
            img = Image.open(image_file)
            original_size = img.size
            print(f"    原始尺寸: {original_size[0]} x {original_size[1]}")
            img.close()
        except:
            pass
        
        # 裁剪
        if crop_from_top(str(image_file), target_width, target_height):
            print(f"    ✅ 裁剪完成: {target_width} x {target_height}")
            success_count += 1
        else:
            fail_count += 1
        
        print()
    
    # 总结
    print("=" * 60)
    print("处理完成")
    print("=" * 60)
    print(f"✅ 成功: {success_count} 张")
    print(f"❌ 失败: {fail_count} 张")
    print()

if __name__ == "__main__":
    main()
