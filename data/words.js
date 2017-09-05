const http = require('http');

const db = "test";

function data() {
    return { title: "General Words",
	     words:
	     [
		 ["山札","やまふだ","deck"],
		 ["置場","おきば","place"],
		 ["手札","てふだ","own hand"],
		 ["舞台","ぶたい","stage"],
		 ["置く","おく", "to place ( onto stage )"],
		 ["払う","はらう","to pay"],
		 ["自分","じぶん","myself ( mine )"],
		 ["以下","いか","up to ( select up to a certain amount)"],
		 ["枚","まい","counter for flat objects"],
		 ["選んで","えらんで","to choose"],
		 ["相手","あいて","opponent"],
		 ["加え","くわえ","add to somewhere"],
		 ["以上","いしょう","more than ( selects some amount or greater )"],
		 ["裏向","うらむき","face down"],
		 ["控え室","ひかえしつ","waiting room"],
		 ["回","かい","counter for occurences ( After X, where X represents something"],
		 ["次","つぎ","next"],
		 ["行動","こうどう","action"],
		 ["行","きょう","to go"],
		 ["与える","あたえる","to give/deal"],
		 ["効果","こうか","effect"],
		 ["枚数","まいすう","number of flat things"],
		 ["等し","うとし","equal to"],
		 ["発生","はっせい","occur"],
		 ["他","ほか","other"],
		 ["後列","こうれつ","back row"],
		 ["好き","すき","like"],
		 ["枠","わく","location/slot"],
		 ["能力","のうりょく","ability"],
		 ["発動","はつどう","invoke"],
		 ["終わり","おわり","end"],
		 ["戻る","もどる","to return "],
		 ["持","もつ","to hold"],
		 ["名","な","name"],
		 ["含む","ふくむ","to contain"],
		 ["残","ぢん","remaining"],
		 ["緑","みどり","green"],
		 ["前列","ぜんれつ","front row"],
		 ["中央","ちゅうおう","center"],
		 ["元","もと","source ( like back where it came from)"],
		 ["順番","じゅんばん","in order of things"],
		 ["いた枠","いたわく","previous slot"],
		 ["引","いんよう","draw"],
		 ["公開","こうかい","show/display"],
		 ["使","つかう","use"],
		 ["減少","げんしょう","reduction"],
		 ["入れ","いれ","put in"],
		 ["替える","かえる","replace"],
		 ["高","たか","high"],
		 ["得","う","to gain/acquire"],
		 ["","",""],

	     ]
	   }
}

let words = data();
words = words.words;
words.map(data => {
    return {kanji:data[0],kana:data[1],english:data[2]};
}).forEach(input_data => {
    let uuid = http.request({method:"GET",host:"localhost",port:"5984",path:"/_uuids"}, res => {
	let id;
	res.on('data', data => {
	    id = JSON.parse("" + data);
	})
	res.on('end', _ => {
	    console.log(id.uuids[0]);

	    let w = http.request({method:"PUT",host:"localhost",port:"5984",path:"/" + db + "/" + id.uuids[0]}, res => {
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
