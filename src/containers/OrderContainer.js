import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Order from '../components/Order';
import {postOrderForm} from '../actions/orderActions'
const mapStateToProps = (state) => {
  return ({
    selectedRestaurant: state.listView.selectedRestaurant,
  });
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    postOrderForm
  }, dispatch)
}

const OrderContainer = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Order)

export default OrderContainer