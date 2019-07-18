export const navigation = [
  {
    text: 'صفحه اصلی',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'نمونه',
    icon: 'plus',
    items: [
      {
        text: 'مشخصات کاربر',
        path: '/profile'
      },
      {
        text: 'نمایش اطلاعات',
        path: '/display-data'
      },
      {
          text: 'نمونه',
          icon: 'plus',
          items: [
              {
                  text: 'گزارش تراکنش ها',
                  path: '/form-213'
              },
              {
                  text: 'نمونه',
                  icon: 'plus',
                  items: [
                      {
                          text: 'مشخصات کاربر',
                          path: '/profile2'
                      },
                      {
                          text: 'نمایش اطلاعات',
                          path: '/display-data2'
                      },
                      {
                          text: 'نمونه',
                          icon: 'plus',
                          items: [
                              {
                                  text: 'مشخصات کاربر',
                                  path: '/profile3'
                              },
                              {
                                  text: 'نمایش اطلاعات',
                                  path: '/display-data3'
                              },
                              {
                                  text: 'نمایش ',
                                  path: '/display3'
                              }
                          ]
                      }
                  ]
              },
              {
                  text: 'نمایش ',
                  path: '/display1'
              }
          ]
      }
    ]
  }
  ];
