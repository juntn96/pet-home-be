export default {
    items: [
      {
        name: 'Quản lý người dùng',
        url: '/admin/allusers',
        icon: 'icon-user',
      },
      {
        name: 'Quản lý thể loại',
        url: '/admin/category',
        icon: 'icon-list',
        children: [
          {
            name: 'Bài viết',
            url: '/admin/category/post',
            icon: 'icon-pencil',
          },
          {
            name: 'Địa điểm',
            url: '/admin/category/location',
            icon: 'icon-puzzle',
          }
        ]
      },
      {
        name: 'Quản lý địa điểm',
        url: '/admin/location',
        icon: 'icon-location-pin'
      },
      {
        name: 'Quản lý báo cáo',
        url: '/admin/report',
        icon: 'icon-list'
      },
      // {
      //   name: 'Thêm địa điểm mới',
      //   url: '/admin/location/add',
      //   icon: 'icon-list'
      // }
    ]
}