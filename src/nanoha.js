import Rx from 'rx';
import Http from './utils';

export default (function() {
    return {
	title : "Magical Lyrical Nanoha",
	words :  //Rx.Observable.fromArray([["","",""]]),
	Rx.Observable.fromPromise(Http({url:"/nanoha.json"}))
	    .map(JSON.parse)
	    .selectMany(({links}) => {
		return Rx.Observable.fromPromise(Http({url:links[0].href}))
		    .map(JSON.parse)
		    .selectMany(Rx.Observable.fromArray);
	    })
		       
    }
})()
