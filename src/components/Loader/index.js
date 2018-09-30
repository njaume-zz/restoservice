import React, { Component } from 'react';
import '../../css/loader.css'

class Loader extends Component {
    render() {
        return (
            <React.Fragment>
            {this.props.isLoading && <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
            </React.Fragment>
                )
            }
        }

export default Loader;
