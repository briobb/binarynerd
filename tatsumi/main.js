'use strict';
const config = window.SITE_CONFIG;
const menuButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuButton.focus();
  }
});
matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
// Native details/summary keeps all FAQ answers accessible without JavaScript.
document.querySelectorAll('.faq-list details').forEach(details => {
  const summary = details.querySelector('summary');
  summary.setAttribute('aria-expanded', String(details.open));
  details.addEventListener('toggle', () => summary.setAttribute('aria-expanded', String(details.open)));
});
function replaceImage(container, source, alt) {
  if (!source) return;
  const image = document.createElement('img');
  image.src = source; image.alt = alt; image.loading = 'lazy';
  image.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block';
  image.addEventListener('load', () => container.replaceChildren(image), { once: true });
}
if (config) {
  replaceImage(document.querySelector('.hero-art'), config.assets.hero, '金属研磨作業の様子');
  ['mirror', 'hairline', 'buff'].forEach((key, i) => replaceImage(document.querySelector(`.material-${i}`), config.assets[key], ['鏡面仕上げ','ヘアライン仕上げ','バフ研磨'][i]));
  config.assets.access.forEach((step, i) => {
    const article = document.querySelectorAll('.steps article')[i];
    replaceImage(article.querySelector('.photo-placeholder'), step.image, ['ナビの到着地点','路地への進入','工場入口'][i]);
    if (step.description) article.lastElementChild.textContent = step.description;
  });
}
const business = {
  '@context': 'https://schema.org', '@type': 'LocalBusiness',
  name: 'タツミ研磨株式会社', telephone: '+81-6-6752-5549',
  address: { '@type': 'PostalAddress', addressRegion: '大阪府', addressLocality: '大阪市生野区', streetAddress: '巽西3-15-4', addressCountry: 'JP' },
  description: 'ステンレス・アルミ・鉄・真鍮などの金属研磨。鏡面仕上げ、ヘアライン仕上げ、バフ研磨。'
};
if (config?.productionUrl) {
  const url = new URL(config.productionUrl).href;
  business.url = url;
  const canonical = document.createElement('link'); canonical.rel = 'canonical'; canonical.href = url;
  document.head.append(canonical);
  const ogUrl = document.createElement('meta'); ogUrl.setAttribute('property', 'og:url'); ogUrl.content = url;
  document.head.append(ogUrl);
}
const schema = document.createElement('script'); schema.type = 'application/ld+json'; schema.textContent = JSON.stringify(business); document.head.append(schema);
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const checkedFields = ['name', 'email', 'message', 'attachment', 'consent'];
checkedFields.forEach(id => document.getElementById(id).setAttribute('aria-describedby', `${id}-error`));
form.addEventListener('submit', async event => {
  event.preventDefault();
  status.textContent = '';
  let firstInvalid = null;
  function error(id, message) {
    const field = document.getElementById(id);
    document.getElementById(`${id}-error`).textContent = message;
    field.setAttribute('aria-invalid', String(Boolean(message)));
    if (message && !firstInvalid) firstInvalid = field;
  }
  checkedFields.forEach(id => error(id, ''));
  for (const [id, label] of [['name','お名前'], ['message','お問い合わせ内容']]) {
    const field = document.getElementById(id);
    if (!field.value.trim()) error(id, `${label}を入力してください。`);
    else if (!field.validity.valid) error(id, '入力文字数を確認してください。');
  }
  const email = document.getElementById('email');
  if (!email.value.trim()) error('email', 'メールアドレスを入力してください。');
  else if (!email.validity.valid) error('email', 'メールアドレスの形式を確認してください。');
  const file = document.getElementById('attachment').files[0];
  if (file) {
    const allowed = ['image/jpeg','image/png','image/webp','application/pdf'];
    const extension = /\.(jpe?g|png|webp|pdf)$/i.test(file.name);
    if (!allowed.includes(file.type) || !extension) error('attachment', 'JPEG・PNG・WebP・PDFを選択してください。');
    else if (file.size > 5 * 1024 * 1024) error('attachment', 'ファイルサイズは5MB以下にしてください。');
    else if (file.size === 0) error('attachment', '空のファイルは添付できません。');
  }
  if (!document.getElementById('consent').checked) error('consent', '個人情報の取り扱いをご確認のうえ、同意してください。');
  if (firstInvalid) { firstInvalid.focus(); return; }
  if (form.elements.website.value) return;
  status.textContent = '入力内容を確認しました。現在は送信準備中のため、メールは送信されていません。お電話（06-6752-5549）でお問い合わせください。';
  status.focus();
});
