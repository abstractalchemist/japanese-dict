import Rx from 'rxjs/Rx';
import Http from 'utils';
import Utils from './func_utils'

export default (function() {
    return {
	label : "Magical Lyrical Nanoha",
	add: Utils.addFunc("/nanoha.json"),
	del: Utils.deleteFunc("/nanoha.json"),
	words :  //Rx.Observable.fromArray([["","",""]]),
	Rx.Observable.fromPromise(Http({url:"/nanoha.json"}))
	    .map(JSON.parse)
	    .mergeMap(({links}) => {
		return Rx.Observable.fromPromise(Http({url:links[0].href}))
		    .map(JSON.parse)
		    .mergeMap(Rx.Observable.from);
	    })
		       
    }
})()
