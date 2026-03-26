---
layout: page
title: "Separate and Reconstruct: Asymmetric Encoder-Decoder for Speech Separation"
description: >-
  사람-동물·동물-동물 혼합 오디오에서의 음원 분리 성능 향상을 위해,
  pydub 기반 혼합 데이터 32,000개를 직접 구축하고 SepReformer를 재학습시킨 5인 팀 프로젝트. 기존 모델 대비 Si-SNRi +2.3dB, SDRi +1.96dB 향상 달성
img: assets/img/cs470-2.png
period: 2024.07-2024.12
lab: 수업 프로젝트 (5인))
demo_url: https://star-badger-c43.notion.site/CS470-P02-Demo-15609540cbdc80ddad7fd8e994c789f5
github_url: https://github.com/71c1nw00n/SepReformer-anim
github_front_url:
github_back_url:
pdf_url:
tech_stack: [Python, PyTorch, SepReformer, pydub, WSJ0, Hugging Face Datasets]
highlights:
  - 기존 모델 성능 개선
  - 혼합 데이터 구축
  - 데이터 증강
  - SepReformer 재학습

order: 6
importance: 6
tags: [ML/DL, Data/System Engineering]
---
<div style="margin: 1rem 0;">
  <label>크기 조절: 
    <input type="range" min="50" max="200" value="100" id="zoom-slider" style="vertical-align: middle;">
    <span id="zoom-value">100%</span>
  </label>
</div>
<div style="overflow: auto; border: 1px solid #ddd; border-radius: 8px; height: 700px;">
  <img
    id="poster-img"
    src="/assets/img/cs470.jpg"
    style="width: 100%; display: block;"
  />
</div>

<script>
  const slider = document.getElementById('zoom-slider');
  const img = document.getElementById('poster-img');
  const label = document.getElementById('zoom-value');

  slider.addEventListener('input', () => {
    img.style.width = slider.value + '%';
    label.textContent = slider.value + '%';
  });
</script>

## Overview

KAIST CS470 (AI 개론) 수업의 5인 팀 프로젝트로, 사람과 동물 음성이 혼합된 오디오에서
각 음원을 분리하는 Speech Separation 모델을 개발했습니다. 기존 모델이 사람-사람 분리에
특화되어 있어 동물 음성이 포함된 경우 성능이 급격히 저하된다는 한계를 확인하고,
사람-동물·동물-동물 혼합 데이터를 직접 구축해 SepReformer를 재학습시키는 방식으로
이를 극복했습니다. 저는 **데이터 증강 및 전처리**와 **모델 학습 및 실험**을 담당했습니다.

## Problem & Task

현대의 음성 분리 모델은 사람 음성 분리에 최적화되어 있어, 동물 소리가 포함된 오디오를
처리할 때 성능이 크게 떨어집니다. 그러나 실제 환경의 오디오는 사람 목소리만으로
구성되지 않으며, AI 모델이 다양한 음원을 구별할 수 있어야 실용적인 활용이 가능합니다.

기존 베이스라인(SepReformer)은 사람-사람 분리에서는 준수한 성능을 보였지만,
사람-동물 또는 동물-동물 혼합 시나리오에서는 Si-SNRi와 SDRi가 모두 음수로
성능이 크게 저하되는 문제가 있었습니다. 제가 해결해야 했던 목표는 두 가지입니다.

- 사람-동물·동물-동물 혼합 오디오 데이터를 직접 구축하여 모델이 학습할 수 있는
  도메인 데이터 확보
- 증강 데이터로 SepReformer를 재학습시켜 다양한 음원 시나리오에서의 분리 성능 향상

## Approach

기존 모델의 한계를 데이터 레벨에서 극복하는 전략을 택했습니다. 사람 음성은
WSJ0 데이터셋에서, 동물 음성은 Hugging Face의 *Natural and Artificial Non-verbal
Sound Dataset*과 *Sound Classification of Animal Voice* 데이터셋에서 수집했습니다.

수집한 음원을 pydub 라이브러리로 혼합하여 Human+Human(16,000개),
Human+Animal(8,000개), Animal+Animal(8,000개) 총 32,000개의 혼합 오디오 데이터를
생성했습니다. 모든 샘플은 볼륨 정규화 및 묵음 구간 제거 전처리를 거쳤으며,
학습:검증:평가 = 6:2:1 비율로 분할했습니다.

## Implementation

### [전체 파이프라인]
```
원본 음원 수집 (WSJ0 / Hugging Face 동물 음성 데이터셋)
→ 전처리 (볼륨 정규화, 묵음 제거, 5초 단위 분절)
→ pydub 기반 혼합 오디오 생성 (Human+Human / Human+Animal / Animal+Animal)
→ SepReformer-anim 학습 (200 epochs, 1,800 samples)
→ Si-SNRi / SDRi / MACs 기반 성능 평가
```

### [직접 기여한 부분]

- **데이터 수집 및 전처리**: 동물 음성 데이터셋 탐색·수집, 볼륨 정규화 및 묵음 구간
  제거, 5초 단위 분절 처리
- **혼합 데이터 생성**: pydub 기반 오디오 믹싱 파이프라인 구축으로 32,000개 학습
  데이터 생성
- **모델 학습 및 실험**: SepReformer 아키텍처 기반으로 증강 데이터셋을 활용한
  재학습(SepReformer-anim) 수행, 학습률·에폭 등 하이퍼파라미터 실험

## Results

SepReformer-anim(저희 모델)을 기존 모델들과 비교한 결과, 다음과 같은 성과를
달성했습니다.

| System | Params (M) | MACs (G/s) | Si-SNRi (dB) | SDRi (dB) |
|---|---|---|---|---|
| Conv-TasNet | 5.05 | 20.13 | -13.80 | -7.49 |
| DPT-Net | 8.53 | 72.87 | -21.23 | -10.22 |
| DualPathRNN | 3.65 | 30.12 | -17.10 | -7.30 |
| SepReformer (baseline) | 14.69 | 45.13 | 8.80 | 8.51 |
| **SepReformer-anim (ours)** | 14.69 | 43.96 | **11.10** | **10.47** |

- 비교 대상 5개 모델 중 **Si-SNRi 및 SDRi 모두 최고 성능** 달성
- 베이스라인 대비 Si-SNRi +2.3dB, SDRi +1.96dB 향상
- 베이스라인의 10분의 1 미만 크기의 증강 데이터만으로 성능 개선 달성,
  데이터 증강의 효과성 입증

## Insights

### [배운점]

모델 아키텍처를 바꾸지 않고도 **데이터 구성만으로 성능을 크게 끌어올릴 수 있다**는
것을 직접 실험으로 확인했습니다. 어떤 데이터를 어떻게 혼합하느냐가 모델의 일반화
능력에 결정적인 영향을 미치며, 데이터 설계 자체가 모델 설계만큼 중요한 엔지니어링
과제임을 체감했습니다.

### [한계]

- 비용 문제로 멀티 GPU 학습을 포기하고 단일 GPU에서 에폭 수를 줄여 학습하여,
  더 충분한 학습이 이루어졌다면 성능이 추가로 향상되었을 가능성이 있습니다.
- 학습 데이터 규모(1,800개)가 베이스라인 대비 매우 작아 다양한 시나리오를
  충분히 커버하지 못했습니다.

### [개선 방향]

- 멀티 클래스 출력이 가능한 듀얼 패스 비대칭 인코더-디코더로 전환하여
  다양한 카테고리 분류 성능 향상 탐색
- Multi-head 또는 Cross-attention 메커니즘 도입으로 사람 음성 패턴에 대한
  모델 민감도 개선
- 더 다양한 동물 음성 카테고리와 환경 노이즈를 포함한 데이터 확장
```
