export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/production/index',
    'pages/quality/index',
    'pages/manage/index',
    'pages/degreasing/index',
    'pages/pickling/index',
    'pages/chrome/index',
    'pages/nickel/index',
    'pages/bath/index',
    'pages/rack/index',
    'pages/thickness/index',
    'pages/bond/index',
    'pages/salt-spray/index',
    'pages/rework/index',
    'pages/wastewater/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#2e7bbf',
    navigationBarTitleText: '电镀车间管理',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#8b9daf',
    selectedColor: '#2e7bbf',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/production/index',
        text: '生产'
      },
      {
        pagePath: 'pages/quality/index',
        text: '质检'
      },
      {
        pagePath: 'pages/manage/index',
        text: '管理'
      }
    ]
  }
})
