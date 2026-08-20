<template>
  <div class="container">
    <div class="lang-switch">
      <button
        :class="{ active: $i18n.locale === 'zh' }"
        @click="changeLang('zh')"
      >
        中文
      </button>
      <button
        :class="{ active: $i18n.locale === 'en' }"
        @click="changeLang('en')"
      >
        English
      </button>
    </div>

    <div class="header">
      <img class="avatar" src="/pic/HarryDong.jpg" :alt="$t('avatarAlt')" />
      <div class="name">{{ $t('name') }}</div>
      <div class="bio">{{ $t('bio') }}</div>
      <div class="links">
        <a href="https://github.com/HarryDongDHY" target="_blank">GitHub</a>
        <a href="mailto:mp2409035@stu.nau.edu.cn">Email</a>
      </div>
    </div>

    <section>
      <h2>{{ $t('aboutMe') }}</h2>
      <p v-html="$t('aboutContent')"></p>
    </section>

    <section>
      <h2>{{ $t('projects') }}</h2>
      <div class="project-card">
        <h3>{{ $t('proj1Title') }}</h3>
        <p>{{ $t('proj1Desc') }}</p>
      </div>
    </section>

    <section>
      <h2>{{ $t('publications') }}</h2>
      <ul style="padding-left: 22px">
        <li v-html="$t('pub1')"></li>
        <li v-html="$t('pub2')"></li>
      </ul>
    </section>

    <div class="footer">{{ $t('footer') }}</div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const changeLang = (lang) => {
  locale.value = lang
  localStorage.setItem('siteLang', lang)
  document.documentElement.lang = lang === 'zh' ? 'zh‑CN' : 'en'
  document.title = t('title')
}
// 初始化页面标题
document.title = t('title')
document.documentElement.lang = locale.value === 'zh' ? 'zh‑CN' : 'en'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  background-color: #f7f9fc;
  color: #2d3748;
  line-height: 1.6;
}
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}
.lang-switch {
  text-align: right;
  margin-bottom: 10px;
}
.lang-switch button {
  border: 1px solid #cbd5e0;
  background:#fff;
  padding:4px 12px;
  border-radius:6px;
  cursor:pointer;
  margin-left:6px;
}
.lang-switch button.active {
  background-color:#3182ce;
  color:white;
  border-color:#3182ce;
}
.header {
  text-align: center;
  margin-bottom: 48px;
}
.avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.name {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}
.bio {
  font-size: 17px;
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto;
}
.links {
  margin-top: 20px;
}
.links a {
  display: inline-block;
  margin: 0 8px;
  color: #3182ce;
  text-decoration: none;
}
.links a:hover {
  text-decoration: underline;
}
section {
  margin-bottom: 40px;
}
h2 {
  font-size: 22px;
  margin-bottom: 16px;
  border-left: 4px solid #3182ce;
  padding-left: 12px;
}
.project-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.project-card h3 {
  margin-bottom: 6px;
}
.project-card p {
  color: #555;
  font-size: 15px;
}
.footer {
  text-align: center;
  margin-top: 60px;
  color: #718096;
  font-size: 14px;
}
</style>