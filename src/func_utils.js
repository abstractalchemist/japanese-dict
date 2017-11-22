import Rx from 'rxjs/Rx';
import Http from 'utils'

export default (function() {
    return {
	addFunc : base => {
	    return fd => {
		return Rx.Observable.from(Http({url:base}))
		    .map(JSON.parse)
		    .mergeMap(({links}) => {
			return Rx.Observable.from(Http({url:links[2].href}))
			    .map(JSON.parse)
			    .mergeMap(({uuids}) => {
				return Http({url:links[1].href.replace(/<id>/,uuids[0]), method:"PUT"}, JSON.stringify({
				    kanji:fd.kanji,
				    kana:fd.kana,
				    english:fd.english}))
			    })
		    })
	    }
	},
	updateFunc: base => {
	    return fd => {
		return Rx.Observable.fromPromise(Http({url:base}))
		    .map(JSON.parse)
		    .mergeMap(({links}) => {
			
			return Rx.Observable.from(Http({url:links[1].href.replace(/<id>/, fd._id)}))
			    .map(JSON.parse)
			    .mergeMap(({_rev,_id,kanji,kana,english}) => 
				      Http({url:links[1].href.replace(/<id>/,_id), method:"PUT"}, JSON.stringify({
					  _rev,
					  kanji:fd.kanji || kanji,
					  kana:fd.kana || kana,
					  kana_example:fd.kana_example,
					  english_example:fd.english_example,
					  english:fd.english || english})))

			
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
