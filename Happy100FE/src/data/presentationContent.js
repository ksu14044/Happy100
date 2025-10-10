import heroImage from '../assets/images/presentation/hero-community.jpg';
import franchiseVisual from '../assets/images/presentation/slide-02-franchise.jpg';
import strategyVisual from '../assets/images/presentation/slide-03-strategy.jpg';
import programIntroVisual from '../assets/images/presentation/slide-04-program-intro.jpg';
import domesticProgramSlide from '../assets/images/presentation/slide-05-domestic-status.jpg';
import therapyProgramSlide from '../assets/images/presentation/slide-06-therapy.jpg';
import facilityCompareSlide from '../assets/images/presentation/slide-07-facility-compare.jpg';
import facilityStatusSlide from '../assets/images/presentation/slide-08-facility-status.jpg';
import welfareStatusSlide from '../assets/images/presentation/slide-09-welfare-status.jpg';
import agingSummarySlide from '../assets/images/presentation/slide-10-aging-stats.jpg';
import certificatesSlide from '../assets/images/presentation/slide-12-certificates.jpg';
import outlookSlide from '../assets/images/presentation/slide-13-outlook.jpg';
import programScene1 from '../assets/images/presentation/photo-02.jpg';
import programScene2 from '../assets/images/presentation/photo-03.jpg';
import programScene3 from '../assets/images/presentation/photo-04.jpg';
import welfareScene from '../assets/images/presentation/photo-05.jpg';
import seniorsTogether from '../assets/images/presentation/photo-06.jpg';

export const HERO_CONTENT = {
  title: '행복하게 백세까지, 모두가 웃는 학습 커뮤니티',
  description:
    '시니어와 장애우의 일상을 잇는 통합 인지교육 플랫폼입니다. 현장 맞춤형 프로그램과 전문 강사 네트워크로 지역사회에 활력을 더합니다.',
  ctaPrimary: { label: '상담 신청하기', href: '/counsel' },
  ctaSecondary: { label: '프로그램 자세히', href: '/program' },
  keywords: ['통합 인지교육', '세대 융합', '민간 자격증', '지역 협력'],
  image: heroImage,
};

export const TABLE_OF_CONTENTS = [
  {
    title: '고령인구 현황',
    summary: '급격한 고령화 통계와 사회적 대응 필요성',
    anchor: '#aging-insights',
  },
  {
    title: '노인복지 시설',
    summary: '국내 시설 현황과 선진국 운영 비교',
    anchor: '#facility-status',
  },
  {
    title: '행복백세 프로그램',
    summary: '교구·콘텐츠·강사 네트워크로 완성된 커리큘럼',
    anchor: '/program',
  },
  {
    title: '가맹지사 지원',
    summary: '교육, 운영, 마케팅까지 전방위 지원 시스템',
    anchor: '/franchise',
  },
];

export const AGING_INSIGHTS = {
  title: '우리나라 고령인구 현황',
  description:
    '초고령 사회 진입을 앞둔 지금, 지역 기반 인지교육과 돌봄 프로그램의 체계적인 확산이 요구됩니다.',
  highlights: [
    {
      title: '급격한 고령화 추세와 통계',
      details: [
        '2024년 65세 이상 인구 993만 8천 명(19.2%)',
        '2025년 초고령 사회 진입 예상',
      ],
    },
    {
      title: '고령 사회 구분 기준',
      details: [
        '고령화 사회: 65세 이상 7% 이상',
        '고령 사회: 65세 이상 14% 이상',
        '초고령 사회: 65세 이상 20% 이상',
      ],
    },
    {
      title: '정책적 시사점',
      details: [
        '지속 가능한 복지 인프라 확대 필요',
        '전문 강사 양성과 지역 기반 프로그램 확보',
      ],
    },
  ],
};

export const DIFFERENTIATION_STRATEGY = {
  visual: strategyVisual,
  items: [
    {
      step: '01',
      title: '통합적 접근',
      summary: '인지·감성·신체를 아우르는 통합 프로그램으로 개인별 맞춤 서비스를 제공합니다.',
      points: ['기관·가족 참여형 커리큘럼', '다감각 자극 활동 구성'],
    },
    {
      step: '02',
      title: '전문성 강화',
      summary: '정기 강사 교육과 최신 노인교육 트렌드를 반영한 운영 매뉴얼을 제공합니다.',
      points: ['온·오프라인 연계 교육', '전문 협력체계 구축'],
    },
    {
      step: '03',
      title: '지속 가능한 운영',
      summary: '체계적 품질 관리와 지역 연계로 장기적 프로그램 운영 기반을 조성합니다.',
      points: ['공모사업 확장', '성과 기반 피드백 시스템'],
    },
  ],
};

export const PROGRAM_INTRO = {
  visual: programIntroVisual,
  cards: [
    {
      order: '1',
      title: '프로그램 개요',
      summary: '고품격 시니어 교육을 제공하는 선진국형 통합 인지 프로그램',
      details: ['다양한 체험형 콘텐츠', '현장 맞춤 설계 지원'],
    },
    {
      order: '2',
      title: '제공 서비스 내용(매월)',
      summary: '레크리에이션·오감 활동·미술·원예·요리·난타 등 교구 기반 수업',
      details: ['콘텐츠 매월 업데이트', '교육자료·키트 일괄 제공'],
    },
    {
      order: '3',
      title: '목표와 효과',
      summary: '감성 코칭과 정서안정 지원으로 사회적 상호작용을 강화합니다.',
      details: ['인지·정서 향상', '가족·지역 연계 강화'],
    },
  ],
};

export const DOMESTIC_PROGRAM_STATUS = [
  {
    name: '레인힐/탈드',
    summary: '자격증 2~3개 취득 후 파견되는 수수료 기반 운영 모델',
    points: ['연 4~5개 전문 프로그램', '현장 맞춤형 교육 자료'],
  },
  {
    name: '세누리',
    summary: '지사/지부 가맹 시스템으로 자격증 발급 권한 부여',
    points: ['연 1~2회 본사 교육', '전국 지사 개설 인센티브 40%'],
  },
  {
    name: '치매협회/시니어협회',
    summary: '자격증 취득 후 개별 활동을 중심으로 한 프로그램',
    points: ['공연 위주의 수업 운영', '흥미 위주 프로그램 제공'],
  },
  {
    name: '개인가사',
    summary: '트로트·레크리에이션 등 손유희 중심의 프로그램',
    points: ['소규모 그룹 수업', '간단한 게임과 위주 활동'],
  },
];

export const THERAPY_PROGRAMS = [
  {
    title: '인지기능 향상',
    summary: '식물 관리 활동으로 기억력과 집중력을 자극합니다.',
    points: ['계절·식물 인지', '두뇌 활성화 활동'],
  },
  {
    title: '정서적 안정',
    summary: '돌봄 경험을 통한 안정감과 스트레스 완화를 돕습니다.',
    points: ['감정 표현 훈련', '우울감 완화 지원'],
  },
  {
    title: '사회성 증진',
    summary: '그룹 활동 참여로 의사소통과 대인 관계를 개선합니다.',
    points: ['작품 공유', '협업 중심 수업'],
  },
];

export const FACILITY_COMPARISON = {
  left: {
    title: '미국 주간보호센터',
    description: '데이케어 기반 세대 통합 프로그램과 치매 전문 운영',
    points: ['약 20명 소규모 운영', '지역사회 생활 지원 강화'],
  },
  right: {
    title: '한국 주간보호센터',
    description: '전국 5,090개소, 치매 전문 프로그램과 다양한 활동 제공',
    points: ['노인여가복지시설 증가', '재가노인복지시설 확대'],
  },
};

export const FACILITY_STATUS = [
  {
    title: '노인주거복지시설',
    description: '요양시설, 노인공동생활가정, 복지주택 등',
    stats: '2023년 이용자 1만 9,369명, 전년 대비 소폭 증가',
    image: welfareScene,
  },
  {
    title: '노인이용시설',
    description: '요양시설과 공동생활가정 중심의 돌봄 서비스',
    stats: '2023년 이용자 24만 2,974명, 전년 대비 4.62% 증가',
    image: programScene2,
  },
  {
    title: '시설 수 변화 추이',
    description: '주거시설 감소·의료시설 증대 추이 분석',
    stats: '의료시설 6,139개소, 주거시설 297개소',
    image: seniorsTogether,
  },
];

export const WELFARE_STATUS = [
  {
    title: '전국 노인복지시설',
    points: ['총 5,090개소', '장기요양 등급 어르신 보호'],
  },
  {
    title: '노인여가복지시설',
    points: ['7만 455개소', '복지관·경로당 중심 669개소 증가'],
  },
  {
    title: '재가노인복지시설',
    points: ['1만 5,896개소', '방문요양 등 2,624개소 증가'],
  },
  {
    title: '이용자 증가 추세',
    points: ['재가서비스 17.02% 증가', '2023년 12만 5,048명 이용'],
  },
];

export const CERTIFICATE_TYPES = [
  {
    name: '통합인지 지도사',
    description: '통합 인지 프로그램 설계와 운영 역량을 갖춘 전문가',
  },
  {
    name: '실버 푸드테라피 지도사',
    description: '요리를 통한 오감 자극과 인지·소근육 발달 지원',
  },
  {
    name: '힐링 원예 지도사',
    description: '원예 활동으로 감수성과 정서를 치유하는 지도자',
  },
  {
    name: '숟가락 난타 지도사',
    description: '리듬과 신체 활동으로 시청각·촉각을 자극하는 강사',
  },
  {
    name: '감정 코칭 지도사',
    description: '언어로 표현하기 어려운 감정을 탐색하고 코칭',
  },
];

export const FRANCHISE_SUPPORT = {
  visual: franchiseVisual,
  flow: [
    {
      title: '프로그램 지원',
      details: ['매월 주제별 프로그램 제공', '콘텐츠 지속 업데이트'],
    },
    {
      title: '교육',
      details: ['본기별 전문 교육 실시', '온·오프라인 병행'],
    },
    {
      title: '자격증 발급',
      details: ['민간자격 발급 권한 부여', '강사 파견 교육 지원'],
    },
    {
      title: '영업 지원',
      details: ['지역 독점 영업권 제공', '마케팅 자료·전략 지원'],
    },
    {
      title: '지자체 사업',
      details: ['제안서 작성 지원', '공모사업 정보 제공 및 컨설팅'],
    },
  ],
};

export const FRANCHISE_PROCESS = [
  {
    step: 'STEP 01',
    title: '상담 및 사업 이해',
    description: '희망 지역과 운영 목표를 검토하며 행복백세 모델을 소개합니다.',
  },
  {
    step: 'STEP 02',
    title: '협약 및 교육',
    description: '협약 체결 후 지사장·강사 교육을 통해 운영 역량을 확보합니다.',
  },
  {
    step: 'STEP 03',
    title: '개설 준비 및 홍보',
    description: '일정·운영 계획을 수립하고 초기 홍보와 컨설팅을 지원합니다.',
  },
  {
    step: 'STEP 04',
    title: '지사 운영 및 성장',
    description: '정기 평가와 공동 프로젝트로 지사의 지속 성장을 돕습니다.',
  },
];

export const OUTLOOK_SUMMARY = {
  title: '결론 및 향후 전망',
  points: [
    '고품격 시니어 교육 제공과 통합적 접근으로 삶의 질 향상',
    '맞춤형 프로그램 수요 증가에 따른 시장 확대 예상',
    '민관 협력 강화와 전문 인력 양성의 중요성, 행복백세가 함께합니다.',
  ],
};

export const PROGRAM_GALLERY = [programScene1, programScene2, programScene3];

export const FACILITY_STATUS_SLIDE = {
  image: facilityStatusSlide,
  caption: '시설 분포와 이용자 수를 정리한 슬라이드입니다. 연도별 증감 추이까지 한 번에 확인할 수 있습니다.',
};

export const WELFARE_STATUS_SLIDE = {
  image: welfareStatusSlide,
  caption: '전국 노인복지시설·여가시설·재가서비스 통계를 시각화한 자료로 핵심 지표를 요약했습니다.',
};

export const FACILITY_COMPARISON_SLIDE = {
  image: facilityCompareSlide,
  caption: '미국과 한국 주간보호센터의 운영 특징을 좌우 비교 형식으로 정리한 참고 슬라이드입니다.',
};

export const PROGRAM_OVERVIEW_SLIDE = {
  image: programIntroVisual,
  caption: '프로그램 개요부터 제공 서비스, 기대 효과까지 한눈에 담은 소개 슬라이드입니다.',
};

export const DOMESTIC_PROGRAM_SLIDE = {
  image: domesticProgramSlide,
  caption: '국내 시니어 프로그램 운영 현황과 주요 기관별 특징을 비교한 자료입니다.',
};

export const THERAPY_PROGRAM_SLIDE = {
  image: therapyProgramSlide,
  caption: '노인 대상 원예치료 프로그램의 세 가지 핵심 효과를 정리한 슬라이드입니다.',
};

export const CERTIFICATE_TYPES_SLIDE = {
  image: certificatesSlide,
  caption: '행복백세 민간 자격증 종류와 세부 과정을 카드 형태로 소개한 슬라이드입니다.',
};

export const DIFFERENTIATION_SLIDE = {
  image: strategyVisual,
  caption: '행복백세의 차별화 전략 세 가지를 단계별로 표현한 전략 슬라이드입니다.',
};

export const AGING_SUMMARY_SLIDE = {
  image: agingSummarySlide,
  caption: '주요 국가의 고령화 진입 속도와 우리나라 고령인구 통계를 비교한 인포그래픽입니다.',
};

export const OUTLOOK_SLIDE = {
  image: outlookSlide,
  caption: '행복백세의 결론과 향후 전망을 종합적으로 제시한 마무리 슬라이드입니다.',
};
