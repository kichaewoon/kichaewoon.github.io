---
layout: page
title: "POPO: 대학생 개발자를 위한 포트폴리오 생성기"
description: >-
    대학생 개발자가 프로젝트 정보를 입력하면 LLM 이 포트폴리오를 자동 생성해주는 웹 플랫폼 개발. 현재 Fine tuning과 RAG 이용한 고도화 진행 중
img: assets/img/popo.png
period: 2025.03 - Present
lab: Personal Project (3인 팀)
demo_url: https://newpopo-front.vercel.app
github_url: 
github_front_url:
github_back_url:
pdf_url:
tech_stack: FastAPI, Next.js, OpenAI API, Llama 3.1, LoRA, RAG, Vector DB
highlights:
  - LLM 포트폴리오 생성 파이프라인
  - Llama 3.1 LoRA Fine-tuning
  - RAG 파이프라인 구축
  - FastAPI 백엔드 설계
order: 3
importance: 3
tags: [LLM Application, Fine-tuning, RAG]
---

## Overview

개발자 취업 시장에서 포트폴리오의 중요성이 높아지고 있지만, 막상 잘 쓰는 방법을 모르는 대학생 개발자가 많다는 문제를 직접 느끼며 시작한 프로젝트입니다. 프로젝트 정보를 입력하면 LLM이 포트폴리오를 자동으로 생성해주는 웹 플랫폼을 팀 프로젝트로 개발했으며, 저는 백엔드 전반을 담당했습니다. 현재는 범용 LLM의 한계를 극복하기 위해 LoRA Fine-tuning과 RAG 파이프라인을 이용한 고도화를 진행 중입니다.


## Problem & Task

대학생 개발자가 포트폴리오를 작성할 때 겪는 어려움은 크게 두 가지입니다. 첫째로 무엇을 어떻게 써야 할지 모른다는 것, 둘째로 입력 정보가 짧고 모호한 경우가 많다는 것입니다. LLM을 단순히 붙이면 입력이 부실할 때 hallucination이 발생하거나 결과물의 품질이 들쑥날쑥해지는 문제가 생깁니다.

해결해야 했던 목표는 두 가지입니다.

- 짧고 모호한 입력에서도 일관된 품질의 포트폴리오를 생성하는 백엔드 파이프라인 구현
- 범용 LLM의 포트폴리오 특화 표현 한계를 Fine-tuning과 RAG로 보완


## Approach

### [1단계 — 프롬프트 엔지니어링 기반 파이프라인 (백엔드 구현)]

사용자의 자유형 입력을 그대로 LLM에 넘기는 대신, **구조화된 컨텍스트로 변환한 뒤 프롬프트에 주입**하는 방식을 택했습니다. 입력을 정형화함으로써 모호한 입력에서 발생하는 hallucination을 줄이고 출력 일관성을 확보하는 것이 핵심 아이디어입니다.

### [2단계 — Fine-tuning + RAG 고도화 (진행 중)]

프롬프트 엔지니어링만으로는 포트폴리오 특화 표현의 품질을 높이는 데 한계가 있습니다. 이를 두 가지 방향으로 보완하고 있습니다.

- **LoRA Fine-tuning**: 포트폴리오 도메인 데이터를 수집해 Llama 3.1을 fine-tuning, 도메인 특화 표현 품질 개선
- **RAG**: 우수 포트폴리오 사례를 Vector DB에 저장하고 유사 사례를 검색해 생성 시 참조, 프롬프트만으로 커버하기 어려운 구체적 표현을 레퍼런스 기반으로 보완


## Implementation

### [전체 파이프라인]
```
사용자 입력 (자유형)
→ 구조화된 컨텍스트 변환
→ 프롬프트 주입 → OpenAI API 호출 → 포트폴리오 생성
(고도화) → RAG: Vector DB 유사 사례 검색 → 참조 주입
(고도화) → Llama 3.1 LoRA Fine-tuned 모델로 대체
```

### [직접 기여한 부분]

- 사용자 입력 → 구조화 컨텍스트 변환 파이프라인 설계
- FastAPI 기반 API 서버 아키텍처 설계 및 DB 스키마 구성
- OpenAI API 연동 및 프롬프트 엔지니어링
- Llama 3.1 LoRA Fine-tuning 파이프라인 구축 (진행 중)
- RAG 파이프라인 및 Vector DB 구축 (진행 중)


## Results

현재 백엔드 구현은 완료된 상태이며, Fine-tuning 및 RAG 고도화는 진행 중으로 정량적 수치 비교는 추후 업데이트 예정입니다.

- 구조화 프롬프트 파이프라인 적용으로 모호한 입력에서의 출력 일관성 확보
- FastAPI 백엔드 및 DB 설계 완료, OpenAI API 연동 완료
- Llama 3.1 LoRA Fine-tuning 및 RAG 파이프라인 구현 중

## Insights

### [배운점]

LLM을 서비스에 붙이는 것 자체보다, **입력을 어떻게 정형화하느냐**가 출력 품질에 훨씬 큰 영향을 미친다는 것을 체감했습니다. 또한 프롬프트 엔지니어링의 한계를 명확히 인식하게 되면서, Fine-tuning과 RAG가 각각 어떤 문제를 해결하는지 실제로 비교해볼 수 있는 좋은 기회가 되고 있습니다.

### [한계]

- Fine-tuning용 포트폴리오 데이터 수집 과정에서 품질 기준을 정의하기 어려웠습니다.
- 아직 정량적 평가 지표가 없어 개선 효과를 수치로 검증하지 못한 상태입니다. (현재 실험 중)

### [개선 방향]

- 생성 품질을 측정할 수 있는 자동 평가 지표(예: 사용자 만족도, 표현 다양성) 도입
- Fine-tuning vs RAG vs 프롬프트 엔지니어링 단독의 성능을 ablation study로 비교
- 사용자 피드백을 반영한 RLHF 방식 고도화 탐색
