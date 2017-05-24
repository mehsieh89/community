import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeHeader} from '../actions';

class Header extends Component {
	constructor(props){
		super(props)
	}

	handleClick () {
		this.props.changeHeader('Yvonne is smart')
	}

	render () {
		return (
			<div>
			  <div>{this.props.header}</div>
			  <button onClick={this.handleClick.bind(this)}>
			    Click
			  </button> 
			</div>
		);
	}
}

function mapStateToProps (state) {
	return {
		header: state.header
	};
} 

function matchDispatchToProps(dispatch) {
	return bindActionCreators({changeHeader: changeHeader}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Header);