import React from 'react';
import Loadable from 'react-loadable'
import ProductList from './components/product/ProductList';
// import AddProduct from './components/product/AddProduct';

function Loading() {
  return <div>Loading...</div>;
}
const AddProduct = Loadable({
    loader: () => import('./components/product/AddProduct'),
    loading: Loading,
  });
  const Register = Loadable({
    loader: () => import('./components/auth/Register'),
    loading: Loading,
  });
const routes = [
    { path: '/', exact: true, name: 'Trang Chủ', component: Register },
    { path: '/product/add', exact: true, name: 'Thêm sản phẩm', component: AddProduct },
    { path: '/pro', exact: true, name: 'Quản lý sản phẩm', component: AddProduct},
    { path: '/product/category', exact: true, name: 'Quản lý thể loại', component: Register },
    { path: '/product', exact: true, name: 'Quản lý sản phẩm', component: ProductList }
]
export default routes;