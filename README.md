# Chaewoon Ki Portfolio Website

Personal portfolio website for Chaewoon Ki, built with Jekyll and customized on top of the `al-folio` theme.

The site introduces my background, research interests, and selected projects in AI systems, LLM applications, personalization, and machine learning.

## Live Site

- Website: <https://71c1nw00n.github.io/>

## Overview

This website is designed to present:

- A short academic profile and background
- Research interests in LLM memory, context-aware reasoning, and practical AI systems
- Project pages with detailed write-ups on motivation, approach, implementation, results, and lessons learned
- A publications page for future research outputs

The current site includes:

- `About` page as the landing page
- `Projects` page with filter chips by topic
- `Publications` page placeholder

## Featured Projects

Some of the projects currently highlighted on the site are:

1. `Personalized Web Agent`
   Research on a personalized web agent that infers user preferences from browsing history and performs ambiguous web tasks using structured memory.

2. `Protein Representation Learning for Drug Discovery`
   Research experience on graph-based protein representation learning and GPCR activity prediction using Graph Autoencoders and Transformer-based models.

3. `POPO`
   A portfolio generation platform for student developers using LLMs, prompt engineering, LoRA fine-tuning, and RAG.

4. `Fitfor`
   An adaptive exercise recommendation platform for wheelchair users, built from user interviews and structured LLM-based recommendation pipelines.

5. `FOSSLight Scanner`
   A CLI tool for recursively analyzing licenses and dependencies of open-source AI models and datasets from Hugging Face and GitHub URLs.

6. `Separate and Reconstruct`
   A speech separation project that improves mixed human-animal audio separation through custom data construction and SepReformer retraining.

## Tech Stack

- `Jekyll`
- `Liquid`
- `SCSS`
- `Bootstrap`
- `Docker` for local development
- `GitHub Pages` for hosting
- `al-folio` as the base theme

## Local Development

This repository is set up for local development with Docker.

### Run the site

```bash
docker compose pull
docker compose up
```

The site will be available at:

- <http://localhost:8080>

### Rebuild after dependency or Docker changes

```bash
docker compose up --build
```

### Stop the local server

```bash
docker compose down
```

## Repository Structure

Key files and directories:

- [`_pages/`](_pages/) : top-level site pages such as `about`, `projects`, and `publications`
- [`_projects/`](_projects/) : individual project write-ups
- [`_layouts/`](_layouts/) : page layouts and reusable page structure
- [`_includes/`](_includes/) : shared Liquid components such as the header and project cards
- [`_sass/`](_sass/) : custom styling
- [`assets/`](assets/) : images, PDFs, and other static assets
- [`_config.yml`](_config.yml) : main site configuration

## Content Notes

- The landing page content is written in [`_pages/about.md`](_pages/about.md).
- Project cards and detailed project pages are maintained in [`_projects/`](_projects/).
- The publications page currently contains a placeholder and will be expanded later.

## Customization Focus

Compared with the original `al-folio` theme, this repository is customized around:

- A project-first portfolio structure
- Detailed long-form project case studies
- Customized project detail layouts and metadata sections
- Typography and header styling updates
- Tag-based project filtering on the projects page

## Credits

- Base theme: [`al-folio`](https://github.com/alshedivat/al-folio)
- Static site generator: [`Jekyll`](https://jekyllrb.com/)
- Hosting: [`GitHub Pages`](https://pages.github.com/)

