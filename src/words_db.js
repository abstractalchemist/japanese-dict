import Rx from 'rxjs/Rx';
import Http from 'utils';
import Utils from './func_utils'

export default (function() {
    let obj = {
	label : "General Words",
 	add: Utils.addFunc("/index.json"),
	del: Utils.deleteFunc("/index.json"),
	words : Rx.Observable.fromPromise(Http({url:"/index.json"}))
	    .map(JSON.parse)
	    .mergeMap(({links}) => {
		 
		return Rx.Observable.fromPromise(Http({url:links[0].href}))
		    .map(JSON.parse)
		    .mergeMap(Rx.Observable.from);
	    })
    }
    return obj;
	
	
})()
