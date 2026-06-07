// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "A collection of my projects. Use the chips to filter by technology and project type.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "projects-personalized-web-agent",
          title: 'Personalized Web Agent',
          description: "[DAVIAN Lab 개별연구] 사용자의 web 탐색 history로부터 preference를 추론해 personalized web task를 수행하는 web agent benchmark 설계와 평가 데이터셋 구축 및 개선된 agent 구현",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-protein-representation-learning-for-drug-discovery",
          title: 'Protein Representation Learning for Drug Discovery',
          description: "[SynBi Lab 개별연구] 그래프 기반 표현 학습과 Transformer 모델을 활용해 단백질 구조 정보를 반영하고,  단백질-약물 결합 및 활성 예측 성능을 개선한 연구 참여",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-popo-대학생-개발자를-위한-포트폴리오-생성기",
          title: 'POPO: 대학생 개발자를 위한 포트폴리오 생성기',
          description: "대학생 개발자가 프로젝트 정보를 입력하면 LLM 이 포트폴리오를 자동 생성해주는 웹 플랫폼 개발. 현재 Fine tuning과 RAG 이용한 고도화 진행 중",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-fitfor-휠체어-이용자를-위한-운동-추천-플랫폼",
          title: 'Fitfor: 휠체어 이용자를 위한 운동 추천 플랫폼',
          description: "신체 능력 평가 기반으로 휠체어 이용자에게 맞춤 운동을 추천하는 웹 플랫폼. 사용자 인터뷰로 문제를 재정의하고, LLM 적응형 추천 파이프라인 구현. 카카오임팩트 주관 테크포임팩트 공감인기상 수상.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-fosslight-scanner-오픈소스-모델-데이터셋의-라이선스-및-의존성-자동-분석-도구-개발",
          title: 'FOSSLight Scanner: 오픈소스 모델/데이터셋의 라이선스 및 의존성 자동 분석 도구 개발',
          description: "AI 개발 시 사용하는 오픈소스 모델·데이터셋의 라이선스를 수동으로 검증하는 비효율을 해소하기 위해, Hugging Face/GitHub URL 입력만으로 의존성을 재귀적으로 탐색하고 라이선스를 자동 분석하는 CLI 도구 개발",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-separate-and-reconstruct-asymmetric-encoder-decoder-for-speech-separation",
          title: 'Separate and Reconstruct: Asymmetric Encoder-Decoder for Speech Separation',
          description: "사람-동물·동물-동물 혼합 오디오에서의 음원 분리 성능 향상을 위해, pydub 기반 혼합 데이터 32,000개를 직접 구축하고 SepReformer를 재학습시킨 5인 팀 프로젝트. 기존 모델 대비 Si-SNRi +2.3dB, SDRi +1.96dB 향상 달성",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/CV.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6B%69%63%68%61%65%77%6F%6F%6E@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/71c1nw00n", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/chaewoonki", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
