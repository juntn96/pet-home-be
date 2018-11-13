import React from 'react';
import Loadable from 'react-loadable'
import ProductList from './components/product/ProductList';
import ProductCategory from './components/product/ProductCategory';

function Loading() {
  return <div>Loading...</div>;
}
const AddProduct = Loadable({
    loader: () => import('./components/product/AddProduct'),
    loading: Loading,
  });
  
const routes = [
    { path: '/', exact: true, name: 'Trang Chủ', component: ProductList },
    { path: '/product/add', exact: true, name: 'Thêm sản phẩm', component: AddProduct },
    { path: '/product/category', exact: true, name: 'Quản lý thể loại', component: ProductCategory },
    { path: '/product', exact: true, name: 'Quản lý sản phẩm', component: ProductList },
    { path: '/profile', exact: true, name: 'Thông tin cá nhân', component: ProductList }
]
export default routes;