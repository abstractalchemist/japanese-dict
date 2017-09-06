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
		    add: prop.add,
		    db: property,
		    words: data };
		this.setState(obj);
	    }
	}
	
	this.words.words.toArray().subscribe(updateState(this.words, "words"));
	this.nanoha.words.toArray().subscribe(updateState(this.nanoha, "nanoha"));
	this.vivid.words.toArray().subscribe(updateState(this.vivid, "vivid"));
    }

    clickAdd(evt) {
	let db = evt.target.dataset.db;
	if(db) {
	    console.log("clicked on " + db + " from %s", evt.target);
	    
	    document.querySelector("#add-entry").showModal();
	    this.addFunc = this[db].add;
	    evt.preventDefault();
	}
    }

    addEntry(evt) {

	this.addFunc(this.state).subscribe(
	    data => {
		console.log("add finished");
		this.setState({kanji:"",kana:"",english:""});
		document.querySelector("#add-entry").close();
	    })
	
    }

    close(evt) {
	document.querySelector("#add-entry").close();
	this.setState({kanji:"",kana:"",english:""});
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
		    return sections.map(({title,words,db}) => {
			return (<div className="mdl-cell mdl-cell--12-col">
				<span>{title}</span>
				
				<Table title={title} words={words} />
				<br/>
			 	<button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" onClick={this.clickAdd.bind(this)} data-db={db}>
				<i className="material-icons">add</i>
				</button>
				</div>)

		    })
		})()}
		
		</div>
		</main>
		<dialog id="add-entry" className="mdl-dialog">
		<h4 className="mdl-dialog__title">
		Add Entry
		</h4>
		<div className="mdl-dialog__content">
		<form id="entry-data">
		
		<div className="mdl-textfield mdl-js-textfield">
		<input className="mdl-textfield__input" type="text" id="kanji" value={this.state.kanji} onChange={this.setKanji.bind(this)}></input>
		<label className="mdl-textfield__label" htmlFor="kanji">Kanji...</label>
		</div>
		
		<div className="mdl-textfield mdl-js-textfield">
		<input className="mdl-textfield__input" type="text" id="Kana" value={this.state.kana} onChange={this.setKana.bind(this)}></input>
		<label className="mdl-textfield__label" htmlFor="kana">Kana...</label>
		</div>
		
		<div className="mdl-textfield mdl-js-textfield">
		<input className="mdl-textfield__input" type="text" id="english" value={this.state.english} onChange={this.setEnglish.bind(this)}></input>
		<label className="mdl-textfield__label" htmlFor="english">English...</label>
		</div>

		</form>
		</div>
		<div className="mdl-dialog__actions mdl-dialog__actions--full-width">
		<button className="mdl-button mdl-js-button" onClick={this.addEntry.bind(this)}>Add</button>
		<button className="mdl-button mdl-js-button close" onClick={this.close.bind(this)} >Cancel</button>
		</div>
		</dialog>
		</div>)
    }

    setKanji(evt) {
	this.setState({kanji:evt.target.value});
    }

    setKana(evt) {
	this.setState({kana:evt.target.value});
    }

    setEnglish(evt) {
	this.setState({english:evt.target.value});
    }
}

document.addEventListener('DOMContentLoaded', _ => {
    ReactDOM.render(<Main words={Words} vivid={Vivid} nanoha={Nanoha} action={Actions}/>, document.querySelector('#content'));
})
