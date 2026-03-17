---
title: "VeloEdit: Training-Free Consistent and Continuous Instruction-Based Image Editing via Velocity Field Decomposition"
collection: publications
category: conferences
permalink: /publication/2026-veloedit
excerpt: 'We propose VeloEdit, a training-free method for image editing. By decomposing and manipulating the velocity field in diffusion models, it achieves **consistency-preserving** and **continuously controllable** image editing.'
date: 2026-02-16
venue: ' Under Review'
# paperurl: '/VeloEdit/'
citation: 'Zongqing Li, Zhihui Liu, Yujie Xie, et al. VeloEdit: Training-Free Consistent and Continuous Instruction-Based Image Editing via Velocity Field Decomposition. TechRxiv. February 16, 2026.'
---

## Abstract

Instruction-based image editing aims to modify source content according to textual instructions. However, existing methods built upon flow matching often struggle to maintain consistency in non-edited regions due to denoising-induced reconstruction errors that cause drift in preserved content. Moreover, they typically lack fine-grained control over edit strength. To address these limitations, we propose VeloEdit, a training-free method that enables highly consistent and continuously controllable editing. VeloEdit dynamically identifies editing regions by quantifying the discrepancy between the velocity fields responsible for preserving source content and those driving the desired edits. Based on this partition, we enforce consistency in preservation regions by substituting the editing velocity with the source-restoring velocity, while enabling continuous modulation of edit intensity in target regions via velocity interpolation. Unlike prior works that rely on complex attention manipulation or auxiliary trainable modules, VeloEdit operates directly on the velocity fields. Extensive experiments on Flux.1 Kontext and Qwen-Image-Edit demonstrate that VeloEdit improves visual consistency and editing continuity with negligible additional computational cost.

## Key Contributions

- **Training-Free**: No additional training or fine-tuning required
- **Consistency Preservation**: Automatically identifies and preserves non-edited regions
- **Continuous Control**: Enables smooth, multi-intensity editing results
- **Universal Applicability**: Works with various diffusion-based editing models

## Links

- [Project Page](/VeloEdit/)
- [Code](https://github.com/xmulzq/VeloEdit)
- [Paper](https://arxiv.org/abs/2603.13388)

**Keywords**: Image Editing, Consistency, Continuity
