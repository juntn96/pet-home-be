import React,{Component} from 'react'
import { Card, CardBody, CardHeader, Col, Row,Badge } from 'reactstrap';
import Spinner from '../../common/Spinner'
import axios from 'axios';
import PostCategoryItem from './PostCategoryIttem'
class PostCategory extends Component {

  constructor(props){
    super(props);
    this.state = {
      categories: [],
      isLoading: true,
      name: '',
      newName:''
    }
  }
  oldName ='';
  data = {};
  componentDidMount(){
    this._requestGetAllPostCategories();
  }
  errMsg = '';
  _requestGetAllPostCategories = () => {
    axios.get('/api/post/category/get').then(res => {
      this.setState({
        categories: res.data.categories,
        isLoading: false
      })
    }).catch(err =>{
      //todo
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // onSearch =(e) => {
  //   let tr = this.refs.tableSearch.getElementsByTagName('tr');

  //   for (let i = 0; i < tr.length; i++) {
  //     let td = tr[i].getElementsByTagName("td")[1];
  //     if (td) {
  //       if (td.innerHTML.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
  //         tr[i].style.display = "";
  //       } else {
  //         tr[i].style.display = "none";
  //       }
  //     }
  //   }
  // }
  _onDeleteItem =() =>{
    const abc = {id: this.state.itemId, field: 'deletionFlag', name: !this.state.deletionFlg}
    axios.put('/api/post/category/updateNameById',abc).then(res => {
      this._requestGetAllPostCategories();
    }).catch(err =>{
      //todo
    });
  }
  _onChangeNameCategory =() =>{
    if(this.state.name === '') {
      this.refs.editErrMsg.innerHTML ="Vui lòng không bỏ trống!";
      return;
    }
    if(this.state.name.trim() === this.oldName) {
      this.refs.editErrMsg.innerHTML ="Bạn chưa thay đổi!";
      return;
    }
    const abc = {id: this.state.itemId, field: 'name', name: this.state.name}
    axios.put('/api/post/category/updateNameById',abc).then(res => {
      this.refs.editErrMsg.innerHTML ="";
      this._requestGetAllPostCategories();
      window.hideEditModal();
    }).catch(err =>{
      this.refs.editErrMsg.innerHTML = err.response.data.error.message;
    });
  }
  _onAddNewCategory =() =>{
    if(this.state.newName === ''){
      this.refs.addErrMsg.innerHTML ="Vui lòng không bỏ trống!";
      return;
    }
    const data = { name: this.state.newName}
    axios.post('/api/post/category/add',data).then(res => {
      this._requestGetAllPostCategories();
      this.refs.addErrMsg.innerHTML ="";
      window.hideAddModal();
    }).catch(err =>{
      this.refs.addErrMsg.innerHTML = err.response.data.error.message;
    });
  }

  deleteHandle = (obj) => {
    this.oldName = obj.name;
    this.setState({ name:obj.name,itemId: obj.id, deletionFlg: obj.deletionFlag})
  }

  _onSearch= (e) => {
    const list = this.refs.tesst.getElementsByClassName('nameItem');
    const itemm = this.refs.tesst.getElementsByClassName('itemSearch');
    for(let i=0;i< list.length; i++){
      if(list[i].innerHTML.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
        itemm[i].style.display = '';
      }
      else{
        itemm[i].style.display = 'none';
      }
   }
  }

  _changeStatusCheckbox = (e) => {
    if(e.target.name === 'all'){
      if(this.refs.all.checked){
        this.refs.all.checked = true;
        this.refs.on.checked = false;
        this.refs.off.checked = false;
      }
    }
    if(this.refs.on.checked || this.refs.off.checked){
      this.refs.all.checked = false;
    }
    if((this.refs.on.checked && this.refs.off.checked) || (!this.refs.on.checked && !this.refs.off.checked) ){
      this.refs.all.checked = true;
      this.refs.on.checked = false;
      this.refs.off.checked = false;
    }
  }
  _filterByStatus = (e) => {
    this._changeStatusCheckbox(e);
    // console.log(this.refs.search.getElementsByClassName('statusFlagLocation'))
    const list = this.refs.tesst.getElementsByClassName('statusFlagPost');
    const itemm = this.refs.tesst.getElementsByClassName('itemSearch');
    let check = false;
    console.log(e.target.checked)
    if(this.refs.all.checked)
      this._showAll()
    else
      for (let i = 0; i < list.length; i++) {
        if (list[i].value === e.target.name && e.target.value) {
          console.log(list[i].value)
          itemm[i].style.display = '';
        }
        else {
          if(e.target.name !== 'all')
            itemm[i].style.display = 'none';
        }
      }
  }
  _showAll = () => {
    const itemm = this.refs.tesst.getElementsByClassName('itemSearch');
    for (let i = 0; i < itemm.length; i++) {
      itemm[i].style.display = '';
    }
  }
  render(){
    const {categories,isLoading} = this.state;
    return (
    <div >
      <Row>
      <Col>
        <Card >
          <CardHeader>
            <input className="form-control col-sm-2" placeholder="Tìm theo tên" onChange={this._onSearch} name="name" />
            <div className="form-check form-check-inline">
                  <input className="form-check-input" onClick={this._filterByStatus} type="checkbox" id="inlineCheckbox1" ref='all' name="all" checked disabled/>
                  <label className="form-check-label" for="inlineCheckbox1">Tất cả</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" onClick={this._filterByStatus} type="checkbox" id="inlineCheckbox2" ref='on' name="on"/>
                  <label className="form-check-label" for="inlineCheckbox2">Hoạt động</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" onClick={this._filterByStatus} type="checkbox" id="inlineCheckbox3" ref='off' name="off"/>
                  <label className="form-check-label" for="inlineCheckbox3">Không hoạt động</label>
                </div>
            <div className="card-header-actions">
            <button type="button" className="btn btn-primary"  data-toggle="modal" data-target="#addModal"><i className="fa fa-plus"></i>  Thêm mới</button>
            </div>
          </CardHeader>
        </Card>
      </Col></Row>
      <div ref="tesst">
      <Row >
      {categories === null || isLoading ? <Spinner /> : 
        categories.map((item, index) => (<PostCategoryItem onDeleteHandle={this.deleteHandle} postCate={item} key={index}/>)) }
      </Row>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
             <h4> Bạn có chắc chắn muốn {this.state.deletionFlg?'hiện':'ẩn'} {this.name} ?</h4>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
              <button type="button" onClick={this._onDeleteItem} data-dismiss="modal" className="btn btn-primary">Đồng ý</button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit modal */}
      <div ref="editModal" className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
             <h4> Sửa tên thể loại</h4>
            </div>
            <div className="modal-body">
             <input className="form-control" onChange={this.onChange} name="name" value={this.state.name} />
             <small ref='editErrMsg' className="" style={{color:'red'}}></small>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
              <button type="button" onClick={this._onChangeNameCategory}  className="btn btn-primary">Đồng ý</button>
            </div>
          </div>
        </div>
      </div>
      {/* add modal */}
      <div ref="addModal" className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
             <h4> Thêm thể loại</h4>
            </div>
            <div className="modal-body">
             <input className="form-control" onChange={this.onChange} name="newName" placeholder="nhập tên ..." value={this.state.newName} />
             <small ref='addErrMsg' className="" style={{color:'red'}}></small>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
              <button type="button" onClick={this._onAddNewCategory} className="btn btn-primary">Lưu</button>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }

}

export default PostCategory;

