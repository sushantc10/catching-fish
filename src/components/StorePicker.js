import React from 'react';
import { Router } from 'react-router';
import PropTypes from 'prop-types';
class StorePicker extends React.Component{
	//constructor(){
	//	super();
	//	this.goToStore = this.goToStore.bind(this);
	//}
	goToStore(event){
		console.log('You changed the URL');
		const storeId = this.storeInput.value;
		//this.context.transitionTo(`/store/${storeId}`);
		this.props.history.push(`store/${storeId}`);
		event.preventDefault();
	}
	render(){
		return (
			<form className="store-selector" onSubmit={(e)=>this.goToStore(e)}>
				<h2>Please enter a store</h2>
				<input type="text" required placeholder="Store name" ref={(input)=>{this.storeInput = input}}/>
				<button type="submit">Visit Store -></button>
			</form>
		)
	}
}

StorePicker.contextTypes = {
	router: PropTypes.object
}
export default StorePicker