import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct, getProductParentCategories ,getProductDetailById, updateProduct} from '../../store/actions/productAction';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button
} from 'reactstrap';
import Spinner from '../common/Spinner'
import Notifications, { notify } from 'react-notify-toast'
import SpinnerU from './../uploadImage/Spinner'
import Images from './../uploadImage/Images'
import Buttons from './../uploadImage/Buttons'
import WakeUp from './../uploadImage/WakeUp'
import './../uploadImage/UploadImage.css'

const toastColor = { 
  background: '#505050', 
  text: '#fff' 
}


class AddProduct extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      description: '',
      price: 0,
      typeProductCategory: '',
      loadingU: true,
      uploading: false,
      images: []
    };
    console.log(this.props.location.state)
  }

  componentDidMount() {
    this.props.getProductParentCategories(this.props.auth.user.user_id);
    fetch(`/api/wake-up`)
      .then(res => {
        if (res.ok) {
          return this.setState({ loadingU: false })  
        }
        const msg = 'Something is went wrong with server' 
        this.toast(msg, 'custom', 2000, toastColor)
      })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors};
    }
    else return null;
  }

  onChangeTypeProduct = e => {
    this.setState({typeProductCategory: e.target.value});
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    let imagesUrl = this.state.images.map( item => item.url);
    const newProduct = {
      name: this.state.name,
      ownerId: this.props.auth.user.user_id,
      typeId: this.state.typeProductCategory,
      description: this.state.description,
      price: this.state.price,
      images: imagesUrl
    };
    if(this.props.location.state.id === ''){
      
      this.props.createProduct(newProduct, this.props.history);
    }else {
      newProduct.push({id: this.props.location.state.id})
      console.log(newProduct)
      this.props.updateProduct(newProduct, this.props.history);
    }
  }

  onCancel = (e) => {
    this.props.history.push('/product');
  }

  renderOptionItem = (item, index) => {
    return (
      <option key={index} value={item._id} selected={item._id === this.state.typeProductCategory}>{item.name}</option>
    );
  }

  toast = notify.createShowQueue()

  onChangeU = e => {
    const errs = [] 
    const files = Array.from(e.target.files)

    if (files.length > 3) {
      const msg = 'Only 3 images can be uploaded at a time'
      return this.toast(msg, 'custom', 2000, toastColor)  
    }

    const formData = new FormData()
    const types = ['image/png', 'image/jpeg', 'image/gif']

    files.forEach((file, i) => {

      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`)
      }

      if (file.size > 150000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`)
      }

      formData.append(i, file)
    })

    if (errs.length) {
      return errs.forEach(err => this.toast(err, 'custom', 2000, toastColor))
    }

    this.setState({ uploading: true })

    fetch(`/api/image-upload`, {
      method: 'POST',
      body: formData
    })
    .then(res => {
      if (!res.ok) {
        throw res
      }
      return res.json()
    })
    .then(images => {
      this.setState({
        uploading: false, 
        images
      })
    })
    .catch(err => {
      err.json().then(e => {
        this.toast(e.message, 'custom', 2000, toastColor)
        this.setState({ uploading: false })
      })
    })
  }

  filter = id => {
    return this.state.images.filter(image => image.public_id !== id)
  }

  removeImage = id => {
    this.setState({ images: this.filter(id) })
  }

  onError = id => {
    this.toast('Oops, something went wrong', 'custom', 2000, toastColor)
    this.setState({ images: this.filter(id) })
  }

  render() {
    const { loadingU, uploading, images } = this.state
    const { productParentCategories , loading } = this.props.product;  
    const content = () => {
      switch(true) {
        case loadingU:
          return <WakeUp />
        case uploading:
          return <SpinnerU />
        case images.length > 0:
          return <Images 
                  images={images}
                  removeImage={this.removeImage} 
                  onError={this.onError}
                 />
        default:
          return <Buttons onChange={this.onChangeU} />
      }
    }
    return (
      <div className="addProduct">
          <div className="row">
            <div className="col-md-8">           
              <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Add Product</strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="company">Tên sản phẩm</Label>
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg')}
                    placeholder="Tên sản phẩm"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                  <Label htmlFor="vat">Giá</Label>
                  <div className="controls">
                    <InputGroup className="input-prepend">
                      <input
                        type="text"
                        className={classnames('form-control form-control-lg')}
                        placeholder="Giá"
                        name="price"
                        value={this.state.price}
                        onChange={this.onChange}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>.00</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0 mt-3">
                  <Col xs="6">
                    <Label htmlFor="ccyear">Loại</Label>
                    { productParentCategories === null || loading ? <Spinner /> :   
                    <Input 
                      type="select" 
                      name="ccyear" 
                      id="ccyear"
                      value={this.state.typeProductCategory}
                      onChange={this.onChangeTypeProduct}
                      >
                      <option>--Loại--</option>
                      {productParentCategories.map((item, index) => this.renderOptionItem(item,index))}
                    </Input>
                    }
                    </Col>
                  </FormGroup>
                  <FormGroup row className="my-0 mt-3">
                    <Col xs="7">
                      <Label htmlFor="textarea-input">Mô tả</Label>
                        <textarea 
                          className="form-control form-control-lg"
                          name="description" 
                          id="textarea-input" 
                          rows="7"
                          placeholder="Nội dung mô tả..." 
                          value={this.state.description}
                          onChange={this.onChange}>
                        </textarea>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="my-0 mt-2">
                    <Col xs="7">
                      <Label htmlFor="textarea-input">Ảnh</Label>
                      <div className='container'>
                        <Notifications />
                        <div className='buttons'>
                          {content()}
                        </div>                        
                      </div>
                    </Col>
                  </FormGroup>
                  <div style={{marginTop:20}}>
                  <FormGroup row className="my-0">
                    <Col col="6" sm="4" md="3" className="mb-3 mb-xl-0">
                      <Button block color="primary" onClick={this.onSubmit}>Thêm sản phẩm</Button>
                    </Col>
                    <Col col="5" sm="4" md="2" className="mb-xl-0">
                      <Button block color="secondary" onClick={this.onCancel}>Hủy</Button>
                    </Col>
                  </FormGroup>
                  </div>
              </CardBody>
            </Card>
          </Col>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  product: state.product
});

export default connect(mapStateToProps, { createProduct, getProductParentCategories, getProductDetailById, updateProduct })(withRouter(AddProduct));



