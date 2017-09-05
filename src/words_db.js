import Rx from 'rx';
import Http from './utils';

let db = 'test';
let id = '9cf2793a22f3f8f592ebe2f8020200cc';

export default (function() {
    let obj = {
	title : "General Words",
	words : Rx.Observable.fromPromise(Http({url:'/api/' + db + '/_design/' + id + '/_list/all/all'}))
	    .map(JSON.parse)
	    .selectMany(data => {
		return Rx.Observable.fromArray(data)
	    })
    }
    return obj;
	
	
})()
