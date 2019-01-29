import React from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import base from '../base';
import firebase from 'firebase/app';

class Inventory extends React.Component{
	constructor(){
		super();
		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderLogin = this.renderLogin.bind(this);		
		this.authenticate = this.authenticate.bind(this);
		this.authHandler = this.authHandler.bind(this);		
		this.state = {
			uid:null,
			owner:null
		}
	}
	handleChange(e,key){
		const fish = this.props.fishes[key];
		//take a copy of that fish and update it with the new data
		const updatedFish = {
			...fish,
			[e.target.name] : e.target.value
		}
		this.props.updateFish(key,updatedFish);
	}

	authenticate(provider){

		var provider2 = new firebase.auth.FacebookAuthProvider();
			firebase.auth().signInWithPopup(provider2).then(() => {
					console.log(provider2);
		  //return value is null
		});
		
		//base.authWithOAuthPopup(provider,this.authHandler);
		//console.log(firebase.auth().signInWithEmailLink("email","emaillinl"));
		//console.log(base);
	}

	authHandler(err,authData){
		//console.log(authData);
	}

	renderLogin(){
		return (
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to manage your store's inventory</p>
				<button 
					className="facebook" 
					onClick={() => this.authenticate('facebook')}>
					LOG IN WITH FACEBOOK
				</button>
			</nav>
		)
	}

	renderInventory(key){
		const fish = this.props.fishes[key];
		return (
		<div className="fish-edit" key={key}>
			<input 
				type="text" 
				name="name" 
				onChange={(e)=>this.handleChange(e,key)} 
				placeholder="Fish name" 
				value={fish.name}
			/>
			<input 
				type="text" 
				name="price" 
				onChange={(e)=>this.handleChange(e,key)} 
				placeholder="Fish price" 
				value={fish.price}
			/>

			<select 
				name="status" 
				onChange={(e)=>this.handleChange(e,key)} 
				placeholder="Fish status" 
				value={fish.status}
			>		
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
			</select>

			<textarea 
				name="desc" 
				onChange={(e)=>this.handleChange(e,key)} 
				placeholder="Fish desc" 
				value={fish.desc}>
			</textarea>
			<input 
				type="text" 
				name="image" 
				onChange={(e)=>this.handleChange(e,key)} 
				placeholder="Fish image" 
				value={fish.image}
			/>	
			<button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
		</div>
		
		)
	}
	render(){
		const logout = <button>Logout</button>
		// check if they are not logged in at all
		if(!this.state.uid){
			return <div>{this.renderLogin()}</div>
		}

		if(this.state.uid !== this.state.owner){
			return(
				<div>
					<p>Sorry you aren't the owner of this store!</p>
				</div>
			)
		}

		return(
			<div>
				<p>Inventory</p>
				{logout}
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<AddFishForm addFish={this.props.addFish}/>	
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
}

Inventory.propTypes = {
	fishes: PropTypes.object.isRequired,
	updateFish: PropTypes.func.isRequired,
	removeFish: PropTypes.func.isRequired,
	addFish: PropTypes.func.isRequired,
	loadSamples: PropTypes.func.isRequired
}

export default Inventory 