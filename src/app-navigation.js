export const navigation = [
    {
        text: 'صفحه اصلی',
        path: '/dashboard',
        icon: 'home'
    },
    {

        text: 'گزارشات',
        icon: 'plus',
        items: [
            {
                text: 'گزارشات تماسها',
                path: '/p1',
                icon: 'plus',
                items: [
                    {
                        text: '100 - گزارش تماس بر اساس تاریخ',
                        path: '/form-213',


                    },
                    {
                        text: '200 - گزارش تماس بر اساس شماره تماس',
                        path: '/form-313',



                    }
                ]
            },
            {
                text: 'گزارشات مالی',
                path: '/p2',
                icon: 'plus',
                items: [
                    {
                        text: 'گزارش بر اساس تاریخ',
                        path: '/a1'
                    },
                    {
                        text: 'گزارش بر اساس شماره تلفن',
                        path: '/a2'
                    },]
            }
        ]
    },
    {
        text: 'تنظیمات',
        path: '/display',
        icon: 'setting'
    },


];
