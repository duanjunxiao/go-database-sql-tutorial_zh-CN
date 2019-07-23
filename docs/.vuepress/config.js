module.exports = {
    title: 'Go database/sql 指南',
    description: 'Go database/sql 指南',
    base: '/go-database-sql-tutorial_zh-CN/',
    themeConfig: {
      nav: [
        { text: 'go database/sql', link: 'https://golang.google.cn/pkg/database/' }
      ],
      sidebar: [
        '/',
        '/tutorial',
        '/overview',
        '/importing',
        '/accessing',
        '/retrieving',
        '/modifying',
        '/prepared',
        '/errors',
        '/nulls',
        '/varcols',
        '/connection-pool',
        '/surprises',
        '/references'
      ],
      sidebarDepth: 2,
      activateHeaderLinks: true,
      repo: 'meilihao/go-database-sql-tutorial_zh-CN',
      repoLabel: 'GitHub',
      editLinks: true,
      docsDir: 'docs',
      docsBranch: 'v2',
      editLinkText: '帮助我们改善此页面！',
      lastUpdated: '上次更新'
    },
    plugins: [
      '@vuepress/back-to-top',
      [ 
        '@vuepress/google-analytics',
        {
          'ga': 'UA-100750611-1'
        }
      ]  
    ] 
  }