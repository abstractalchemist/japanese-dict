import React from 'react';

function id(target) {
    if(target)
	return target.replace(/ /g, '-') + "-id";
}   


function Table({title,words,del,update}) {
//    console.log(`Rendering ${title} is words observable: ${words.operator}`)
    return (<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" id={id(title)}>
	    <thead>
	    <tr>
	    <th className="mdl-data-table__cell-non-numeric" style={{textAlign:"left"}}>Kanji ( if applicable )</th>
	    <th style={{textAlign:"left"}}>Kana</th>
	    <th style={{textAlign:"left"}}>English</th>
	    <th></th>
	    </tr>
	    </thead>
	    <tbody>
 	    {(_ => {
		if(words) {
		   return words.map(items => {
			
			return (<tr  data-id={items._id}>
				<td className="mdl-data-table__cell-non-numeric" style={{textAlign:"left"}}>
				{items[0] || items.kanji}
				</td>
  				<td style={{textAlign:"left"}}>
				{items[1] || items.kana}
				</td>
				<td style={{textAlign:"left"}}>
				{items[2] || items.english}
				</td>
				<td>
				<button className="mdl-button mdl-js-button mdl-button--fab" onClick={(
				    evt => {
					del(items._id, items._rev).subscribe(
					    data => {
						update();
					    });
					evt.preventDefault();
				    }
				)}>
				<i className="material-icons">close</i>
				</button>
				</td>
				</tr>)
		    })
		}
	    })()
	    }
	    </tbody>
	    </table>)

}

export { Table, id };
