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
                        path: '/r1',
                        icon: 'plus'

                    },
                    {
                        text: '200 - گزارش تماس بر اساس شماره تماس',
                        path: '/r2',
                        icon: 'plus'


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
                        path: '/a1',
                        icon: 'plus'
                    },
                    {
                        text: 'گزارش بر اساس شماره تلفن',
                        path: '/a2',
                        icon: 'plus'
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
