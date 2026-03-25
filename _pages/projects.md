---
layout: page
title: projects
permalink: /projects/
description: A collection of my projects. Use the chips to filter by technology and project type.
nav: true
nav_order: 2
horizontal: true
---

<!-- pages/projects.md -->
<div class="projects">
  {% assign sorted_projects = site.projects | sort: "order" %}
  {% assign all_project_tags = "" | split: "," %}
  {% for project in sorted_projects %}
    {% if project.tags %}
      {% for tag in project.tags %}
        {% unless all_project_tags contains tag %}
          {% assign all_project_tags = all_project_tags | push: tag %}
        {% endunless %}
      {% endfor %}
    {% endif %}
  {% endfor %}
  {% assign all_project_tags = all_project_tags | sort %}
  {% assign project_tags = "LLM/Agent|Personalization/Recommendation|Research|ML/DL|LLM Application|Data/System Engineering" | split: "|" %}

  {% if all_project_tags.size > 0 %}
    <div class="project-filters" aria-label="Project filters">
      <div class="project-filter-row">
        <span class="project-filter-label">Tags:</span>
        {% for tag in project_tags %}
          {% if all_project_tags contains tag %}
            <button class="project-filter-chip" type="button" data-filter-tag="{{ tag }}">{{ tag }}</button>
          {% endif %}
        {% endfor %}
      </div>
      <button class="project-filter-clear d-none" type="button">Clear filters</button>
    </div>
  {% endif %}

  {% if page.horizontal %}
  <div class="container px-0">
    <div class="row row-cols-1 project-list">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
</div>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const chips = Array.from(document.querySelectorAll(".project-filter-chip"));
    const clearButton = document.querySelector(".project-filter-clear");
    const items = Array.from(document.querySelectorAll(".project-list-item"));
    const activeTags = new Set();

    if (!chips.length || !items.length) return;

    const render = () => {
      items.forEach((item) => {
        const tags = (item.dataset.tags || "")
          .split("|")
          .map((tag) => tag.trim())
          .filter(Boolean);
        const isVisible = activeTags.size === 0 || Array.from(activeTags).every((tag) => tags.includes(tag));
        item.classList.toggle("d-none", !isVisible);
      });

      chips.forEach((chip) => {
        chip.classList.toggle("is-active", activeTags.has(chip.dataset.filterTag));
      });

      if (clearButton) {
        clearButton.classList.toggle("d-none", activeTags.size === 0);
      }
    };

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const tag = chip.dataset.filterTag;
        if (activeTags.has(tag)) {
          activeTags.delete(tag);
        } else {
          activeTags.add(tag);
        }
        render();
      });
    });

    if (clearButton) {
      clearButton.addEventListener("click", () => {
        activeTags.clear();
        render();
      });
    }
  });
</script>
