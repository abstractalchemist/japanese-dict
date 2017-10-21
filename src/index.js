import React from 'react';
import ReactDOM from 'react-dom';
import Words from './words_db';
import Vivid from './vivid';
import Nanoha from './nanoha';
import Actions from './action';
import { Nav, Drawer, Body  } from 'ui-utils'
import { Table,id } from './dict_utils'


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

	this.updateWords();
    }
    
    updateWords() {
	let updateState = (prop, property) => {
	    return data => {
		console.log(`setting words to ${data}`)
		let obj = {};
		obj[property] = {
		    label: prop.label,
		    add: prop.add,
		    del: prop.del,
		    db: property,
		    words: data };
		this.setState(obj);
	    }
	}

	this.words.words.toArray()
	    .subscribe(
		updateState(this.words, "words"),
		err => {
		    console.log(`error ${err}`)
		});
	this.nanoha.words.toArray()
	    .subscribe(
		updateState(this.nanoha, "nanoha"),
		err => {
		    console.log(`error ${err}`)
		})
	this.vivid.words.toArray()
	    .subscribe(
		updateState(this.vivid, "vivid"),
		err => {
		    console.log(`error ${err}`)
		})
		

    }
    
    clickAdd(evt) {
	let db = evt.target.dataset.db || evt.target.parentElement.dataset.db;
	
	console.log("clicked on " + db + " from %s", evt.target);
	
	document.querySelector("#add-entry").showModal();
	this.addFunc = this[db].add;
	evt.preventDefault();
	
    }

    addEntry(evt) {

	this.addFunc(this.state).subscribe(
	    data => {
		console.log("add finished");
		this.setState({kanji:"",kana:"",english:""});
		document.querySelector("#add-entry").close();
		this.updateWords();
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
			return portions.map(({label:title}) => {
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
		<Nav title="Weiss Japanese Specific Words" links={sections.map(
		    s => {
			s.id = id(s.label);
			return s
		    }
		)} />
		<Drawer title="Weiss Japanese Specific Words" links={sections.map(
		    s => {
			s.id = id(s.label);
			return s;
		    }
		)} />
								    
		<Body>
		<div className="mdl-grid" style={{ maxWidth:"70%" }}>
		{( _ => {
		    return sections.map(({label:title,words,db,del}) => {
			return (<div className="mdl-cell mdl-cell--12-col">
				<span>{title}</span>
				
				<Table title={title} words={words} del={del} update={this.updateWords.bind(this)}/>
				<br/>
			 	<button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" onClick={this.clickAdd.bind(this)} data-db={db}>
				<i className="material-icons">add</i>
				</button>
				</div>)

		    })
		})()}
		
		</div>
		</Body>
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


export { Main as default };
