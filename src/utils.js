export default function(opts, data) {
    return new Promise((resolve,reject) => {
	let method = opts.method || "GET";
	let inputs = data || "";
	let xhr = new XMLHttpRequest();
	xhr.open(method, opts.url);
	xhr.onreadystatechange = function() {
	    if(xhr.readyState === 4) {
		if(xhr.status === 200) {
		    resolve(xhr.responseText);
		}
		else
		    reject();
		
	    }

	}
	xhr.send(inputs);
    })
}
		       
    
