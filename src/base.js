import Rebase from 're-base';
import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyD-eBmbcn_6fCHIL4bN9Nn8NufHQ_WN8eE",
    authDomain: "storeapp-b2933.firebaseapp.com",
    databaseURL: "https://storeapp-b2933.firebaseio.com"
};

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export default base;