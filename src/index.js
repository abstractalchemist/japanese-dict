import React from 'react';
import ReactDOM from 'react-dom';
import Words from './words'

function Main({words}) {
    return (<div className="mdl-layout mdl-js-layout">
	    <main className="mdl-layout__content">
	    <div className="mdl-grid" style={{ maxWidth:"70%" }}>
	    <div className="mdl-cell mdl-cell--12-col">
	    <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
	    <thead>
	    <tr>
	    <th className="mdl-data-table__cell-non-numeric" style={{textAlign:"left"}}>Kanji ( if applicable )</th>
	    <th style={{textAlign:"left"}}>Kana</th>
	    <th style={{textAlign:"left"}}>English</th>
	    </tr>
	    </thead>
	    <tbody>
	    {(_ => {
		if(words) {
		    return words.map(items => {
			return (<tr>
				<td className="mdl-data-table__cell-non-numeric" style={{textAlign:"left"}}>
				{items[0]}
				</td>
				<td style={{textAlign:"left"}}>
				{items[1]}
				</td>
				<td style={{textAlign:"left"}}>
				{items[2]}
				</td>
				</tr>)
		    })
		}
	    })()
	    }
	    </tbody>
	    </table>
	    </div>
	    </div>
	    </main>
	    </div>)
}

document.addEventListener('DOMContentLoaded', _ => {
    ReactDOM.render(<Main words={Words}/>, document.querySelector('#content'));
})
