import React  from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component{
  constructor(){
    super();
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
    //getinitialState
    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount(){
    console.log(this.props.match.params.storeId);
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`
      ,{
        context:this,
        state:'fishes'
      })

    //check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);

    if(localStorageRef){
      // update out App component's order state
      this.setState({
        order:JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps,nextState){
    localStorage.setItem(`order-${this.props.match.params.storeId}`,JSON.stringify(nextState.order));
  }

  addFish(fish){
    //update our state
    console.log(this.state);
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    //this state
    this.setState({fishes});
  } 

  updateFish(key,updatedFish){
    const fishes = {...this.state.fishes}
    fishes[key] = updatedFish;
    this.setState({fishes});
  }

  removeFish(key){
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({fishes});
  }

  removeOrder(key){
    const order = {...this.state.order};
    delete order[key];
    this.setState({order});
  }

  loadSamples(){
    this.setState({
      fishes:sampleFishes
    })
  }
  addToOrder(key){
    //take a copy of our state
    const order = {...this.state.order};
    //update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    this.setState({order})
  }
  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]}/>)
            }
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order}
          params={this.props.params}
          removeOrder={this.removeOrder}
        />
        <Inventory 
          addFish={this.addFish} 
          fishes={this.state.fishes}
          loadSamples={this.loadSamples}
          updateFish = {this.updateFish}
          removeFish = {this.removeFish}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: PropTypes.object.isRequired
}
export default App