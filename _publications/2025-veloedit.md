---
title: "VeloEdit: A Training-Free Consistent and Continuous Image Editing Method via Velocity Field Decomposition"
collection: publications
category: conferences
permalink: /publication/2025-veloedit
excerpt: 'We propose VeloEdit, a training-free framework for consistency-preserving and continuous image editing by decomposing and manipulating the velocity field in diffusion models.'
date: 2025-01-01
venue: 'European Conference on Computer Vision (ECCV)'
paperurl: '/VeloEdit/'
citation: 'Zongqing Li, Zhihui Liu, Songzhi Su. (2025). &quot;VeloEdit: A Training-Free Consistent and Continuous Image Editing Method via Velocity Field Decomposition.&quot; <i>ECCV 2025</i>.'
---

## Abstract

As powerful generative paradigms, diffusion models have garnered significant attention across domains such as image, audio, and video synthesis. With the evolution of generative capabilities, a growing body of research has focused on extending these models' functionalities; in particular, instruction-based image editing has drawn considerable interest due to its potential to modify source images based on specific prompts. However, owing to the stochastic nature of the latent diffusion process and the inherent limitations of current editing models, it remains challenging to preserve visual consistency in non-edited regions. Furthermore, achieving continuous control over the intensity of instruction-based editing proves difficult.

In this paper, we propose **VeloEdit**, a training-free framework designed for consistency-preserving and continuous image editing. Given a specific editing instruction, VeloEdit automatically delineates the preservation and editing regions by evaluating the similarity between the velocity fields of the source and edited images. Specifically, in the preservation regions, the editing velocity is overridden by the source velocity to ensure consistency. Conversely, within the editing regions, we employ smooth interpolation between the source and editing velocities to modulate the editing intensity, yielding a series of continuously and smoothly edited results.

Distinct from prior approaches that manipulate complex internal attention mechanisms or introduce trainable slider-based attribute controllers, our method revisits the fundamental velocity field intrinsic to diffusion models. We apply VeloEdit to state-of-the-art image editing models, including **FLUX.1 Kontext** and **Qwen-Image-Edit-2509**, observing significant improvements in both visual consistency and editing controllability.

## Key Contributions

- **Training-Free**: No additional training or fine-tuning required
- **Consistency Preservation**: Automatically identifies and preserves non-edited regions
- **Continuous Control**: Enables smooth, multi-intensity editing results
- **Universal Applicability**: Works with various diffusion-based editing models

## Links

- [Project Page](/VeloEdit/)
- Code (Coming Soon)
- Paper (Coming Soon)

**Keywords**: Diffusion Models, Image Editing, Velocity Field, Consistency, Continuity
