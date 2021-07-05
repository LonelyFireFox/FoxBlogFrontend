module.exports = {
  // siteName: '分析系统',
  siteName: 'LonelyFireFox Blog',
  copyright: 'LonelyFireFox Blog  ©2020 LonelyFireFox',
  logoPath: '/MyLogo2.jpg',
  apiPrefix: '/api/v1',
  address: 'http://localhost:8000',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/(\/(en|zh))*\/login/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      /*{
        key: 'pt-br',
        title: 'Português',
        flag: '/portugal.svg',
      },*/
      {
        key: 'en',
        title: 'English',
        flag: '/america.svg',
      },
      {
        key: 'zh',
        title: '中文',
        flag: '/china.svg',
      },
    ],
    defaultLanguage: 'zh',
  },

}