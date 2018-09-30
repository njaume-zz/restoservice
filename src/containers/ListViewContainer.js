import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ListView from '../components/ListView.js';
import {fetchRestaurants, selectRestaurant} from '../actions/listViewActions'
const mapStateToProps = (state) => {
  return ({
    listView: state.listView,
  });
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchRestaurants,
    selectRestaurant
  }, dispatch)
}

const ListViewContainer = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ListView)

export default ListViewContainer