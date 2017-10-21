import Rx from 'rx';
import Http from 'utils';
import Utils from './func_utils'

export default (function() {
    return {
	label: "Vivid Strike",
	add: Utils.addFunc('/vivid.json'),
	del: Utils.deleteFunc('/vivid.json'),
	words:
	Rx.Observable.fromPromise(Http({url:"/vivid.json"}))
	    .map(JSON.parse)
	    .selectMany(({links}) => {
		return Rx.Observable.fromPromise(Http({url:links[0].href}))
		    .map(JSON.parse)
		    .selectMany(Rx.Observable.fromArray)
	    })
    }
    
})()
