import Rx from 'rx';
import Http from './utils';
import Utils from './func_utils'

export default (function() {
    let obj = {
	title : "General Words",
 	add: Utils.addFunc("/index.json"),
	del: Utils.deleteFunc("/index.json"),
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
