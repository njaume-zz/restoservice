import React, { Component } from 'react';
import logo from '../../images/logo.png';
import star from '../../images/star.svg'
const styles = {
    liItem : {
        display : 'inline-block',
        paddingLeft: 30,
        width: '15vw'
    },
    li : {cursor: 'pointer'}
}

class RestaurantCard extends Component {

    renderRating = (rating) => {
        let i = 0
        let stars=[]
            for(i=0;i<rating;i++){
                stars.push(<img key={`restauranteCard_${i}`} style={{width:30, display:'inline-block'}} src={star} alt="golf"/>)
            }
        return(<div style={styles.liItem}>{stars}</div>)
    }
    render() {
        return (
            <React.Fragment>      
                    <li style={styles.li} className={'restaurant_card'} onClick={() => {this.props.onSelectRestaurant(this.props.restaurant)}}>
                        <img style={{maxWidth:100, marginTop: 10, ...styles.liItem}} src={logo} alt="golf"/> 
                        <a style={styles.liItem}>{this.props.restaurant.commercialName}</a>
                        <a style={styles.liItem}>{this.props.restaurant.reviews.length} review</a>
                        <a style={styles.liItem}>{this.props.restaurant.address}</a>
                        {this.renderRating(this.props.restaurant.rating)} 
                    </li>
            </React.Fragment> 
                )
            }
        }

export default RestaurantCard;
