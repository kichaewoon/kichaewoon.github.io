---
layout: page
title: Protein Representation Learning for Drug Discovery
description: >-
  [SynBi Lab 개별연구] 그래프 기반 표현 학습과 Transformer 모델을 활용해 단백질 구조 정보를 반영하고, 
  단백질-약물 결합 및 활성 예측 성능을 개선한 연구 참여
img: https://info.genophore.com/hs-fs/hubfs/DIFFDOCK3.gif?width=557&height=465&name=DIFFDOCK3.gif
period: 2024.07 - 2025.01
lab: SynBi Lab, KAIST Bio and Brain Engineering
role: Undergraduate Researcher
demo_url:
github_url:
github_front_url:
github_back_url:
pdf_url:
tech_stack: [PyTorch, Graph Autoencoder, Transformer, GPCR, Protein Graph]
highlights:
  - Graph-based protein representation
  - GPCR activity prediction
  - Orphan GPCR exploration
order: 2
importance: 2
tags: [ML/DL, Research]
giscus_comments: true
---

## Overview

SynBi Lab (합성생물학 연구실) 인턴으로 참여하여, GPCR 단백질의 활성(agonist/antagonist) 예측 성능을 개선하는 연구를 진행했습니다. 신약 개발 파이프라인에서 AI를 활용하는 방법을 탐구하고, 그래프 기반 딥러닝 모델을 단백질 구조 데이터에 적용하는 것이 주요 목표였습니다.

기존 HEAL 모델의 베이스라인 코드를 GPCR PDB 데이터에 맞게 수정하고, Graph Auto Encoder 기반의 특징 추출 파이프라인을 직접 구현했습니다.

## Problem & Task

신약 개발에서 GPCR(G단백질 결합 수용체)은 전체 약물 타겟의 약 30%를 차지하지만, 특정 리간드가 해당 수용체에 결합했을 때 agonist(활성화)로 작용하는지, antagonist(억제)로 작용하는지를 실험 없이 예측하는 것은 매우 어려운 문제입니다. 특히 **orphan GPCR**처럼 알려진 리간드가 없는 수용체의 경우, 실험 데이터 자체가 부족해 기존 지도학습 방법론을 직접 적용하기 어렵습니다.

기존 HEAL 모델은 일반적인 단백질 구조를 전제로 설계되어 있어, GPCR 특유의 7-transmembrane 구조와 allosteric site를 고려한 입력 형식으로 변환하는 과정에서 코드 호환성 문제가 발생했습니다. 해결해야 했던 핵심 목표는 다음 두 가지입니다.

- GPCR PDB 파일을 그래프 형식으로 변환하여 모델에 입력 가능한 파이프라인 구성
- Graph Auto Encoder를 활용해 단백질 구조에서 의미 있는 잠재 표현(latent representation)을 추출하는 것

## Approach

핵심 아이디어는 단백질 3D 구조 정보를 그래프(노드: 잔기/원자, 엣지: 거리 기반 연결)로 변환한 뒤, **Graph Auto Encoder(GAE)**로 압축된 구조적 특징을 추출하고, 이를 downstream 활성 예측 태스크에 활용하는 것입니다.

단순 시퀀스 기반 모델 대신 그래프 모델을 선택한 이유는, GPCR의 활성 여부가 리간드와의 3D 결합 형태에 크게 의존하기 때문입니다. 시퀀스만으로는 allosteric site나 구조적 컨포메이션 변화를 충분히 반영하기 어렵습니다.

HEAL 논문의 Hierarchical Graph Transformer 베이스라인 대비, GPCR 특화 전처리(PDB 파싱 → 그래프 변환)와 GAE 기반 비지도 특징 추출 단계를 앞단에 추가한 점이 차별점입니다.

## Implementation

### [전체 파이프라인]

```
PDB 파일 → 그래프 변환 (노드: 아미노산 잔기, 엣지: 거리 기반)
→ Graph Auto Encoder (인코더: GCN, 디코더: 인접행렬 재구성)
→ 잠재 벡터 추출 → HEAL 기반 Hierarchical Graph Transformer → 활성 예측
```

### [핵심 설계]

- 노드 피처: 아미노산 종류, 이차구조 정보, 표면 노출도(SASA)
- 엣지: Cα 원자 간 거리 8Å 이하를 기준으로 연결
- GAE 인코더는 2-layer GCN으로 구성하여 잠재 공간에서 구조적 유사성을 보존했습니다.

### [직접 기여한 부분]

- GPCR PDB 파일 파싱 및 그래프 변환 코드 작성
- Graph Auto Encoder 학습 코드 구현
- HEAL 베이스라인 코드를 GPCR 데이터 형식에 맞게 수정 및 디버깅

## Results

정량적 성능 수치를 도출하기까지는 시간이 부족했으나, 다음의 정성적 결과를 확인했습니다.

- HEAL 베이스라인 코드가 GPCR PDB 파일에서도 오류 없이 실행되도록 수정 완료
- GAE를 통해 추출한 잠재 벡터가 단백질 구조적 유사성을 반영하는 것을 t-SNE 시각화로 확인
- Orphan GPCR 예측 모델로 확장하기 위한 파이프라인 프로토타입 완성

수치 비교는 향후 실험을 통해 보완이 필요한 상태입니다.

## Insights

### [배운점]

단백질 구조 데이터를 딥러닝에 적합한 형태로 전처리하는 전 과정을 직접 경험하며, 도메인 지식(생화학)과 엔지니어링이 얼마나 긴밀하게 연결되는지 체감했습니다. 또한 Diffusion 모델(DiffDock)이 molecular docking에 적용되는 방식을 공부하면서, 생성형 AI가 단순 분류를 넘어 구조 예측까지 확장되는 흐름을 이해할 수 있었습니다.

### [한계]

학기 중 연구 참여였기 때문에 모델 학습과 성능 검증까지 완료하지 못했습니다. 또한 GPCR 데이터셋 자체의 규모가 작아 모델 일반화 성능을 충분히 검증하기 어려웠습니다.

### [개선 방향]

- 더 많은 GPCR 구조 데이터를 확보하거나 data augmentation 전략을 도입해 데이터 부족 문제를 완화
- GAE 잠재 벡터와 리간드 구조 정보를 결합한 cross-modal 예측 모델로 확장
- Orphan GPCR에 대해 few-shot learning 또는 transfer learning 방식 적용 탐색
