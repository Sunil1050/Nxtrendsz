import {Component} from 'react'
import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

class ProductItemDetails extends Component {
  state = {
    productItem: '',
  }

  componentDidMount() {
    this.getEachProductDetails()
  }

  getEachProductDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        similarProducts: data.similar_products,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
      }
      this.setState({productItem: updatedData})
    }
  }

  render() {
    const {productItem} = this.state
    const {
      imageUrl,
      availability,
      brand,
      description,
      price,
      rating,
      totalReviews,
      title,
      similarProducts,
    } = productItem
    return (
      <div className="container">
        <Header />
        <div className="container">
          <div className="row">
            <img
              src={imageUrl}
              alt="img"
              className="col-12 col-md-6 border-rounded"
            />
            <div className="col-12 col-md-6">
              <h1 className="product-item-heading">{title}</h1>
              <p className="price">{price}</p>
              <div className="rating-button">
                <p>{rating}</p>
                <AiFillStar className="rating-star" />
              </div>
              <p className="total-reviews">{totalReviews} reviews</p>
              <p className="product-description">{description}</p>
              <p>
                <span className="availability">Available:</span>
                {availability}
              </p>
              <p>
                <span className="availability">Brand:</span>
                {brand}
              </p>
              <hr className="seperator" />
              <div className="d-flex">
                <BsPlusSquare className="cart-icon" />
                <p className="total-items">1</p>
                <BsDashSquare className="cart-icon" />
              </div>
              <button type="button" className="btn btn-primary">
                Add to Cart
              </button>
            </div>
            <h5>Similar Products</h5>
            <ul type="none" className="pl-0">
              {similarProducts.map(item => {
                const updatedItem = {
                  availability: item.availability,
                  brand: item.brand,
                  description: item.description,
                  id: item.id,
                  imageUrl: item.image_url,
                  price: item.price,
                  rating: item.rating,
                  style: item.style,
                  title: item.title,
                  totalReviews: item.total_reviews,
                }
                return <SimilarProductItem eachProduct={updatedItem} />
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default ProductItemDetails
