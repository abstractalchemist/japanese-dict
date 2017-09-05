import React from 'react';
import ReactDOM from 'react-dom';
import Words from './words_db';
import Vivid from './vivid';
import Nanoha from './nanoha';
import Actions from './action';

function id(target) {
    if(target)
	return target.replace(/ /g, '-') + "-id";
}

function Table({title,words}) {
    return (<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" id={id(title)}>
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
				{items[0] || items.kanji}
				</td>
				<td style={{textAlign:"left"}}>
				{items[1] || items.kana}
				</td>
				<td style={{textAlign:"left"}}>
				{items[2] || items.english}
				</td>
				</tr>)
		    })
		}
	    })()
	    }
	    </tbody>
	    </table>)

}


    

class Main extends React.Component {
    constructor(props) {
	super(props);
	this.words = props.words;
	this.vivid = props.vivid;
	this.nanoha = props.nanoha;
	this.action = props.action;
	this.state = {};

    }

    componentDidMount() {

	let updateState = (prop, property) => {
	    return data => {
		let obj = {};
		obj[property] = {
		    title: prop.title,
		    words: data };
		this.setState(obj);
	    }
	}
	
	this.words.words.toArray().subscribe(updateState(this.words, "words"));
	this.nanoha.words.toArray().subscribe(updateState(this.nanoha, "nanoha"));
	this.vivid.words.toArray().subscribe(updateState(this.vivid, "vivid"));
    }
    
    render() {
	
	let scroll = target => {
	    return evt => {
		evt.preventDefault();
		document.querySelector("#" + target).scrollIntoView();
	    }
	}

	let links = portions => {
	    return (<nav className="mdl-navigation">
		    {(_ => {
			return portions.map(({title}) => {
			    return ( <a className="mdl-navigation__link" onClick={scroll(id(title))} >{title}</a> )
			})
		    })()}
		    </nav>)
	    
	}

	let sections = [ this.state.words,
			 this.state.vivid,
			 this.state.nanoha,
			 this.action].filter(data => data);
	
	return (<div className="mdl-layout mdl-js-layout">
		<header className="mdl-layout__header">
		<div className="mdl-layout__header-row">
		<span className="mdl-layout-title">Weiss Japanese Specific Words</span>
		<div className="mdl-layout-spacer">
		</div>
		{links(sections)}
		</div>
		</header>
		<div className="mdl-layout__drawer">
		
		{links(sections)}
		
		</div>
		
		<main className="mdl-layout__content">
		<div className="mdl-grid" style={{ maxWidth:"70%" }}>
		{( _ => {
		    return sections.map(({title,words}) => {
			return (<div className="mdl-cell mdl-cell--12-col">
				<span>{title}</span>
				<Table title={title} words={words} />
				</div>)

		    })
		})()}
		
		</div>
		</main>
		</div>)
    }
}

document.addEventListener('DOMContentLoaded', _ => {
    ReactDOM.render(<Main words={Words} vivid={Vivid} nanoha={Nanoha} action={Actions}/>, document.querySelector('#content'));
})
