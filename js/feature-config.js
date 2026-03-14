const FEATURES = {

  // ━━━ 홈 ━━━
  'dashboard': {
    name: '대시보드',
    icon: 'fa-solid fa-house',
    category: 'home',
    access: { general: '-', marketer: '-' },
    status: 'active'
  },

  // ━━━ 내 비즈니스 ━━━
  'my-store': {
    name: '내 매장 관리',
    icon: 'fa-solid fa-store',
    category: 'business',
    access: { general: '-', marketer: 'x' },
    status: 'active'
  },
  'client-manage': {
    name: '클라이언트 관리',
    icon: 'fa-solid fa-users',
    category: 'business',
    access: { general: 'x', marketer: 'a' },
    status: 'active'
  },
  'project-campaign': {
    name: '프로젝트/캠페인',
    icon: 'fa-solid fa-diagram-project',
    category: 'business',
    access: { general: 'x', marketer: 'b' },
    status: 'active'
  },

  // ━━━ 순위/노출 ━━━
  'place-rank': {
    name: '플레이스 순위 조회',
    icon: 'fa-solid fa-map-marker-alt',
    category: 'rank',
    access: { general: 'a', marketer: 'a' },
    status: 'active'
  },
  'blog-rank': {
    name: '블로그 순위 체킹',
    icon: 'fa-solid fa-blog',
    category: 'rank',
    access: { general: 'a', marketer: 'a' },
    status: 'planned'
  },
  'blog-index': {
    name: '블로그 지수 체킹',
    icon: 'fa-solid fa-chart-line',
    category: 'rank',
    access: { general: 'a', marketer: 'a' },
    status: 'planned'
  },
  'national-ranking': {
    name: '전국 업종별 랭킹',
    icon: 'fa-solid fa-ranking-star',
    category: 'rank',
    access: { general: 'b', marketer: 'b' },
    status: 'active'
  },
  'multi-tracking': {
    name: '다중 순위 추적',
    icon: 'fa-solid fa-layer-group',
    category: 'rank',
    access: { general: 'x', marketer: 'b' },
    status: 'active'
  },

  // ━━━ 키워드 분석 ━━━
  'keyword-volume': {
    name: '키워드 검색량',
    icon: 'fa-solid fa-magnifying-glass-chart',
    category: 'keyword',
    access: { general: 'a', marketer: 'a' },
    status: 'active'
  },
  'keyword-combo': {
    name: '키워드 조합기',
    icon: 'fa-solid fa-puzzle-piece',
    category: 'keyword',
    access: { general: 'a', marketer: 'a' },
    status: 'active'
  },
  'keyword-trend': {
    name: '트렌드 (급등 키워드)',
    icon: 'fa-solid fa-arrow-trend-up',
    category: 'keyword',
    access: { general: 'a', marketer: 'a' },
    status: 'active'
  },
  'keyword-cpc': {
    name: 'CPC 단가 추적',
    icon: 'fa-solid fa-coins',
    category: 'keyword',
    access: { general: 'c', marketer: 'c' },
    status: 'active'
  },
  'keyword-mining': {
    name: '키워드 마이닝',
    icon: 'fa-solid fa-sitemap',
    category: 'keyword',
    access: { general: 'c', marketer: 'c' },
    status: 'dev'
  },

  // ━━━ 리뷰 관리 ━━━
  'review-monitor': {
    name: '리뷰 모니터링',
    icon: 'fa-solid fa-comments',
    category: 'review',
    access: { general: 'a', marketer: 'a' },
    status: 'active'
  },
  'review-sync': {
    name: '리뷰 연동',
    icon: 'fa-solid fa-rotate',
    category: 'review',
    access: { general: 'b', marketer: 'b' },
    status: 'active'
  },
  'review-qr': {
    name: '영수증 리뷰 QR',
    icon: 'fa-solid fa-qrcode',
    category: 'review',
    access: { general: 'b', marketer: 'b' },
    status: 'dev'
  },
  'review-compare': {
    name: '경쟁업체 리뷰 비교',
    icon: 'fa-solid fa-code-compare',
    category: 'review',
    access: { general: 'b', marketer: 'b' },
    status: 'active'
  },
  'review-sns': {
    name: '긍정리뷰 SNS 업로드',
    icon: 'fa-solid fa-share-nodes',
    category: 'review',
    access: { general: 'b', marketer: 'b' },
    status: 'dev'
  },
  'review-seo': {
    name: '리뷰 SEO 분석',
    icon: 'fa-solid fa-microscope',
    category: 'review',
    access: { general: 'c', marketer: 'c' },
    status: 'active'
  },

  // ━━━ 마케팅 도구 ━━━
  'blog-posting': {
    name: '블로그 자동 포스팅',
    icon: 'fa-solid fa-pen-nib',
    category: 'marketing',
    access: { general: 'a', marketer: 'a' },
    status: 'dev'
  },
  'url-generator': {
    name: '상위노출 URL 생성기',
    icon: 'fa-solid fa-link',
    category: 'marketing',
    access: { general: 'c', marketer: 'c' },
    status: 'dev'
  },
  'ad-fraud': {
    name: '광고 부정클릭 관리',
    icon: 'fa-solid fa-shield-halved',
    category: 'marketing',
    access: { general: 'b', marketer: 'b' },
    status: 'dev'
  },
  'shortform-gen': {
    name: '숏폼 자동 생성기',
    icon: 'fa-solid fa-video',
    category: 'marketing',
    access: { general: 'b', marketer: 'b' },
    status: 'planned'
  },
  'performance-auto': {
    name: '퍼포먼스 마케팅 자동화',
    icon: 'fa-solid fa-robot',
    category: 'marketing',
    access: { general: 'b', marketer: 'b' },
    status: 'planned'
  },
  'ad-ai-gen': {
    name: '광고소재 AI 생성',
    icon: 'fa-solid fa-wand-magic-sparkles',
    category: 'marketing',
    access: { general: 'c', marketer: 'c' },
    status: 'planned'
  },

  // ━━━ 고객 관리 ━━━
  'auto-message': {
    name: '자동 문자/카톡 발송',
    icon: 'fa-solid fa-paper-plane',
    category: 'crm',
    access: { general: 'b', marketer: 'b' },
    status: 'dev'
  },

  // ━━━ 경영 관리 ━━━
  'cost-calc': {
    name: '손익계산/원가율',
    icon: 'fa-solid fa-calculator',
    category: 'management',
    access: { general: 'a', marketer: 'a' },
    status: 'dev'
  },
  'sales-sync': {
    name: '매출 연동',
    icon: 'fa-solid fa-cash-register',
    category: 'management',
    access: { general: 'b', marketer: 'b' },
    status: 'active'
  },

  // ━━━ 보고서/분석 ━━━
  'report-center': {
    name: '보고서 센터',
    icon: 'fa-solid fa-file-lines',
    category: 'report',
    access: { general: 'x', marketer: 'b' },
    status: 'active'
  },
  'competitor-analysis': {
    name: '경쟁사 분석',
    icon: 'fa-solid fa-chess',
    category: 'report',
    access: { general: 'x', marketer: 'b' },
    status: 'active'
  },
  'roi-analysis': {
    name: 'ROI/성과 분석',
    icon: 'fa-solid fa-chart-pie',
    category: 'report',
    access: { general: 'x', marketer: 'c' },
    status: 'active'
  },
  'auto-report': {
    name: '자동 보고서 수신',
    icon: 'fa-solid fa-envelope-open-text',
    category: 'report',
    access: { general: 'a', marketer: 'a' },
    status: 'planned'
  },

  // ━━━ 데이터 센터 ━━━
  'influencer-search': {
    name: '인플루언서 서칭',
    icon: 'fa-solid fa-user-group',
    category: 'data',
    access: { general: 'a', marketer: 'a' },
    status: 'planned'
  },
  'biz-data': {
    name: '소상공인 데이터',
    icon: 'fa-solid fa-database',
    category: 'data',
    access: { general: 'c', marketer: 'c' },
    status: 'active'
  },
  'realestate-data': {
    name: '부동산 데이터',
    icon: 'fa-solid fa-building',
    category: 'data',
    access: { general: 'x', marketer: 'c' },
    status: 'active'
  },
  'customer-db': {
    name: '고객 DB 수집',
    icon: 'fa-solid fa-address-book',
    category: 'data',
    access: { general: 'c', marketer: 'c' },
    status: 'hidden'
  },

  // ━━━ 품앗이/트래픽 ━━━
  'naver-pumasi': {
    name: '네이버 품앗이',
    icon: 'fa-solid fa-handshake',
    category: 'traffic',
    access: { general: 'a', marketer: 'a' },
    status: 'active'
  },
  'sns-pumasi': {
    name: 'SNS 품앗이',
    icon: 'fa-solid fa-hashtag',
    category: 'traffic',
    access: { general: 'a', marketer: 'a' },
    status: 'app'
  },
  'delivery-pumasi': {
    name: '배달앱 품앗이',
    icon: 'fa-solid fa-motorcycle',
    category: 'traffic',
    access: { general: 'a', marketer: 'a' },
    status: 'app'
  },

  // ━━━ 도구 ━━━
  'photo-meta': {
    name: '사진 메타정보 변경',
    icon: 'fa-solid fa-image',
    category: 'tools',
    access: { general: 'a', marketer: 'a' },
    status: 'dev'
  },
  'youtube-analysis': {
    name: '유튜브 분석',
    icon: 'fa-brands fa-youtube',
    category: 'tools',
    access: { general: 'a', marketer: 'a' },
    status: 'dev'
  },
  'kakao-channel': {
    name: '카카오채널 연동',
    icon: 'fa-solid fa-comment-dots',
    category: 'tools',
    access: { general: 'c', marketer: 'c' },
    status: 'active'
  },

  // ━━━ 제휴/정보 ━━━
  'partnership': {
    name: '제휴사 문의',
    icon: 'fa-solid fa-briefcase',
    category: 'partner',
    access: { general: '-', marketer: '-' },
    status: 'planned'
  },
  'education': {
    name: '강의 자료',
    icon: 'fa-solid fa-graduation-cap',
    category: 'partner',
    access: { general: '-', marketer: '-' },
    status: 'planned'
  },
  'local-marketing': {
    name: '우리동네 마케팅',
    icon: 'fa-solid fa-location-dot',
    category: 'partner',
    access: { general: '-', marketer: '-' },
    status: 'planned'
  },
  'design-request': {
    name: '시안물 제작 요청',
    icon: 'fa-solid fa-palette',
    category: 'partner',
    access: { general: '-', marketer: '-' },
    status: 'planned'
  },

  // ━━━ 계정/설정 ━━━
  'my-account': {
    name: '내 계정',
    icon: 'fa-solid fa-circle-user',
    category: 'settings',
    access: { general: '-', marketer: '-' },
    status: 'active'
  },
  'plan-billing': {
    name: '플랜/결제',
    icon: 'fa-solid fa-credit-card',
    category: 'settings',
    access: { general: '-', marketer: '-' },
    status: 'active'
  },
  'notification': {
    name: '알림 설정',
    icon: 'fa-solid fa-bell',
    category: 'settings',
    access: { general: '-', marketer: '-' },
    status: 'active'
  },
  'guide-page': {
    name: '가이드',
    icon: 'fa-solid fa-book',
    category: 'settings',
    access: { general: '-', marketer: '-' },
    status: 'active'
  },
  'faq-page': {
    name: 'FAQ',
    icon: 'fa-solid fa-circle-question',
    category: 'settings',
    access: { general: '-', marketer: '-' },
    status: 'active'
  },
  'contact-page': {
    name: '문의하기',
    icon: 'fa-solid fa-headset',
    category: 'settings',
    access: { general: '-', marketer: '-' },
    status: 'active'
  }
};


/**
 * 카테고리 순서 및 항목 순서 정의
 * items 배열의 순서가 사이드바 메뉴 순서를 결정한다.
 */
const CATEGORIES = [
  {
    id: 'home',
    title: '',
    items: ['dashboard']
  },
  {
    id: 'business',
    title: '내 비즈니스',
    items: ['my-store', 'client-manage', 'project-campaign']
  },
  {
    id: 'rank',
    title: '순위/노출',
    items: ['place-rank', 'blog-rank', 'blog-index', 'national-ranking', 'multi-tracking']
  },
  {
    id: 'keyword',
    title: '키워드 분석',
    items: ['keyword-volume', 'keyword-combo', 'keyword-trend', 'keyword-cpc', 'keyword-mining']
  },
  {
    id: 'review',
    title: '리뷰 관리',
    items: ['review-monitor', 'review-sync', 'review-qr', 'review-compare', 'review-sns', 'review-seo']
  },
  {
    id: 'marketing',
    title: '마케팅 도구',
    items: ['blog-posting', 'url-generator', 'ad-fraud', 'shortform-gen', 'performance-auto', 'ad-ai-gen']
  },
  {
    id: 'crm',
    title: '고객 관리',
    items: ['auto-message']
  },
  {
    id: 'management',
    title: '경영 관리',
    items: ['cost-calc', 'sales-sync']
  },
  {
    id: 'report',
    title: '보고서/분석',
    items: ['report-center', 'competitor-analysis', 'roi-analysis', 'auto-report']
  },
  {
    id: 'data',
    title: '데이터 센터',
    items: ['influencer-search', 'biz-data', 'realestate-data', 'customer-db']
  },
  {
    id: 'traffic',
    title: '품앗이/트래픽',
    items: ['naver-pumasi', 'sns-pumasi', 'delivery-pumasi']
  },
  {
    id: 'tools',
    title: '도구',
    items: ['photo-meta', 'youtube-analysis', 'kakao-channel']
  },
  {
    id: 'partner',
    title: '제휴/정보',
    items: ['partnership', 'education', 'local-marketing', 'design-request']
  },
  {
    id: 'settings',
    title: '계정/설정',
    items: ['my-account', 'plan-billing', 'notification', 'guide-page', 'faq-page', 'contact-page']
  }
];
