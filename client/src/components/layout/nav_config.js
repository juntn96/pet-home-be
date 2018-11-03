export default {
    items: [
      {
        name: 'Trang chủ',
        url: '/product',
        icon: 'icon-speedometer',
        badge: {
          variant: 'info',
        },
      },
    //   {
    //     title: true,
    //     name: 'Product',
    //     wrapper: {            // optional wrapper object
    //       element: '',        // required valid HTML5 element tag
    //       attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    //     },
    //     class: ''             // optional class names space delimited list for title item ex: "text-center"
    //   },
      {
        name: 'Quản lý sản phẩm',
        url: '/product',
        icon: 'icon-list',
      },
      {
        name: 'Quản lý thể loại',
        url: '/product/category',
        icon: 'icon-list'
      }
    ]
}