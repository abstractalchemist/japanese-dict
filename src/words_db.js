import Rx from 'rx';
import Http from './utils';

export default (function() {
    let obj = {
	title : "General Words",
	words : Rx.Observable.fromPromise(Http({url:"/index.json"}))
	    .map(JSON.parse)
	    .selectMany(({links}) => {
		 
		return Rx.Observable.fromPromise(Http({url:links[0].href}))
		    .map(JSON.parse)
		    .selectMany(Rx.Observable.fromArray);
	    })
    }
    return obj;
	
	
})()
