const http = require('http');
const fs = require('fs');

const db = process.argv[2];
const host = process.argv[4];
fs.readFile(process.argv[3], 'utf8', (err,data) => {

    let words = JSON.parse(data);
    words = words.words;
    words.map(data => {
	return {kanji:data[0],kana:data[1],english:data[2]};
    }).forEach(input_data => {
	let uuid = http.request({method:"GET",host:host,port:"5984",path:"/_uuids"}, res => {
	    let id;
	    res.on('data', data => {
		id = JSON.parse("" + data);
	    })
	    res.on('end', _ => {
		console.log(id.uuids[0]);

		let w = http.request({method:"PUT",host:host,port:"5984",path:"/" + db + "/" + id.uuids[0]}, res => {
		    let result;
		    res.on('data', output => {
			result += "" + output;
		    })

		    res.on('end', _ => {
			console.log(result);
		    })
		})
		console.log(JSON.stringify(input_data));
		w.write(JSON.stringify(input_data));
		w.end();
	    })
	})
	uuid.write('');
	uuid.end();
    })
})
