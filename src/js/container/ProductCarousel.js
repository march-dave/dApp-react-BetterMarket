import React, { Component } from 'react';
import Carousel from 'nuka-carousel';

class ProductCarousel extends Component {
    state = {
        slideIndex: 0
      };
    render() {
        return (
            <Carousel
            slideIndex={this.state.slideIndex}
            afterSlide={slideIndex => this.setState({ slideIndex })}
        >
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1" />
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2" />
            <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3" />
      </Carousel>
        );
    }
}

export default ProductCarousel;