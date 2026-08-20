<template>
  <div class="container">
    <!-- Tab栏外层：通栏 -->
    <div class="tabs-wrap">
      <!-- 名字紧贴页面最左侧 -->
      <div class="tab-brand">{{ $t('fullName') }}</div>
      <div class="tabs">
        <button
          v-for="item in tabList"
          :key="item.key"
          :class="{ tabItem: true, active: activeTab === item.key }"
          @click="activeTab = item.key"
        >
          {{ $t(item.labelKey) }}
        </button>
      </div>
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
    </div>

    <!-- 主体左右布局 -->
    <div class="main-wrap">
      <!-- 左侧：头像个人信息 -->
      <div class="sidebar">
        <img class="avatar" src="/pic/HarryDong.jpg" :alt="$t('avatarAlt')" />
        <div class="name">{{ $t('name') }}</div>
        <div class="bio">{{ $t('bio') }}</div>
        <div class="links">
          <a href="https://github.com/HarryDongDHY" target="_blank">GitHub</a>
          <a href="mailto:mp2409035@stu.nau.edu.cn">Email</a>
        </div>
      </div>

      <!-- 右侧：Tab内容区 -->
      <div class="content-wrap">
        <div class="tab-panel">
          <!-- 主页（原关于我） -->
          <div v-if="activeTab === 'home'" class="panel">
            <h2>{{ $t('home') }}</h2>
            <p v-html="$t('aboutContent')"></p>
          </div>

          <!-- 新闻 -->
          <div v-if="activeTab === 'news'" class="panel">
            <h2>{{ $t('news') }}</h2>
            <div class="news-card-list">
              <div class="news-card" v-for="(item, idx) in newsList" :key="idx">
                <div class="news-img-wrap">
                  <img class="news-img" :src="item.img" alt="news">
                </div>
                <div class="news-body">
                  <h3 class="news-title">{{ item.title }}</h3>
                  <div class="news-date">{{ item.date }}</div>
                  <p class="news-desc">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 项目 -->
          <div v-if="activeTab === 'project'" class="panel">
            <h2>{{ $t('projects') }}</h2>
            <div class="project-card">
              <h3>{{ $t('proj1Title') }}</h3>
              <p>{{ $t('proj1Desc') }}</p>
            </div>
          </div>

          <!-- 论文 -->
          <div v-if="activeTab === 'publication'" class="panel">
            <h2>{{ $t('publications') }}</h2>
            <ul style="padding-left: 22px">
              <li v-html="$t('pub1')"></li>
              <li v-html="$t('pub2')"></li>
            </ul>
          </div>

          <!-- 荣誉 -->
          <div v-if="activeTab === 'honor'" class="panel">
            <h2>{{ $t('honor') }}</h2>
            <p v-html="$t('honorContent')"></p>
          </div>

          <!-- 个人生活 -->
          <div v-if="activeTab === 'life'" class="panel">
            <h2>{{ $t('life') }}</h2>
            <p>{{ $t('lifeContent') }}</p>
          </div>

          <!-- 联系方式 -->
          <div v-if="activeTab === 'contact'" class="panel">
            <h2>{{ $t('contact') }}</h2>
            <p>{{ $t('contactContent') }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">{{ $t('footer') }}</div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

/**
 * 顺序：主页、新闻、项目、论文、荣誉、个人生活、联系方式
 */
const tabList = [
  { key: 'home', labelKey: 'tabHome' },
  { key: 'news', labelKey: 'tabNews' },
  { key: 'project', labelKey: 'tabProject' },
  { key: 'publication', labelKey: 'tabPublication' },
  { key: 'honor', labelKey: 'tabHonor' },
  { key: 'life', labelKey: 'tabLife' },
  { key: 'contact', labelKey: 'tabContact' },
]

// 中文新闻
const zhNews = [
  {
    img: "/pic/news1.jpg",
    title: "在2026年南京审计大学毕业歌会参与了三场表演",
    date: "2026-06-22",
    desc: "参与表演了三首歌曲《把你的名字念一万遍》、《远山如昨》、《南屏晚钟》"
  },
  {
    img: "/pic/news2.jpg",
    title: "参与南京审计大学第二十六届十佳歌手决赛，最终获得亚军",
    date: "2026-05-17",
    desc: "第一首歌曲为《假如爱有天意》，第二首歌曲为《阿楚姑娘》"
  }
]

// 英文新闻
const enNews = [
  {
    img: "/pic/news1.jpg",
    title: "Performed three shows at Nanjing Audit University Graduation Concert 2026",
    date: "2026-06-22",
    desc: "Performed three songs: 《把你的名字念一万遍》, 《远山如昨》, 《南屏晚钟》"
  },
  {
    img: "/pic/news2.jpg",
    title: "Participated in the 26th Top-10 Singer Final and won the runner-up",
    date: "2026-05-17",
    desc: "Songs: 《假如爱有天意》,《阿楚姑娘》"
  }
]

// computed 根据语言切换新闻列表
const newsList = computed(() => {
  return locale.value === 'en' ? enNews : zhNews
})

// 读取本地存储，默认打开主页
const activeTab = ref(localStorage.getItem('curTab') || 'home')

const changeLang = (lang) => {
  locale.value = lang
  localStorage.setItem('siteLang', lang)
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  document.title = t('title')
}

const saveTab = () => {
  localStorage.setItem('curTab', activeTab.value)
}
watch(activeTab, saveTab)

document.title = t('title')
document.documentElement.lang = locale.value === 'zh' ? 'zh-CN' : 'en'
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
    'Helvetica Neue',
    sans-serif;
  background-color: #f7f9fc;
  color: #2d3748;
  line-height: 1.75;
  /* 页面入场动画 */
  animation: pageEnter 0.6s ease-out;
}

@keyframes pageEnter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 通栏tab外层：三栏布局 [名字] [居中导航] [语言按钮] */
.tabs-wrap {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  min-height: 64px;
  padding: 0 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 40px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: box-shadow 0.3s ease;
}

.tab-brand {
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  white-space: nowrap;
  flex-shrink: 0;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 4px;
  position: relative;
  top: 3px;
}
.tabItem {
  border: none;
  background: transparent;
  padding: 14px 16px;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  color: #4a5568;
  transition: all 0.24s ease;
  border-radius: 6px 6px 0 0;
}
.tabItem:hover {
  color: #3182ce;
  background-color: rgba(49, 130, 206, 0.06);
  transform: translateY(-2px);
}
.tabItem.active {
  color: #3182ce;
  border-bottom-color: #3182ce;
  font-weight: 600;
}

.lang-switch {
  display: flex;
  align-items: center;
}
.lang-switch button {
  border: 1px solid #cbd5e0;
  background:#fff;
  padding:5px 14px;
  border-radius:8px;
  cursor:pointer;
  margin-left:8px;
  transition: all 0.24s ease;
}
.lang-switch button:hover:not(.active) {
  border-color:#a0aec0;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(49,130,206,0.12);
}
.lang-switch button.active {
  background-color:#3182ce;
  color:white;
  border-color:#3182ce;
  box-shadow: 0 3px 10px rgba(49,130,206,0.25);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px 60px;
}

.main-wrap {
  display: flex;
  gap:48px;
}
.sidebar {
  flex-shrink:0;
  width:260px;
  text-align:center;
}
.content-wrap {
  flex:1;
}

.panel {
  animation: fadeSlideUp 0.34s ease;
}
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #fff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  margin-bottom: 22px;
  animation: avatarBreath 4s ease-in-out infinite;
}
@keyframes avatarBreath {
  0% {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  }
  50% {
    box-shadow: 0 8px 24px rgba(49,130,206,0.18);
  }
  100% {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  }
}

.name {
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 10px;
  color:#1a202c;
}
.bio {
  font-size: 17px;
  color: #4a5568;
}
.links {
  margin-top: 24px;
}
.links a {
  display: inline-block;
  margin: 0 10px;
  color: #3182ce;
  text-decoration: none;
  padding:4px 0;
  position:relative;
  transition: all 0.24s ease;
}
.links a::after{
  content:'';
  position:absolute;
  left:0;
  bottom:0;
  width:0;
  height:2px;
  background:#3182ce;
  transition: width 0.3s ease;
}
.links a:hover::after{
  width:100%;
}
.links a:hover {
  color:#2b6cb0;
  transform: translateY(-1px);
}

.panel h2 {
  font-size: 23px;
  margin-bottom: 20px;
  border-left: 5px solid #3182ce;
  padding-left: 14px;
  color:#1a202c;
}
.panel p {
  color:#374151;
  font-size:16px;
}
.panel ul{
  color:#374151;
  font-size:16px;
}
.panel li{
  margin-bottom:10px;
}

.project-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07);
  transition: all 0.28s ease;
}
.project-card:hover{
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(49,130,206,0.14);
}
.project-card h3 {
  margin-bottom: 8px;
  font-size:18px;
  color:#1a202c;
}
.project-card p {
  color: #4a5568;
  font-size: 15.5px;
}

/* 新闻卡片样式 */
.news-card-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.news-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07);
  display: flex;
  overflow: hidden;
  transition: all 0.28s ease;
}
.news-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(49,130,206,0.14);
}
.news-img-wrap {
  flex-shrink: 0;
  width: 220px;
}
.news-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.news-body {
  padding: 20px;
}
.news-title {
  font-size: 18px;
  color:#1a202c;
  margin-bottom: 6px;
}
.news-date {
  font-size:14px;
  color:#718096;
  margin-bottom:10px;
}
.news-desc {
  font-size:15.5px;
  color:#4a5568;
}

.footer {
  text-align: center;
  margin-top: 70px;
  color: #718096;
  font-size: 14px;
}

/* 移动端 */
@media(max-width:768px){
  .tabs-wrap {
    grid-template-columns: 1fr;
    gap:12px;
    min-height: auto;
    padding:12px 20px;
  }
  .tabs {
    justify-content: flex-start;
    flex-wrap: wrap;
    top:0;
  }
  .lang-switch {
    justify-self: flex-start;
  }
  .main-wrap{
    flex-direction:column;
    gap:36px;
  }
  .sidebar{
    width:100%;
  }
  .tabItem{
    padding:12px 14px;
  }
}
@media(max-width:640px){
  .news-card {
    flex-direction: column;
  }
  .news-img-wrap {
    width:100%;
    height:180px;
  }
}
</style>