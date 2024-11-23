export const adminMenu = [
    {
        //hệ thống
        name: 'menu.admin.user', menus: [
            {
                name: "menu.admin.crud-redux", link: "/system/manage-user"
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            {
                name: 'menu.doctor.schedule', link: '/doctor/manage-schedule'
            },

            {
                name: 'menu.doctor.Send-bill', link: '/doctor/manage-patient'
            }
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    // phòng khám
    {
        name: "menu.admin.clinic", menus: [
            {
                name: 'menu.admin.clinic', link: '/system/manage-clinic'
            }
        ]
    },
    //chuyên khoa
    {
        name: "menu.admin.specialty", menus: [
            {
                name: 'menu.admin.specialty', link: "/system/manage-specialty"
            }
        ]
    },
    //cẩm nang
    {
        name: "menu.admin.handbook",
        menus: [
            {
                name: 'menu.admin.handbook', link: "/doctor/manage-handbook"
            }]
    }
];

export const doctorMenu = [
    {
        name: 'menu.doctor.manage-schedule',
        menus: [
            {
                name: 'menu.doctor.schedule', link: '/doctor/manage-schedule',
            },
            {
                name: 'menu.doctor.patient', link: '/doctor/manage-patient'
            },
            {
                name: 'menu.admin.handbook', link: '/doctor/manage-handbook'
            }
        ]
    }
]