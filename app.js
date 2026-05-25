const SITE = 'Jade Bio';

const SOCIAL_ICONS = {
  discord: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>',
  telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5L15.8 12l-6.1 3.5z"/></svg>',
  steam: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a9.9 9.9 0 0 0-7.4 3.3l3.9 1.8a3.5 3.5 0 0 1 1.9-.6 3.5 3.5 0 1 1-1.4 6.6l-3.7 1.7A10 10 0 1 0 12 2zm-1 9.2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>',
  custom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
};

function getLevel(p) {
  return Math.min(99, Math.floor((p.views || 0) / 10) + 1);
}
const DB_KEY = 'swiftcrime_db';
const SESSION_KEY = 'swiftcrime_session';

const ROLES = ['admin', 'moderator', 'helper', 'vippro', 'vipplus', 'vip', 'player'];
const PRICES = { vip: 15, vipplus: 50, vippro: 150 };
const FUNPAY_VIP = 'https://funpay.com/lots/offer?id=69663305';

const TIER_LEVEL = { none: 0, player: 0, vip: 1, vipplus: 2, vippro: 3 };
const TIER_NEED = {
  music: 0, background: 0, link_custom: 1, link_youtube: 1, discord_id: 0, snow: 2,
  deco_wings: 1, deco_crown: 1, deco_cubes: 2, deco_halo: 2,
};
const DECORATIONS = [
  { id: 'none', label: 'Нет', min: 0 },
  { id: 'sparkle', label: '✨ Искры', min: 0 },
  { id: 'wings', label: '🪽 Крылья (PNG)', min: 1 },
  { id: 'crown', label: '👑 Корона', min: 1 },
  { id: 'halo', label: '💫 Ореол', min: 2 },
  { id: 'cubes', label: '🧊 Кубики MC', min: 2 },
];

function loadDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (raw) return migrateDB(JSON.parse(raw));
  const adminPass = hash('admin123');
  const db = {
    users: [{
      id: 1, username: 'admin', email: 'admin@local.dev', password: adminPass,
      role: 'admin', tier: 'vippro', display_name: 'Admin',
      avatar: '', background: '', bio: '', tagline: '', location: '',
      music_title: '', music_artist: '', music_url: '',
      views: 0, bg_x: 50, bg_y: 50, avatar_x: 50, avatar_y: 50, bg_blur: 28,
      created_at: today(), last_login: null, last_ip: '',
      viewedBy: [],
    }],
    invites: [{ id: 1, code: 'VL-START2025', used_by: null, created_at: today() }],
    logs: [],
    settings: { snow: false, leaves: false, theme: 'dark', siteTheme: 'jade' },
    nextId: { user: 2, invite: 2 },
  };
  saveDB(db);
  return db;
}

function saveDB(db) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return true;
  } catch (e) {
    alert('Не удалось сохранить (файл слишком большой). Сожми фон/аватар или удали старые данные.');
    return false;
  }
}
function getDB() { return loadDB(); }

function normInvite(code) {
  return String(code || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(/[^A-Z0-9-]/g, '');
}

function findInvite(db, raw) {
  const code = normInvite(raw);
  if (!code) return null;
  return db.invites.find((i) => normInvite(i.code) === code && (i.used_by == null || i.used_by === ''));
}

function ensureInviteInDB(code) {
  const c = normInvite(code);
  if (!c || !/^VL-[A-Z0-9]{4,12}$/.test(c)) return null;
  const db = getDB();
  let inv = findInvite(db, c);
  if (!inv) {
    if (!db.nextId) db.nextId = { user: 2, invite: 2 };
    inv = { id: db.nextId.invite++, code: c, used_by: null, created_at: today() };
    db.invites.push(inv);
    saveDB(db);
  }
  return inv;
}

function tierLevel(u) {
  if (!u) return 0;
  if (isStaff(u)) return 99;
  if (TIER_LEVEL[u.tier] != null) return TIER_LEVEL[u.tier];
  if (TIER_LEVEL[u.role] != null) return TIER_LEVEL[u.role];
  return 0;
}

function canUse(u, feature) {
  return tierLevel(u) >= (TIER_NEED[feature] ?? 0);
}

function canUseDeco(u, decoId) {
  const d = DECORATIONS.find((x) => x.id === decoId);
  if (!d) return true;
  return tierLevel(u) >= d.min;
}

function stopProfileMusic() {
  const a = document.getElementById('audio');
  if (a) {
    a.pause();
    a.currentTime = 0;
    a.removeAttribute('src');
    a.load();
  }
}

function hash(s) { return btoa(unescape(encodeURIComponent(s))); }

function today() { return new Date().toISOString().slice(0, 10); }

function genCode() {
  return 'VL-' + Math.random().toString(36).slice(2, 10).toUpperCase();
}

function migrateUser(u) {
  u.link_discord = u.link_discord || '';
  u.link_discord_server = u.link_discord_server || '';
  u.link_telegram = u.link_telegram || '';
  u.link_steam = u.link_steam || '';
  u.link_youtube = u.link_youtube || '';
  u.link_custom = u.link_custom || '';
  u.link_custom_label = u.link_custom_label || '';
  u.discord_id = u.discord_id || extractDiscordId(u.link_discord) || '';
  u.decoration = u.decoration || 'none';
  if (u.bg_blur === undefined || u.bg_blur === null || u.bg_blur === '') u.bg_blur = 28;
  const blurN = parseInt(u.bg_blur, 10);
  u.bg_blur = Number.isFinite(blurN) ? Math.max(0, Math.min(50, blurN)) : 28;
  return u;
}

function applySiteTheme(theme) {
  document.body.dataset.siteTheme = theme || 'jade';
}

function applyInviteGrant(user, inv) {
  if (!inv || !inv.grant_tier || inv.grant_tier === 'player') return;
  user.tier = inv.grant_tier;
  user.role = inv.grant_tier;
  if (inv.grant_deco) user.decoration = inv.grant_deco;
}

function buildWingsHtml(p) {
  if ((p.decoration || 'none') !== 'wings') return '';
  return `<img class="bio-wing bio-wing-l" src="img/wing-left.png" alt="" aria-hidden="true">
    <img class="bio-wing bio-wing-r" src="img/wing-right.png" alt="" aria-hidden="true">`;
}

function buildDecorationHtml(p) {
  const d = p.decoration || 'none';
  if (d === 'none' || d === 'wings') return '';
  return `<div class="bio-deco bio-deco-${d}" aria-hidden="true"></div>`;
}

function extractDiscordId(urlOrId) {
  if (!urlOrId) return '';
  const s = String(urlOrId).trim();
  if (/^\d{17,20}$/.test(s)) return s;
  const m = s.match(/discord(?:app)?\.com\/users\/(\d{17,20})/i);
  return m ? m[1] : '';
}

function migrateDB(db) {
  if (!db.invites || !Array.isArray(db.invites)) {
    db.invites = [{ id: 1, code: 'VL-START2025', used_by: null, created_at: today() }];
  }
  if (!db.nextId) db.nextId = { user: (db.users?.length || 1) + 1, invite: db.invites.length + 1 };
  db.invites.forEach((i) => {
    if (i.code) i.code = normInvite(i.code);
    if (i.used_by === undefined || i.used_by === false) i.used_by = null;
  });
  db.users = (db.users || []).map(migrateUser);
  if (!db.vipKeys) db.vipKeys = [];
  if (!db.settings) db.settings = { snow: false, leaves: false, theme: 'dark', siteTheme: 'jade' };
  if (!db.settings.siteTheme) db.settings.siteTheme = 'jade';
  return db;
}

function session() {
  const id = localStorage.getItem(SESSION_KEY);
  return id ? getDB().users.find((u) => u.id === parseInt(id, 10)) : null;
}

function setSession(id) {
  if (id) localStorage.setItem(SESSION_KEY, String(id));
  else localStorage.removeItem(SESSION_KEY);
}

function log(action, username, ip = 'local') {
  const db = getDB();
  db.logs.unshift({ time: new Date().toLocaleString('ru'), username, action, ip });
  if (db.logs.length > 200) db.logs.length = 200;
  saveDB(db);
}

function isStaff(u) { return u && ['admin', 'moderator', 'helper'].includes(u.role); }
function canAdmin(u) { return u && (u.role === 'admin' || u.role === 'moderator'); }

function showPage(name) {
  if (name !== 'profile') stopProfileMusic();
  document.querySelectorAll('[data-page]').forEach((el) => {
    el.classList.add('hidden');
    el.classList.remove('page-enter', 'page-active');
  });
  const page = document.querySelector(`[data-page="${name}"]`);
  if (page) {
    page.classList.remove('hidden');
    page.classList.add('page-active');
    requestAnimationFrame(() => page.classList.add('page-enter'));
  }
  window.scrollTo(0, 0);
  document.body.classList.toggle('on-profile', name === 'profile');
  if (name === 'home') renderHome();
  if (name === 'dashboard') renderDashboard();
  if (name === 'shop') renderShop();
  if (name === 'admin') renderAdmin();
  if (name === 'profile') renderProfile();
}

function publicUsers(db) {
  return (db.users || []).filter((x) => x.role !== 'admin' && x.username !== 'admin');
}

function renderHomeUsers() {
  const grid = document.getElementById('home-users-grid');
  const countEl = document.getElementById('home-user-count');
  if (!grid) return;
  const users = publicUsers(getDB());
  if (countEl) countEl.textContent = users.length.toLocaleString('ru-RU');
  if (!users.length) {
    grid.innerHTML = '<p class="home-users-empty">Пока никого — будь первым!</p>';
    return;
  }
  const sorted = [...users].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 24);
  grid.innerHTML = sorted.map((x) => {
    const ava = x.avatar || 'default-avatar.svg';
    return `<button type="button" class="home-user-chip" onclick="openProfile('${esc(x.username)}')">
      <img src="${esc(ava)}" alt="" onerror="this.src='default-avatar.svg'">
      <span>@${esc(x.username)}</span>
    </button>`;
  }).join('');
}

function claimFromHome() {
  const raw = document.getElementById('home-claim-input')?.value?.trim().toLowerCase();
  if (!raw) {
    showPage('register');
    return;
  }
  if (!/^[a-z0-9_]{3,20}$/.test(raw)) {
    alert('Ник: латиница, цифры, _, от 3 до 20 символов');
    return;
  }
  const db = getDB();
  const exists = db.users.find((x) => x.username === raw);
  if (exists && exists.role !== 'admin') {
    openProfile(raw);
    return;
  }
  showPage('register');
  const inv = document.querySelector('[name="invite"]');
  if (inv && !inv.value) inv.placeholder = 'нужен инвайт от админа';
  const un = document.querySelector('[name="username"]');
  if (un) un.value = raw;
}

function renderHome() {
  const u = session();
  const nav = document.getElementById('nav-home');
  renderHomeUsers();
  if (!nav) return;
  if (u) {
    nav.innerHTML = `
      <button class="link-btn" onclick="openProfile('${u.username}')">Мой био</button>
      <button class="link-btn" onclick="showPage('dashboard')">Кабинет</button>
      <button class="link-btn" onclick="showPage('shop')">Магазин</button>
      ${isStaff(u) ? '<button class="link-btn" onclick="showPage(\'admin\')">Админ</button>' : ''}
      <button class="pill-btn" onclick="logout()">Выход</button>`;
    document.getElementById('hero-cta').innerHTML = `
      <button class="pill-btn lg" onclick="showPage('dashboard')">Настроить био</button>
      <button class="pill-btn lg dark" onclick="openProfile('${u.username}')">Смотреть страницу</button>`;
  } else {
    nav.innerHTML = `
      <button class="link-btn" onclick="showPage('login')">Войти</button>
      <button class="pill-btn" onclick="showPage('register')">Регистрация</button>`;
    document.getElementById('hero-cta').innerHTML = `
      <button class="pill-btn lg" onclick="showPage('register')">Создать био</button>
      <button class="pill-btn lg outline" onclick="showPage('login')">Войти</button>`;
  }
}

function switchDashTab(tab) {
  document.querySelectorAll('.dash-tabs [data-dash-tab]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.dashTab === tab);
  });
  document.querySelectorAll('[data-dash-panel]').forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.dashPanel === tab);
  });
}

function previewDashFile(input, kind) {
  const file = input.files?.[0];
  if (!file) return;
  const r = new FileReader();
  r.onload = () => {
    if (kind === 'bg') {
      const img = document.getElementById('dash-bg-img');
      const ph = document.querySelector('.dash-preview-placeholder');
      if (img) {
        img.src = r.result;
        img.style.display = 'block';
      }
      if (ph) ph.style.display = 'none';
    } else {
      const img = document.getElementById('dash-ava-preview');
      if (img) img.src = r.result;
    }
  };
  r.readAsDataURL(file);
}

function renderDashboard() {
  const u = session();
  if (!u) return showPage('login');
  const f = document.getElementById('dash-form');
  const navDash = document.getElementById('dash-nav');
  if (navDash) {
    navDash.innerHTML = `
      <button class="active" type="button" onclick="showPage('dashboard')">Профиль</button>
      <button type="button" onclick="showPage('shop')">Магазин VIP</button>
      ${isStaff(u) ? '<button type="button" onclick="showPage(\'admin\')">Админ</button>' : ''}`;
  }
  if (!f) return;
  switchDashTab('profile');
  f.display_name.value = u.display_name || u.username;
  f.tagline.value = u.tagline || '';
  f.location.value = u.location || '';
  f.bio.value = u.bio || '';
  f.music_title.value = u.music_title || '';
  f.music_artist.value = u.music_artist || '';
  if (f.discord_id) f.discord_id.value = u.discord_id || '';
  if (f.link_discord) f.link_discord.value = u.link_discord || '';
  if (f.link_discord_server) f.link_discord_server.value = u.link_discord_server || '';
  if (f.link_telegram) f.link_telegram.value = u.link_telegram || '';
  if (f.link_steam) f.link_steam.value = u.link_steam || '';
  if (f.link_youtube) f.link_youtube.value = u.link_youtube || '';
  if (f.link_custom) f.link_custom.value = u.link_custom || '';
  if (f.link_custom_label) f.link_custom_label.value = u.link_custom_label || '';
  const link = document.getElementById('dash-link');
  link.textContent = '/' + u.username;
  link.onclick = (e) => { e.preventDefault(); openProfile(u.username); };
  document.getElementById('dash-views').textContent = u.views || 0;
  const uidEl = document.getElementById('dash-uid');
  if (uidEl) uidEl.textContent = u.id;

  const tierNames = ['Игрок', 'VIP', 'VIP+', 'VIP Pro'];
  const tl = Math.min(3, tierLevel(u));
  let hint = document.getElementById('tier-hint');
  if (!hint) {
    hint = document.createElement('p');
    hint.id = 'tier-hint';
    hint.className = 'preview-link';
    document.getElementById('dash-msg')?.before(hint);
  }
  if (hint) {
    hint.innerHTML = `Статус: <strong>${tierNames[tl] || 'Игрок'}</strong> · музыка и фон доступны всем`;
  }

  document.querySelectorAll('[data-vip-only]').forEach((el) => {
    const feat = el.dataset.vipOnly;
    const locked = !canUse(u, feat);
    el.classList.toggle('vip-locked', locked);
    el.querySelectorAll('input,textarea,select').forEach((inp) => { inp.disabled = locked; });
  });

  const decoSel = document.querySelector('[name="decoration"]');
  if (decoSel) {
    decoSel.innerHTML = DECORATIONS.filter((d) => canUseDeco(u, d.id))
      .map((d) => `<option value="${d.id}">${d.label}</option>`).join('');
    decoSel.value = u.decoration || 'none';
  }

  initFileUploads();

  const avPrev = document.getElementById('dash-ava-preview');
  if (avPrev) avPrev.src = u.avatar || 'default-avatar.svg';
  const bgPrev = document.getElementById('dash-bg-img');
  const blurR = document.getElementById('bg-blur-range');
  const blurV = document.getElementById('bg-blur-val');
  if (blurR) {
    blurR.value = u.bg_blur ?? 28;
    if (blurV) blurV.textContent = blurR.value;
  }
  const bgPh = document.querySelector('.dash-preview-placeholder');
  if (u.background && bgPrev) {
    bgPrev.src = u.background;
    bgPrev.style.display = 'block';
    if (bgPh) bgPh.style.display = 'none';
  } else if (bgPrev) {
    bgPrev.style.display = 'none';
    if (bgPh) bgPh.style.display = '';
  }
}

function fileToDataUrl(file, cb, asImage) {
  if (!asImage) {
    const r = new FileReader();
    r.onload = () => cb(r.result);
    r.readAsDataURL(file);
    return;
  }
  const r = new FileReader();
  r.onload = () => {
    const img = new Image();
    img.onload = () => {
      const maxW = 1600;
      let w = img.width;
      let h = img.height;
      if (w > maxW) {
        h = Math.round((h * maxW) / w);
        w = maxW;
      }
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      cb(c.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => cb(r.result);
    img.src = r.result;
  };
  r.readAsDataURL(file);
}

function saveDashboard(e) {
  e.preventDefault();
  const u = session();
  if (!u) return;
  const db = getDB();
  const user = db.users.find((x) => x.id === u.id);
  const f = e.target;

  user.display_name = f.display_name.value;
  user.tagline = f.tagline.value;
  user.location = f.location.value;
  user.bio = f.bio.value;
  user.music_title = f.music_title.value;
  user.music_artist = f.music_artist.value;
  user.discord_id = (f.discord_id?.value || '').trim().replace(/\D/g, '') || extractDiscordId(f.link_discord?.value);
  user.link_discord = f.link_discord?.value || '';
  user.link_discord_server = f.link_discord_server?.value || '';
  user.link_telegram = f.link_telegram?.value || '';
  user.link_steam = f.link_steam?.value || '';
  user.link_youtube = f.link_youtube?.value || '';
  user.link_custom = f.link_custom?.value || '';
  user.link_custom_label = f.link_custom_label?.value || '';

  user.decoration = f.decoration?.value || 'none';
  user.bg_blur = Math.max(0, Math.min(50, parseInt(f.bg_blur?.value, 10) || 0));

  const done = () => {
    if (!saveDB(db)) return;
    setSession(user.id);
    log('Профиль сохранён', user.username);
    document.getElementById('dash-msg').innerHTML = '<div class="alert alert-success">Сохранено! Обнови страницу био (F5).</div>';
  };

  let pending = 0;
  const check = () => { if (--pending <= 0) done(); };

  if (f.avatar.files[0]) {
    pending++;
    fileToDataUrl(f.avatar.files[0], (d) => { user.avatar = d; check(); }, true);
  }
  if (f.background.files[0]) {
    pending++;
    fileToDataUrl(f.background.files[0], (d) => { user.background = d; check(); }, true);
  }
  if (f.music.files[0]) {
    pending++;
    fileToDataUrl(f.music.files[0], (d) => { user.music_url = d; check(); });
  }
  if (pending === 0) done();
}

function renderShop() {
  const u = session();
  document.getElementById('shop-grid').querySelectorAll('[data-tier]').forEach((btn) => {
    if (btn.hasAttribute('disabled')) return;
    btn.onclick = () => buyTier(btn.dataset.tier);
    btn.disabled = !u;
    btn.textContent = u ? 'Купить на FunPay' : 'Войти';
    if (!u) btn.onclick = () => showPage('login');
  });
}

function activateVip(tier) {
  const u = session();
  if (!u) return;
  const db = getDB();
  const user = db.users.find((x) => x.id === u.id);
  user.tier = tier;
  if (!isStaff(user)) user.role = tier;
  saveDB(db);
  setSession(user.id);
  log(`VIP ${tier}`, user.username);
  document.getElementById('shop-msg').innerHTML =
    `<div class="alert alert-success">VIP ${tier.toUpperCase()} активирован!</div>`;
}

function buyTier(tier) {
  const u = session();
  if (!u) return showPage('login');

  if (tier === 'vip') {
    window.open(FUNPAY_VIP, '_blank', 'noopener');
    document.getElementById('shop-msg').innerHTML =
      `<div class="alert alert-info">Оплати на FunPay. После оплаты введи код из заказа (или ник) — админ выдаст VIP, либо нажми «Активировать» если код есть.</div>`;
    const key = prompt('Код активации с FunPay (если выдали автоматически):');
    if (key && redeemVipKey(key.trim())) return;
    return;
  }

  document.getElementById('shop-msg').innerHTML =
    '<div class="alert alert-info">VIP+ и VIP Pro скоро. Пока только VIP за 15₽ на FunPay.</div>';
}

function redeemVipKey(key) {
  const db = getDB();
  const k = key.toUpperCase().trim();
  const row = (db.vipKeys || []).find((x) => x.code.toUpperCase() === k && !x.used_by);
  if (!row) return false;
  const u = session();
  if (!u) return false;
  row.used_by = u.id;
  activateVip(row.tier || 'vip');
  saveDB(db);
  return true;
}

function renderAdmin() {
  const u = session();
  if (!canAdmin(u)) return showPage('home');
  const db = getDB();
  const players = db.users.filter((x) => x.username !== 'admin');

  document.getElementById('stat-users').textContent = players.length;
  document.getElementById('stat-invites').textContent = db.invites.filter((i) => !i.used_by).length;

  document.getElementById('admin-players').innerHTML = players.map((p) => `
    <tr>
      <td><span class="key-code">${p.id}</span></td>
      <td><a href="#" onclick="openProfile('${p.username}');return false" style="color:#67e8f9">${p.username}</a></td>
      <td>${p.email}</td>
      <td>
        <select onchange="setRole(${p.id},this.value)" class="btn-sm">
          ${ROLES.filter(r => r !== 'admin').map((r) => `<option value="${r}" ${p.role===r?'selected':''}>${r}</option>`).join('')}
        </select>
      </td>
      <td>${p.tier && p.tier !== 'none' ? p.tier : '—'}</td>
      <td>${p.views || 0}</td>
      <td style="font-size:0.7rem">${p.last_ip || '—'}</td>
      <td class="admin-actions">
        <button type="button" class="btn-sm" onclick="grantVip(${p.id},'vip')">VIP</button>
        <button type="button" class="btn-sm" onclick="grantVip(${p.id},'vipplus')">VIP+</button>
        <button type="button" class="btn-sm" onclick="grantVip(${p.id},'vippro')">Pro</button>
        <button type="button" class="btn-sm danger" onclick="removeVip(${p.id})">Сброс</button>
      </td>
    </tr>`).join('');

  document.getElementById('admin-invites').innerHTML = db.invites.slice(0, 30).map((i) => {
    const used = db.users.find((u) => u.id === i.used_by);
    const safe = i.code.replace(/'/g, '');
    return `<tr>
      <td><span class="key-code">${esc(i.code)}</span>
        <button type="button" class="btn-sm" onclick="copyInviteCode('${safe}')">Код</button>
        <button type="button" class="btn-sm" onclick="copyInviteLink('${safe}')">Ссылка</button>
      </td>
      <td>${i.grant_tier ? esc(i.grant_tier) : 'игрок'}</td>
      <td>${i.used_by ? 'Да' : 'Нет'}</td>
      <td>${used ? used.username : '—'}</td>
      <td>${i.created_at}</td>
    </tr>`;
  }).join('');

  document.getElementById('admin-logs').innerHTML = db.logs.slice(0, 50).map((l) =>
    `<tr><td>${l.time}</td><td>${l.username}</td><td>${l.action}</td><td>${l.ip}</td></tr>`
  ).join('');

  if (u.role === 'admin') {
    document.getElementById('fx-panel').classList.remove('hidden');
    document.getElementById('fx-snow').checked = db.settings.snow;
    document.getElementById('fx-leaves').checked = db.settings.leaves;
    document.getElementById('fx-theme').value = db.settings.theme || 'dark';
    const st = document.getElementById('site-theme');
    if (st) st.value = db.settings.siteTheme || 'jade';
  } else {
    document.getElementById('fx-panel').classList.add('hidden');
  }
}

function copyText(t) {
  navigator.clipboard?.writeText(t).then(() => {
    document.getElementById('admin-msg').innerHTML = '<div class="alert alert-success">Скопировано!</div>';
  }).catch(() => prompt('Скопируй:', t));
}

function copyInviteCode(code) {
  copyText(normInvite(code));
}

function copyInviteLink(code) {
  const base = location.href.split('?')[0].replace(/[#?].*$/, '');
  copyText(`${base}?invite=${encodeURIComponent(normInvite(code))}`);
}

function createInvites() {
  const n = parseInt(document.getElementById('invite-count').value, 10) || 1;
  const grant = document.getElementById('invite-grant')?.value || 'player';
  const grantDeco = document.getElementById('invite-deco')?.value || '';
  const db = getDB();
  const baseUrl = location.href.split('?')[0].replace(/[#?].*$/, '');
  const codes = [];
  const links = [];
  for (let i = 0; i < Math.min(n, 20); i++) {
    const code = normInvite(genCode());
    db.invites.push({
      id: db.nextId.invite++, code, used_by: null, created_at: today(),
      grant_tier: grant === 'player' ? null : grant,
      grant_deco: grantDeco || null,
    });
    codes.push(code);
    links.push(`${baseUrl}?invite=${encodeURIComponent(code)}`);
  }
  saveDB(db);
  document.getElementById('admin-msg').innerHTML =
    `<div class="alert alert-success">Созданы! Отправь другу <b>ссылку</b> (не только код):</div>
     <div class="invite-box">${links.map((l, i) => `<div style="margin:8px 0"><b>${codes[i]}</b><br><small>${l}</small></div>`).join('')}</div>`;
  renderAdmin();
}

function createVipKeys() {
  const db = getDB();
  if (!db.vipKeys) db.vipKeys = [];
  const code = 'VIP-' + Math.random().toString(36).slice(2, 10).toUpperCase();
  db.vipKeys.push({ code, tier: 'vip', used_by: null, created_at: today() });
  saveDB(db);
  document.getElementById('admin-msg').innerHTML =
    `<div class="alert alert-success">VIP-ключ для FunPay: <span class="key-code">${code}</span> (выдай покупателю)</div>`;
}

function grantVip(id, tier) {
  const db = getDB();
  const u = db.users.find((x) => x.id === id);
  if (!u || u.username === 'admin') return;
  u.tier = tier;
  u.role = tier;
  saveDB(db);
  log(`VIP ${tier} → ${u.username}`, session()?.username || 'admin');
  document.getElementById('admin-msg').innerHTML =
    `<div class="alert alert-success">${u.username} получил ${tier.toUpperCase()}</div>`;
  renderAdmin();
}

function setRole(id, role) {
  const db = getDB();
  const u = db.users.find((x) => x.id === id);
  if (u && u.username !== 'admin') {
    if (role === 'player') {
      u.role = 'player';
      u.tier = 'none';
    } else if (['vip', 'vipplus', 'vippro'].includes(role)) {
      u.role = role;
      u.tier = role;
    } else {
      u.role = role;
    }
    saveDB(db);
    log(`Роль ${u.username} → ${role}`, session()?.username || 'admin');
    renderAdmin();
  }
}

function removeVip(id) {
  const db = getDB();
  const u = db.users.find((x) => x.id === id);
  if (u && !isStaff(u)) { u.tier = 'none'; u.role = 'player'; saveDB(db); renderAdmin(); }
}

function saveFx() {
  const db = getDB();
  db.settings.snow = document.getElementById('fx-snow').checked;
  db.settings.leaves = document.getElementById('fx-leaves').checked;
  db.settings.theme = document.getElementById('fx-theme').value;
  db.settings.siteTheme = document.getElementById('site-theme')?.value || 'jade';
  saveDB(db);
  applySiteTheme(db.settings.siteTheme);
  document.getElementById('admin-msg').innerHTML = '<div class="alert alert-success">Тема и эффекты сохранены</div>';
}

function initFileUploads() {
  document.querySelectorAll('.file-upload input[type=file]').forEach((inp) => {
    const wrap = inp.closest('.file-upload');
    if (!wrap || wrap.dataset.bound) return;
    wrap.dataset.bound = '1';
    const nameEl = wrap.querySelector('.file-name');
    inp.addEventListener('change', () => {
      const f = inp.files[0];
      if (nameEl) nameEl.textContent = f ? f.name : 'Файл не выбран';
    });
  });
}

let profileUser = null;

function openProfile(username) {
  const db = getDB();
  profileUser = db.users.find((u) => u.username === username.toLowerCase());
  if (!profileUser || profileUser.role === 'admin') {
    alert('Профиль не найден');
    return;
  }
  const me = session();
  if (!me || me.id !== profileUser.id) {
    const vid = localStorage.getItem('visitor_id') || (() => {
      const v = 'v_' + Math.random().toString(36).slice(2);
      localStorage.setItem('visitor_id', v);
      return v;
    })();
    if (!profileUser.viewedBy) profileUser.viewedBy = [];
    if (!profileUser.viewedBy.includes(vid)) {
      profileUser.viewedBy.push(vid);
      profileUser.views = (profileUser.views || 0) + 1;
      saveDB(db);
    }
  }
  showPage('profile');
}

function renderProfile() {
  const p = profileUser;
  if (!p) return;
  const db = getDB();
  const settings = db.settings;
  const me = session();
  const level = getLevel(p);
  const avatarSrc = p.avatar || 'default-avatar.svg';
  const tagline = p.tagline || p.bio?.split('\n')[0] || '';
  const hasMusic = !!(p.music_url || p.music_title);
  const showBg = !!p.background;
  const discordId = p.discord_id || extractDiscordId(p.link_discord);

  const root = document.getElementById('profile-root');
  root.innerHTML = `
    ${settings.snow && tierLevel(p) >= 2 ? '<canvas id="snow-canvas"></canvas>' : ''}
    ${settings.leaves && tierLevel(p) >= 2 ? '<canvas id="leaves-canvas"></canvas>' : ''}
    <div class="bio-page bio-glass-page">
      <img class="bio-bg-img" id="bio-bg-img" alt="" style="display:none">
      <img class="bio-bg-blur-img" id="bio-bg-blur-img" alt="" style="display:none">
      <div class="bio-bg-fallback"></div>
      <div class="bio-bg-layer"></div>
      <div class="bio-vol-dock" id="bio-vol-dock">
        <button type="button" class="bio-vol-dock-btn" id="vol-btn" title="Громкость" aria-label="Громкость">
          <svg class="vol-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
        </button>
        <input type="range" class="bio-vol-dock-range" id="vol-slider-dock" min="0" max="100" value="60" aria-label="Уровень громкости">
      </div>
      ${me && me.id === p.id ? '<button class="pill-btn dark bio-edit-btn" onclick="showPage(\'dashboard\')">✎ Редактировать</button>' : ''}
      <div class="bio-glass-wrap">
        <div class="bio-glass-card">
          <div class="bio-badges">${buildBadges(p)}</div>
          <div class="bio-avatar-zone${(p.decoration || '') === 'wings' ? ' has-wings' : ''}">
            ${buildDecorationHtml(p)}
            <div class="bio-avatar-wrap">
              ${buildWingsHtml(p)}
              <img class="bio-avatar" id="bio-avatar-img" src="${avatarSrc}" alt="">
            </div>
          </div>
          <h1 class="bio-name">${esc(p.display_name || p.username)}</h1>
          ${tagline ? `<p class="bio-tagline">${esc(tagline)}<span class="bio-cursor">|</span></p>` : ''}
          <div class="bio-uid-line">
            <span class="uid-mini">${p.id}</span>
            <span>UID <strong>${p.id}</strong> · Ур. <strong>${level}</strong> · ${p.views || 0} просм.</span>
          </div>
          ${p.bio ? `<p class="bio-desc-lg">${esc(p.bio)}</p>` : ''}
          ${p.location ? `<p class="bio-location">${esc(p.location)}</p>` : ''}
          ${buildSocialRow(p)}
          <div id="discord-widget" class="bio-discord-widget hidden"></div>
          <div id="lanyard-activity" class="bio-activity-panel hidden"></div>
          ${hasMusic ? `
          <div class="bio-track-panel">
            <img class="bio-track-art" id="track-art" src="${avatarSrc}" alt="">
            <div class="bio-track-info">
              <div class="bio-track-title">${esc(p.music_title || 'Трек')}</div>
              <div class="bio-track-artist">by ${esc(p.music_artist || p.username)}</div>
              <div class="bio-progress-row">
                <span id="cur">0:00</span>
                <div class="bio-progress" id="prog"><div class="bio-progress-fill" id="fill"></div></div>
                <span id="dur">0:00</span>
              </div>
            </div>
          </div>
          <div class="bio-player-bar">
            <button type="button" class="bio-bar-vol" id="vol-bar" title="Громкость">🔊</button>
            <div class="bio-bar-now">
              <span class="bio-bar-label">Now playing:</span>
              <span id="now-label">${esc(p.music_title || '—')}</span>
            </div>
            <input type="range" class="bio-vol-slider" id="vol-slider" min="0" max="100" value="60">
            <div class="bio-bar-controls">
              <button type="button" class="bio-ctrl-btn" id="prev">⏮</button>
              <button type="button" class="bio-ctrl-btn play" id="play">▶</button>
              <button type="button" class="bio-ctrl-btn" id="next">⏭</button>
            </div>
          </div>
          ${p.music_url ? '<audio id="audio" preload="auto"></audio>' : ''}` : ''}
        </div>
      </div>
    </div>`;

  if (showBg) {
    const bgImg = document.getElementById('bio-bg-img');
    const bgBlur = document.getElementById('bio-bg-blur-img');
    const onBg = () => {
      applyProfileBgBlur(p);
      const fb = document.querySelector('.bio-bg-fallback');
      if (fb) fb.style.display = 'none';
    };
    bgImg.onload = onBg;
    bgBlur.onload = onBg;
    bgImg.src = p.background;
    bgBlur.src = p.background;
    if (bgImg.complete) onBg();
  } else {
    applyProfileBgBlur(p);
  }

  const av = document.getElementById('bio-avatar-img');
  if (p.avatar) av.src = p.avatar;

  if ((settings.snow && tierLevel(p) >= 2) || (settings.leaves && tierLevel(p) >= 2)) {
    window.FX_SNOW = settings.snow && tierLevel(p) >= 2;
    window.FX_LEAVES = settings.leaves && tierLevel(p) >= 2;
    if (!document.querySelector('script[src="effects.js"]')) {
      const s = document.createElement('script');
      s.src = 'effects.js';
      document.body.appendChild(s);
    }
  }
  if (discordId) {
    loadLanyard(discordId, p);
  } else if (p.link_discord) {
    const w = document.getElementById('discord-widget');
    if (w) {
      w.classList.remove('hidden');
      w.innerHTML = discordWidgetFallback(p, '');
    }
  }
  if (hasMusic) initPlayer(true);
  else {
    const dock = document.getElementById('bio-vol-dock');
    if (dock) dock.classList.add('hidden');
  }
}

function applyProfileBgBlur(p) {
  const blurPx = Math.max(0, Math.min(50, parseInt(p.bg_blur, 10) ?? 28));
  const bgImg = document.getElementById('bio-bg-img');
  const bgBlur = document.getElementById('bio-bg-blur-img');
  if (!bgImg || !bgBlur) return;
  if (!p.background) {
    bgImg.style.display = 'none';
    bgBlur.style.display = 'none';
    return;
  }
  if (blurPx <= 0) {
    bgImg.style.display = 'block';
    bgImg.style.filter = 'brightness(0.55)';
    bgBlur.style.display = 'none';
  } else {
    bgImg.style.display = 'none';
    bgBlur.style.display = 'block';
    bgBlur.style.filter = `blur(${blurPx}px) brightness(0.42)`;
  }
}

function buildBadges(p) {
  const icons = [];
  if (p.role === 'admin') icons.push('👑');
  if (['moderator', 'helper'].includes(p.role)) icons.push('🛡');
  const t = p.tier !== 'none' ? p.tier : '';
  if (t === 'vippro') icons.push('💎');
  else if (t === 'vipplus') icons.push('⭐');
  else if (t === 'vip') icons.push('✦');
  if (getLevel(p) >= 10) icons.push('🔥');
  if (!icons.length) icons.push('◇');
  return icons.map((i) => `<span class="bio-badge-ico" title="">${i}</span>`).join('');
}

function buildSocialRow(p) {
  const items = [];
  if (p.link_discord) items.push(socialIcon(p.link_discord, 'discord', 'Discord'));
  if (p.link_telegram) items.push(socialIcon(p.link_telegram, 'telegram', 'Telegram'));
  if (canUse(p, 'link_youtube') && p.link_youtube) items.push(socialIcon(p.link_youtube, 'youtube', 'YouTube'));
  if (p.link_steam) items.push(socialIcon(p.link_steam, 'steam', 'Steam'));
  if (canUse(p, 'link_custom') && p.link_custom) items.push(socialIcon(p.link_custom, 'custom', p.link_custom_label || 'Ссылка'));
  if (p.link_discord_server) items.push(socialIcon(p.link_discord_server, 'discord', 'Сервер'));
  if (!items.length) return '';
  return `<div class="bio-social-row">${items.join('')}</div>`;
}

function socialIcon(href, type, label) {
  const icon = SOCIAL_ICONS[type] || SOCIAL_ICONS.custom;
  return `<a href="${escUrl(href)}" class="bio-social-btn ${type}" target="_blank" rel="noopener" title="${esc(label)}">${icon}</a>`;
}

const STATUS_COLORS = { online: '#23a55a', idle: '#f0b232', dnd: '#f23f43', offline: '#80848e' };

async function loadLanyard(discordId, profile) {
  const widget = document.getElementById('discord-widget');
  const activityEl = document.getElementById('lanyard-activity');
  if (!widget) return;
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
    const json = await res.json();
    if (!json.success || !json.data) {
      widget.classList.remove('hidden');
      widget.innerHTML = discordWidgetFallback(profile, discordId);
      return;
    }
    const d = json.data;
    const user = d.discord_user;
    const status = d.discord_status || 'offline';
    const addUrl = profile.link_discord || `https://discord.com/users/${discordId}`;

    widget.classList.remove('hidden');
    widget.innerHTML = `
      <div class="dcw-top">
        <div class="dcw-user">
          <div class="dcw-ava-wrap">
            <img src="${esc(user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64` : 'default-avatar.svg')}" alt="">
            <span class="dcw-dot" style="background:${STATUS_COLORS[status] || STATUS_COLORS.offline}"></span>
          </div>
          <div class="dcw-text">
            <div class="dcw-handle">@${esc(user.username)}</div>
            <div class="dcw-status">${esc(lanyardStatusText(d))}</div>
          </div>
        </div>
        <a href="${escUrl(addUrl)}" class="dcw-add" target="_blank" rel="noopener">Add on Discord →</a>
      </div>`;

    const act = pickLanyardActivity(d);
    if (act && activityEl) {
      activityEl.classList.remove('hidden');
      activityEl.innerHTML = renderLanyardActivity(act);
    }
  } catch {
    widget.classList.remove('hidden');
    widget.innerHTML = discordWidgetFallback(profile, discordId);
  }
}

function discordWidgetFallback(profile, discordId) {
  const addUrl = profile.link_discord || `https://discord.com/users/${discordId}`;
  return `
    <div class="dcw-top">
      <div class="dcw-user">
        <div class="dcw-ava-wrap">
          <img src="${profile.avatar || 'default-avatar.svg'}" alt="">
          <span class="dcw-dot" style="background:#80848e"></span>
        </div>
        <div class="dcw-text">
          <div class="dcw-handle">@${esc(profile.username)}</div>
          <div class="dcw-status">Подключи Lanyard для статуса</div>
        </div>
      </div>
      <a href="${escUrl(addUrl)}" class="dcw-add" target="_blank" rel="noopener">Add on Discord →</a>
    </div>`;
}

function lanyardStatusText(d) {
  if (d.activities?.length) {
    const a = d.activities.find((x) => x.type !== 4) || d.activities[0];
    if (a?.type === 0) return `Playing ${a.name}`;
    if (a?.type === 2) return `Listening to ${a.name}`;
    if (a?.type === 3) return `Watching ${a.name}`;
    if (a?.name) return a.name;
  }
  if (d.listening_to_spotify && d.spotify) return `Listening to ${d.spotify.song}`;
  const map = { online: 'Online', idle: 'Idle', dnd: 'Do Not Disturb', offline: 'Offline' };
  return map[d.discord_status] || 'Offline';
}

function pickLanyardActivity(d) {
  if (d.listening_to_spotify && d.spotify) return { kind: 'spotify', data: d.spotify };
  const act = (d.activities || []).find((x) => x.type === 0);
  if (act) return { kind: 'game', data: act };
  return null;
}

function activityAssetUrl(a) {
  const id = a.assets?.large_image;
  if (!id) return '';
  if (id.startsWith('mp:external/')) return `https://media.discordapp.net/external/${id.slice(12)}`;
  if (id.startsWith('spotify:')) return `https://i.scdn.co/image/${id.slice(8)}`;
  if (a.application_id) return `https://cdn.discordapp.com/app-assets/${a.application_id}/${id}.png`;
  return '';
}

function renderLanyardActivity(act) {
  if (act.kind === 'spotify') {
    const s = act.data;
    const art = s.album_art_url || '';
    return `
      <div class="act-row">
        ${art ? `<img class="act-big-icon" src="${esc(art)}" alt="">` : '<div class="act-big-icon act-placeholder">♪</div>'}
        <div class="act-details">
          <div class="act-name">${esc(s.song)}</div>
          <div class="act-sub">${esc(s.artist)}</div>
          <div class="act-sub dim">on ${esc(s.album)}</div>
        </div>
      </div>`;
  }
  const a = act.data;
  const img = activityAssetUrl(a);
  const sub = [a.details, a.state].filter(Boolean).join(' · ');
  return `
    <div class="act-row">
      ${img ? `<img class="act-big-icon" src="${esc(img)}" alt="" onerror="this.style.display='none'">` : '<div class="act-big-icon act-placeholder">🎮</div>'}
      <div class="act-details">
        <div class="act-name">${esc(a.name)}</div>
        ${sub ? `<div class="act-sub">${esc(sub)}</div>` : ''}
      </div>
    </div>`;
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function tierBadge(p) {
  const t = p.tier !== 'none' ? p.tier : (['vip','vipplus','vippro'].includes(p.role) ? p.role : '');
  return t ? `<span class="role-pill ${t}">${t.toUpperCase()}</span>` : '';
}

function escUrl(url) {
  if (!url) return '#';
  if (!/^https?:\/\//i.test(url)) return 'https://' + url;
  return url.replace(/"/g, '&quot;');
}

function initPlayer(autoplay) {
  const audio = document.getElementById('audio');
  if (!audio) return;
  const p = profileUser;
  if (p && p.music_url) audio.src = p.music_url;
  audio.loop = true;

  const play = document.getElementById('play');
  const fill = document.getElementById('fill');
  const cur = document.getElementById('cur');
  const dur = document.getElementById('dur');
  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  };
  const setPlaying = (on) => { if (play) play.textContent = on ? '⏸' : '▶'; };

  audio.onloadedmetadata = () => { if (dur) dur.textContent = fmt(audio.duration); };
  audio.ontimeupdate = () => {
    if (fill) fill.style.width = ((audio.currentTime / audio.duration) * 100 || 0) + '%';
    if (cur) cur.textContent = fmt(audio.currentTime);
  };
  document.getElementById('prog')?.addEventListener('click', (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
  });
  play.onclick = () => {
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };
  document.getElementById('prev')?.addEventListener('click', () => { audio.currentTime = 0; });
  document.getElementById('next')?.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
  });
  const savedVol = parseInt(localStorage.getItem('jade_bio_vol') || '60', 10);
  const setVol = (pct) => {
    const v = Math.max(0, Math.min(100, pct)) / 100;
    audio.volume = v;
    audio.muted = v <= 0;
    localStorage.setItem('jade_bio_vol', String(Math.round(v * 100)));
    syncVolSliders(Math.round(v * 100));
    updateVolIcon(v);
  };
  const syncVolSliders = (val) => {
    document.querySelectorAll('#vol-slider, #vol-slider-dock').forEach((el) => {
      if (el) el.value = val;
    });
  };
  const updateVolIcon = (v) => {
    const btn = document.getElementById('vol-btn');
    if (!btn) return;
    btn.classList.toggle('muted', v <= 0 || audio.muted);
  };
  document.getElementById('vol-btn')?.addEventListener('click', () => {
    if (audio.volume > 0 && !audio.muted) {
      audio.dataset.prevVol = audio.volume;
      setVol(0);
    } else {
      const prev = parseFloat(audio.dataset.prevVol || '0.6');
      setVol(Math.round((prev || 0.6) * 100));
      audio.muted = false;
    }
  });
  document.getElementById('vol-bar')?.addEventListener('click', () => {
    document.getElementById('vol-btn')?.click();
  });
  [document.getElementById('vol-slider'), document.getElementById('vol-slider-dock')].forEach((slider) => {
    if (!slider) return;
    slider.addEventListener('input', () => setVol(parseInt(slider.value, 10)));
  });
  setVol(savedVol);

  const dock = document.getElementById('bio-vol-dock');
  if (dock) dock.classList.remove('hidden');

  if (autoplay && p.music_url) {
    const tryPlay = () => {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    if (audio.readyState >= 2) tryPlay();
    else audio.addEventListener('canplay', tryPlay, { once: true });
    document.body.addEventListener('click', tryPlay, { once: true });
  }
}

function doLogin(e) {
  e.preventDefault();
  const login = e.target.login.value.trim();
  const pass = e.target.password.value;
  const db = getDB();
  const u = db.users.find((x) => x.username === login.toLowerCase() || x.email === login);
  if (!u || u.password !== hash(pass)) {
    document.getElementById('login-msg').innerHTML = '<div class="alert alert-error">Неверный логин или пароль</div>';
    return;
  }
  u.last_login = new Date().toLocaleString('ru');
  u.last_ip = '127.0.0.1';
  saveDB(db);
  setSession(u.id);
  log('Вход', u.username);
  const page = u.role === 'admin' ? 'admin' : 'dashboard';
  document.getElementById('login-msg').innerHTML =
    `<div class="alert alert-success">Добро пожаловать, ${esc(u.display_name || u.username)}!</div>`;
  showPage(page);
}

function doRegister(e) {
  e.preventDefault();
  const f = e.target;
  const uname = f.username.value.trim().toLowerCase();
  const inviteRaw = f.invite.value;

  if (!/^[a-z0-9_]{3,20}$/.test(uname)) {
    document.getElementById('reg-msg').innerHTML = '<div class="alert alert-error">Ник: 3-20 символов, a-z, 0-9, _</div>';
    return;
  }
  ensureInviteInDB(inviteRaw);
  const db2 = getDB();
  const inv = findInvite(db2, inviteRaw);
  if (!inv) {
    document.getElementById('reg-msg').innerHTML =
      '<div class="alert alert-error">Неверный или уже использованный инвайт. Открой <b>ссылку</b> от админа (?invite=...), не только код.</div>';
    return;
  }
  if (db2.users.some((u) => u.username === uname || u.email === f.email.value)) {
    document.getElementById('reg-msg').innerHTML = '<div class="alert alert-error">Ник или email заняты</div>';
    return;
  }

  const id = db2.nextId.user++;
  const user = {
    id, username: uname, email: f.email.value, password: hash(f.password.value),
    role: 'player', tier: 'none', display_name: f.display_name.value || uname,
    avatar: '', background: '', bio: '', tagline: '', location: '',
    music_title: '', music_artist: '', music_url: '',
    views: 0, bg_x: 50, bg_y: 50, avatar_x: 50, avatar_y: 50, bg_blur: 28,
    discord_id: '', link_discord: '', link_discord_server: '', link_telegram: '', link_steam: '',
    link_youtube: '', link_custom: '', link_custom_label: '',
    created_at: today(), last_login: null, last_ip: '', viewedBy: [],
  };
  migrateUser(user);
  applyInviteGrant(user, inv);
  db2.users.push(user);
  inv.used_by = id;
  saveDB(db2);
  setSession(id);
  log('Регистрация', uname);
  document.getElementById('reg-msg').innerHTML = '<div class="alert alert-success">Готово! Настрой профиль.</div>';
  setTimeout(() => showPage('dashboard'), 800);
}

function logout() {
  setSession(null);
  showPage('home');
}

function applyInviteFromUrl() {
  const params = new URLSearchParams(location.search);
  const inv = params.get('invite');
  if (!inv) return;
  ensureInviteInDB(inv);
  const input = document.querySelector('[name="invite"]');
  if (input) input.value = normInvite(inv);
  showPage('register');
  document.getElementById('reg-msg').innerHTML =
    '<div class="alert alert-success">Инвайт подставлен. Заполни форму и зарегистрируйся.</div>';
}

document.addEventListener('DOMContentLoaded', () => {
  const db = loadDB();
  applySiteTheme(db.settings?.siteTheme || 'jade');
  initFileUploads();
  document.getElementById('home-claim-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') claimFromHome();
  });
  showPage('home');
  const params = new URLSearchParams(location.search);
  if (params.get('u')) openProfile(params.get('u'));
  else if (params.get('invite')) applyInviteFromUrl();
});
