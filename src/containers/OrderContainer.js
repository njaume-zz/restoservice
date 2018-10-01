import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Order from '../components/Order';
import {postOrderForm, initialState} from '../actions/orderActions'
const mapStateToProps = (state) => {
  return ({
    selectedRestaurant: state.listView.selectedRestaurant,
    order: state.order
  });
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    postOrderForm,
    initialState
  }, dispatch)
}

const OrderContainer = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Order)

export default OrderContainer