import React, { Component } from "react";
import Slider from "react-slick";
import Ghost from "../assets/ghost.png";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default class ImagesSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    const { product } = this.props;
    return (
      <div>
        <div className="main-slider">
          <Slider
            asNavFor={this.state.nav2}
            ref={(slider) => (this.slider1 = slider)}
            prevArrow={
              <div className="previousArrow">
                <AiOutlineArrowLeft />
              </div>
            }
            nextArrow={
              <div className="nextArrow">
                <AiOutlineArrowRight />
              </div>
            }
            swipeToSlide = {true}
          >
            <div>
              <img
                className="productContent productImage"
                src={Ghost}
                alt={product.name}
              />
            </div>
            <div>
              <img
                className="productContent productImage"
                src="https://imgur.com/7DHbZaP.png"
                alt={product.name}
              />
            </div>
            <div>
              <img
                className="productContent productImage"
                src="https://imgur.com/yfyHK0r.png"
                alt={product.name}
              />
            </div>
            <div>
              <img
                className="productContent productImage"
                src="https://imgur.com/kwIAy5y.png"
                alt={product.name}
              />
            </div>
            <div>
              <img
                className="productContent productImage"
                src="https://imgur.com/b5go1jN.png"
                alt={product.name}
              />
            </div>
            <div>
              <img
                className="productContent productImage"
                src={Ghost}
                alt={product.name}
              />
            </div>
          </Slider>
        </div>
        <div className="list-slider">
          <Slider
            asNavFor={this.state.nav1}
            ref={(slider) => (this.slider2 = slider)}
            slidesToShow={3}
            swipeToSlide={true}
            focusOnSelect={true}
            prevArrow={
              <div className="previousArrow">
                <AiOutlineArrowLeft />
              </div>
            }
            nextArrow={
              <div className="nextArrow">
                <AiOutlineArrowRight />
              </div>
            }
          >
            <div>
              <img
                className="productContent productImage"
                src={Ghost}
                alt={product.name}
              />
            </div>
            <div>
              <img
                className="productContent productImage"
                src="https://imgur.com/7DHbZaP.png"
                alt={product.name}
              />
            </div>
            <div>
              <img
                className="productContent productImage"
                src="https://imgur.com/yfyHK0r.png"
                alt={product.name}
              />
            </div>
            <div>
              <img
                className="productContent productImage"
                src="https://imgur.com/kwIAy5y.png"
                alt={product.name}
              />
            </div>
            <div>
              <img
                className="productContent productImage"
                src="https://imgur.com/b5go1jN.png"
                alt={product.name}
              />
            </div>
            <div>
              <img
                className="productContent productImage"
                src={Ghost}
                alt={product.name}
              />
            </div>

            {/* sample code to replace images */}
            {/* {product.images.map(image => (
                <div>
                <img
                  className="productContent productImage"
                  src={image}
                  alt={product.name}
                />
              </div>
            ))} */}
          </Slider>
        </div>
      </div>
    );
  }
}
