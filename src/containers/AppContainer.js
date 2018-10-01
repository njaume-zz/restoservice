import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import App from '../App';

const mapStateToProps = (state) => {
  return ({
    isLoading: state.listView.isLoading || state.order.isLoading,
  });
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(App)

export default AppContainer