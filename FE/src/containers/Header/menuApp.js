export const adminMenu = [
    { 
        //hệ thống
        name: 'menu.admin.user', menus: [
            {
                name:"menu.admin.crud",link:'system/user-manage'
            },
            {
                name:"menu.admin.crud-redux",link:"/system/user-redux"
            },
            {
                name: 'menu.admin.manage-doctor',link:'/system/manage-doctor'
            },
            {
                name:'menu.admin.manage-user',link:"/system/user-manage"
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    // phòng khám
    {
    name :"menu.admin.clinic", link : "system/user-manage",
    },
    //chuyên khoa
    {
        name :"menu.admin.specialty", link : "system/user-manage",
    },
    //cẩm nang
    {
        name :"menu.admin.handbook", link : "system/user-manage",
    }
];