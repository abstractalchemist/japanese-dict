import Rx from 'rxjs/Rx';
import Http from 'utils'

export default (function() {
    return {
	addFunc : base => {
	    return fd => {
		return Rx.Observable.fromPromise(Http({url:base}))
		    .map(JSON.parse)
		    .mergeMap(({links}) => {
			return Rx.Observable.fromPromise(Http({url:links[2].href}))
			    .map(JSON.parse)
			    .mergeMap(({uuids}) => {
				return Rx.Observable.fromPromise(Http({url:links[1].href.replace(/<id>/,uuids[0]), method:"PUT"}, JSON.stringify({
				    kanji:fd.kanji,
				    kana:fd.kana,
				    english:fd.english})))
			    })
		    })
	    }
	},
	deleteFunc : base => {
	    return (id,rev) => {
		return Rx.Observable.fromPromise(Http({url:base})).
		    map(JSON.parse)
		    .mergeMap(({links}) => {
			return Rx.Observable.fromPromise(Http({url:links[3].href.replace(/<id>/,id + "?rev=" + rev),method:"DELETE"}))
			    .map(JSON.parse);
			    
		    })
	    }
	}
    }
})()
