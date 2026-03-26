---
layout: page
title: "FOSSLight Scanner: 오픈소스 모델/데이터셋의 라이선스 및 의존성 자동 분석 도구 개발"
description: >-
    AI 개발 시 사용하는 오픈소스 모델·데이터셋의 라이선스를 수동으로 검증하는 비효율을 해소하기 위해, Hugging Face/GitHub URL 입력만으로 의존성을 재귀적으로 탐색하고 라이선스를 자동 분석하는 CLI 도구 개발
img: "https://logowik.com/content/uploads/images/fosslight7927.logowik.com.webp"
period: 2025.09 - 2025.12
lab: 졸업 프로젝트 (2인 팀)
demo_url: 
github_url: 
github_front_url:
github_back_url:
pdf_url:
tech_stack: Python, LLM, HuggingFace API, GItHubAPI
highlights:

order: 5
importance: 5
tags: [LLM Application]
---


<iframe
  src="/assets/pdf/fosslight.pdf"
  width="100%"
  height="700"
  style="border: 1px solid #ddd; border-radius: 8px;"
>
</iframe>

## Overview

KAIST 전산학부 졸업연구인 전산학 프로젝트 수업의 팀 프로젝트로, AI 개발 시 활용하는 오픈소스 모델·데이터셋의 라이선스를 자동으로 분석하는 CLI 도구를 개발했습니다. Hugging Face 또는 GitHub URL 하나만 입력하면 README 분석과 링크 추적을 통해 의존성을 재귀적으로 탐색하고, 모든 출처의 라이선스 정보를 종합 제공합니다. 저는 **LLM 기반 README 분석 모듈 구현**과 **평가 체계 구축**을 담당했습니다.

## Problem & Task

오픈소스 모델과 데이터셋은 외부 데이터셋 참조, 베이스 모델 인용, 파생 버전 배포 등으로 의존성이 복잡하게 중첩됩니다. 이로 인해 개발자가 모든 출처의 라이선스를 수동으로 식별하고 검증하는 과정이 매우 비효율적이며, 검증을 누락할 경우 재현성 저하나 법적 리스크로 이어질 수 있습니다.

이 문제를 해결하기 위해 URL 입력 하나만으로 의존성 트리 전체를 재귀적으로 탐색하고 라이선스를 자동 분석하는 도구를 개발하고자 했습니다. 제가 해결해야 했던 목표는 두 가지입니다.

- 비정형 README에서 신뢰성 있게 의존성 정보를 추출하는 분석 모듈 구현
- 구축한 시스템의 성능을 정량적으로 검증할 수 있는 평가 체계 설계

## Approach

README 파일은 프로젝트마다 형식이 제각각이라 정규식 기반 파싱으로는 일관된 추출이 어렵습니다. 이를 해결하기 위해 **LLM 기반 분석 모듈**을 채택했습니다. 비정형·다형식 README를 LLM에 입력해 참조 데이터셋과 모델을 식별하고, 그 결과를 재귀적 탐색 파이프라인과 연결해 중첩된 의존성 전체를 추적하는 구조를 설계했습니다.

평가를 위해서는 오픈소스 URL과 실제 라이선스 정보를 직접 수집해 JSON 테스트케이스셋을 구축하고, 분석 결과와 비교해 정량 지표를 산출하는 체계를 마련했습니다.

## Implementation

### [전체 파이프라인]
```
사용자 URL 입력 (Hugging Face / GitHub)
→ README 분석 (LLM 기반 의존성 식별)
→ 링크 추적 및 재귀적 의존성 탐색
→ 라이선스 정보 추출 및 통합
→ JSON / CSV 형태로 결과 제공
```

### [직접 기여한 부분]

- **LLM 기반 README 분석 모듈**: 비정형 README에서 참조 데이터셋·모델을 식별하고 라이선스·의존성 정보를 종합 추출
- **재귀적 의존성 탐색 파이프라인 설계**: URL 입력 시 링크 추적으로 중첩된 의존성 전체를 한 번에 탐색하도록 구조화
- **평가 체계 구축**: JSON 테스트케이스 50개를 직접 수집·구축하여 Accuracy, Precision, Recall, F1 Score 기반 성능 검증 수행

## Results

- 라이선스 분석 정확도: **Accuracy 95.24%, Precision 100%, Recall 95.24%, F1 Score 97.56%**
- 총 63개 테스트케이스 중 60개 통과 (Main+References 기준)
- 복잡하게 중첩된 오픈소스 의존성을 URL 입력 하나로 전체 추적하는 파이프라인 구현 완료 및 데모 시연

## Insights

### [배운점]

정규식이나 구조적 파싱이 당연해 보이는 상황에서도, 입력 데이터의 다양성을 먼저 파악하고 도구를 선택해야 한다는 것을 배웠습니다. README의 형식이 워낙 제각각이라 LLM 기반 접근이 실질적으로 더 강건한 선택이었고, 이처럼 문제의 특성에 맞게 기술 선택을 조정하는 판단력이 중요하다는 것을 체감했습니다.

### [한계]

- 평가에 사용한 테스트케이스 수가 제한적이어서 다양한 오픈소스 생태계를 충분히 커버하지 못했습니다.
- LLM 호출 비용과 응답 지연으로 인해 대규모 의존성 탐색 시 실용성에 제약이 있습니다.
