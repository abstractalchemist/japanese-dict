import Rx from 'rx';
import Http from './utils';

export default (function() {
    return {
	title: "Vivid Strike",
	words:
	/*Rx.Observable.fromArray([
	    ["格闘","","Martial Arts"],
	    ["覇王流","","Kaiser Arts"],
	    ["","",""],*/
	Rx.Observable.fromPromise(Http({url:"/vivid.json"}))
	    .map(JSON.parse)
	    .selectMany(({links}) => {
		return Rx.Observable.fromPromise(Http({url:links[0].href}))
		    .map(JSON.parse)
		    .selectMany(Rx.Observable.fromArray)
	    })
    }
    
})()
