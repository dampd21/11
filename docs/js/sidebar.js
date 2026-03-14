(function () {
  'use strict';

  var currentRole = 'general';
  var currentPlan = 'a';
  var sidebarCollapsed = false;
  var activeItemId = 'dashboard';
  var collapsedCats = {};

  var PLAN_ORDER = { 'a': 1, 'b': 2, 'c': 3 };
  var PLAN_NAME = { 'a': 'BASIC', 'b': 'STANDARD', 'c': 'PRO' };
  var ROLE_NAME = { 'general': '자영업자', 'marketer': '마케터' };

  function hasAccess(userPlan, requiredPlan) {
    if (requiredPlan === '-') return true;
    if (requiredPlan === 'x' || requiredPlan === 'hidden') return false;
    return (PLAN_ORDER[userPlan] || 0) >= (PLAN_ORDER[requiredPlan] || 0);
  }

  function isVisible(feature, role) {
    if (feature.status === 'hidden') return false;
    var access = feature.access[role];
    return access && access !== 'x';
  }

  function createMenuItem(featureId, feature) {
    var access = feature.access[currentRole] || 'x';
    var locked = !hasAccess(currentPlan, access);
    var isPlanned = feature.status === 'planned';
    var isApp = feature.status === 'app';
    var isDev = feature.status === 'dev';

    var item = document.createElement('a');
    item.href = '#';
    item.className = 'sidebar-item';
    item.dataset.featureId = featureId;
    if (locked) item.classList.add('is-locked');
    if (isPlanned || isApp) item.classList.add('is-muted');
    if (featureId === activeItemId) item.classList.add('is-active');

    var icon = document.createElement('span');
    icon.className = 'item-icon';
    var i = document.createElement('i');
    i.className = feature.icon;
    icon.appendChild(i);
    item.appendChild(icon);

    var text = document.createElement('span');
    text.className = 'item-text';
    text.textContent = feature.name;
    item.appendChild(text);

    var badgeArea = document.createElement('span');
    badgeArea.className = 'item-badge-area';

    if (locked) {
      var b = document.createElement('span');
      b.className = 'item-badge badge-lock';
      b.innerHTML = '<i class="fa-solid fa-lock"></i> ' + PLAN_NAME[access];
      badgeArea.appendChild(b);
    } else if (isPlanned) {
      var b = document.createElement('span');
      b.className = 'item-badge badge-planned';
      b.textContent = '준비중';
      badgeArea.appendChild(b);
    } else if (isApp) {
      var b = document.createElement('span');
      b.className = 'item-badge badge-app';
      b.textContent = '앱';
      badgeArea.appendChild(b);
    } else if (isDev) {
      var b = document.createElement('span');
      b.className = 'item-badge badge-dev';
      b.textContent = '개발중';
      badgeArea.appendChild(b);
    }

    item.appendChild(badgeArea);
    item.title = feature.name;

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

  function renderSidebar() {
    var nav = document.getElementById('sidebar-nav');
    if (!nav) return;
    nav.innerHTML = '';

    for (var c = 0; c < CATEGORIES.length; c++) {
      var cat = CATEGORIES[c];
      var visibleItems = [];
      for (var j = 0; j < cat.items.length; j++) {
        var id = cat.items[j];
        var feature = FEATURES[id];
        if (feature && isVisible(feature, currentRole)) {
          visibleItems.push(id);
        }
      }
      if (visibleItems.length === 0) continue;

      // 타이틀 없는 카테고리 (홈)
      if (!cat.title) {
        for (var k = 0; k < visibleItems.length; k++) {
          nav.appendChild(createMenuItem(visibleItems[k], FEATURES[visibleItems[k]]));
        }
        continue;
      }

      // 카테고리 헤더 (접기/펼치기)
      var isCol = collapsedCats[cat.id] || false;

      var header = document.createElement('div');
      header.className = 'sidebar-category' + (isCol ? ' is-collapsed' : '');
      header.dataset.catId = cat.id;

      var titleSpan = document.createElement('span');
      titleSpan.textContent = cat.title;
      header.appendChild(titleSpan);

      var arrow = document.createElement('span');
      arrow.className = 'cat-arrow';
      arrow.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
      header.appendChild(arrow);

      header.addEventListener('click', (function (catId) {
        return function () {
          collapsedCats[catId] = !collapsedCats[catId];
          renderSidebar();
        };
      })(cat.id));

      nav.appendChild(header);

      // 아이템 wrapper
      var wrapper = document.createElement('div');
      wrapper.className = 'sidebar-cat-items' + (isCol ? ' is-collapsed' : '');

      for (var k = 0; k < visibleItems.length; k++) {
        wrapper.appendChild(createMenuItem(visibleItems[k], FEATURES[visibleItems[k]]));
      }

      // max-height 설정 (펼침 시)
      if (!isCol) {
        wrapper.style.maxHeight = (visibleItems.length * 42) + 'px';
      }

      nav.appendChild(wrapper);
    }

    updateProfileBadges();
    updateClientSelector();
    updateMenuCount();
  }

  function updateProfileBadges() {
    var roleBadge = document.getElementById('role-badge');
    var planBadge = document.getElementById('plan-badge');
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
    var sel = document.getElementById('client-selector');
    if (!sel) return;
    sel.style.display = (currentRole === 'marketer') ? 'block' : 'none';
  }

  function updateMenuCount() {
    var counter = document.getElementById('menu-count');
    if (!counter) return;
    var nav = document.getElementById('sidebar-nav');
    var total = nav.querySelectorAll('.sidebar-item').length;
    var locked = nav.querySelectorAll('.sidebar-item.is-locked').length;
    counter.textContent = total + '개 (활성 ' + (total - locked) + ' / 잠금 ' + locked + ')';
  }

  function setActiveItem(featureId) {
    activeItemId = featureId;
    var items = document.querySelectorAll('.sidebar-item');
    for (var i = 0; i < items.length; i++) {
      if (items[i].dataset.featureId === featureId) {
        items[i].classList.add('is-active');
      } else {
        items[i].classList.remove('is-active');
      }
    }
    var display = document.getElementById('current-feature-display');
    if (display && FEATURES[featureId]) {
      display.textContent = FEATURES[featureId].name;
    }
  }

  function showUpgradeNotice(planName) {
    var notice = document.getElementById('upgrade-notice');
    if (notice) {
      notice.textContent = planName + ' 플랜 이상에서 사용할 수 있습니다.';
      notice.classList.add('show');
      setTimeout(function () { notice.classList.remove('show'); }, 2500);
    }
  }

  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    if (sidebarCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
    var icon = document.querySelector('#sidebar-toggle i');
    if (icon) {
      icon.className = sidebarCollapsed ? 'fa-solid fa-angles-right' : 'fa-solid fa-angles-left';
    }
  }

  function init() {
    var roleSelect = document.getElementById('role-select');
    var planSelect = document.getElementById('plan-select');
    if (roleSelect) {
      roleSelect.addEventListener('change', function () { currentRole = this.value; renderSidebar(); });
    }
    if (planSelect) {
      planSelect.addEventListener('change', function () { currentPlan = this.value; renderSidebar(); });
    }
    var toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);

    var mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) mobileBtn.addEventListener('click', function () { document.body.classList.add('sidebar-mobile-open'); });

    var overlay = document.getElementById('sidebar-overlay');
    if (overlay) overlay.addEventListener('click', function () { document.body.classList.remove('sidebar-mobile-open'); });

    renderSidebar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
