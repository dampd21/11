/**
 * SHERPA IN - 사이드바 렌더링
 * feature-config.js의 설정을 읽어 role/plan에 맞게 사이드바를 동적 생성한다.
 */

(function () {
  'use strict';

  // ── 상태 ──
  let currentRole = 'general';
  let currentPlan = 'a';
  let sidebarCollapsed = false;
  let activeItemId = 'dashboard';

  // ── 플랜 체크 ──
  const PLAN_ORDER = { 'a': 1, 'b': 2, 'c': 3 };
  const PLAN_NAME = { 'a': 'BASIC', 'b': 'STANDARD', 'c': 'PRO' };
  const ROLE_NAME = { 'general': '자영업자', 'marketer': '마케터' };

  function hasAccess(userPlan, requiredPlan) {
    if (requiredPlan === '-') return true;
    if (requiredPlan === 'x' || requiredPlan === 'hidden') return false;
    return (PLAN_ORDER[userPlan] || 0) >= (PLAN_ORDER[requiredPlan] || 0);
  }

  function isVisible(feature, role) {
    if (feature.status === 'hidden') return false;
    const access = feature.access[role];
    return access && access !== 'x';
  }

  // ── 메뉴 아이템 생성 ──
  function createMenuItem(featureId, feature) {
    const access = feature.access[currentRole] || 'x';
    const locked = !hasAccess(currentPlan, access);
    const isPlanned = feature.status === 'planned';
    const isApp = feature.status === 'app';
    const isDev = feature.status === 'dev';

    const item = document.createElement('a');
    item.href = '#';
    item.className = 'sidebar-item';
    item.dataset.featureId = featureId;

    if (locked) item.classList.add('is-locked');
    if (isPlanned || isApp) item.classList.add('is-muted');
    if (featureId === activeItemId) item.classList.add('is-active');

    // 아이콘
    const icon = document.createElement('span');
    icon.className = 'item-icon';
    const i = document.createElement('i');
    i.className = feature.icon;
    icon.appendChild(i);
    item.appendChild(icon);

    // 텍스트
    const text = document.createElement('span');
    text.className = 'item-text';
    text.textContent = feature.name;
    item.appendChild(text);

    // 우측 배지
    const badgeArea = document.createElement('span');
    badgeArea.className = 'item-badge-area';

    if (locked) {
      const badge = document.createElement('span');
      badge.className = 'item-badge badge-lock';
      badge.innerHTML = '<i class="fa-solid fa-lock"></i> ' + PLAN_NAME[access];
      badgeArea.appendChild(badge);
    } else if (isPlanned) {
      const badge = document.createElement('span');
      badge.className = 'item-badge badge-planned';
      badge.textContent = '준비중';
      badgeArea.appendChild(badge);
    } else if (isApp) {
      const badge = document.createElement('span');
      badge.className = 'item-badge badge-app';
      badge.textContent = '앱';
      badgeArea.appendChild(badge);
    } else if (isDev) {
      const badge = document.createElement('span');
      badge.className = 'item-badge badge-dev';
      badge.textContent = '개발중';
      badgeArea.appendChild(badge);
    }

    item.appendChild(badgeArea);

    // 툴팁 (접힘 상태용)
    item.title = feature.name;

    // 클릭 이벤트
    item.addEventListener('click', function (e) {
      e.preventDefault();
      if (locked) {
        showUpgradeNotice(PLAN_NAME[access]);
        return;
      }
      setActiveItem(featureId);
    });

    return item;
  }

  // ── 사이드바 렌더링 ──
  function renderSidebar() {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;
    nav.innerHTML = '';

    CATEGORIES.forEach(function (cat) {
      // 이 카테고리에서 현재 role에 보이는 항목 필터
      const visibleItems = cat.items.filter(function (id) {
        const feature = FEATURES[id];
        return feature && isVisible(feature, currentRole);
      });

      if (visibleItems.length === 0) return;

      // 카테고리 헤더
      if (cat.title) {
        const header = document.createElement('div');
        header.className = 'sidebar-category';
        header.textContent = cat.title;
        nav.appendChild(header);
      }

      // 메뉴 아이템
      visibleItems.forEach(function (id) {
        const feature = FEATURES[id];
        nav.appendChild(createMenuItem(id, feature));
      });
    });

    // 프로필 배지 갱신
    updateProfileBadges();
    // 클라이언트 선택기 갱신
    updateClientSelector();
    // 메뉴 카운트 갱신
    updateMenuCount();
  }

  function updateProfileBadges() {
    const roleBadge = document.getElementById('role-badge');
    const planBadge = document.getElementById('plan-badge');
    if (roleBadge) {
      roleBadge.textContent = ROLE_NAME[currentRole] || currentRole;
      roleBadge.className = 'badge badge-role role-' + currentRole;
    }
    if (planBadge) {
      planBadge.textContent = PLAN_NAME[currentPlan] || currentPlan;
      planBadge.className = 'badge badge-plan plan-' + currentPlan;
    }
  }

  function updateClientSelector() {
    const selector = document.getElementById('client-selector');
    if (!selector) return;
    selector.style.display = (currentRole === 'marketer') ? 'block' : 'none';
  }

  function updateMenuCount() {
    const counter = document.getElementById('menu-count');
    if (!counter) return;
    const nav = document.getElementById('sidebar-nav');
    const total = nav.querySelectorAll('.sidebar-item').length;
    const locked = nav.querySelectorAll('.sidebar-item.is-locked').length;
    const active = total - locked;
    counter.textContent = '메뉴 ' + total + '개 (활성 ' + active + ' / 잠금 ' + locked + ')';
  }

  function setActiveItem(featureId) {
    activeItemId = featureId;
    document.querySelectorAll('.sidebar-item').forEach(function (el) {
      el.classList.toggle('is-active', el.dataset.featureId === featureId);
    });
    // 메인 컨텐츠 영역에 현재 선택 표시
    const display = document.getElementById('current-feature-display');
    if (display && FEATURES[featureId]) {
      display.textContent = FEATURES[featureId].name;
    }
  }

  function showUpgradeNotice(planName) {
    const notice = document.getElementById('upgrade-notice');
    if (notice) {
      notice.textContent = planName + ' 플랜 이상에서 사용할 수 있습니다.';
      notice.classList.add('show');
      setTimeout(function () {
        notice.classList.remove('show');
      }, 2500);
    }
  }

  // ── 사이드바 접기/펼치기 ──
  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    document.body.classList.toggle('sidebar-collapsed', sidebarCollapsed);
    var toggleIcon = document.querySelector('#sidebar-toggle i');
    if (toggleIcon) {
      toggleIcon.className = sidebarCollapsed
        ? 'fa-solid fa-angles-right'
        : 'fa-solid fa-angles-left';
    }
  }

  // ── 모바일 사이드바 ──
  function openMobileSidebar() {
    document.body.classList.add('sidebar-mobile-open');
  }
  function closeMobileSidebar() {
    document.body.classList.remove('sidebar-mobile-open');
  }

  // ── 초기화 ──
  function init() {
    // Dev 컨트롤 연결
    var roleSelect = document.getElementById('role-select');
    var planSelect = document.getElementById('plan-select');

    if (roleSelect) {
      roleSelect.addEventListener('change', function () {
        currentRole = this.value;
        renderSidebar();
      });
    }
    if (planSelect) {
      planSelect.addEventListener('change', function () {
        currentPlan = this.value;
        renderSidebar();
      });
    }

    // 사이드바 토글
    var toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleSidebar);
    }

    // 모바일
    var mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', openMobileSidebar);
    }
    var overlay = document.getElementById('sidebar-overlay');
    if (overlay) {
      overlay.addEventListener('click', closeMobileSidebar);
    }

    // 최초 렌더
    renderSidebar();
  }

  // DOM 로드 후 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
