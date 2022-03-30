import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarProductItem = props => {
  const {eachProduct} = props
  const {imageUrl, title, description, price, rating} = eachProduct
  return (
    <li>
      <img src={imageUrl} alt="similar product {title}" className="w-100" />
      <h1 className="each-product-title">{title}</h1>
      <p>by {description}</p>
      <div className="d-flex justify-content-between">
        <h6>{price}</h6>
        <button type="button" className="each-product-rating-button">
          {rating}
          <AiFillStar className="each-product-star" />
        </button>
      </div>
    </li>
  )
}
export default SimilarProductItem
