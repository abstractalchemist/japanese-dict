import React from 'react';
import ReactDOM from 'react-dom';
import Words from './words_db';
import Vivid from './vivid';
import Nanoha from './nanoha';
import Actions from './action';
import { Nav, Drawer, Body  } from 'ui-utils'
import { Table,id } from './dict_utils'

function TextField({id,value,changehandler,label}) {
    return (<div className="mdl-textfield mdl-js-textfield">
	    <input className="mdl-textfield__input" type="text" id={id} value={value} onChange={changehandler}></input>
	    <label className="mdl-textfield__label" htmlFor="kanji">{label}</label>
	    </div>)

}

function RenderEditDialog({id,kana_example,example_kana_handler,english_example,example_english_handler,updatehandler,closehandler}) {
    return (<dialog className="mdl-dialog" id={id}>
	    <div className="mdl-dialog__content">
	    <TextField id={`${id}-example-kana`} value={kana_example} changehandler={example_kana_handler} label="Japanese Usage"/>
	    <TextField id={`${id}-example-english`} value={english_example} changehandler={example_english_handler} label="English Usage"/>
	    </div>
	    <div className="mdl-dialog__actions">
	    <button className="mdl-button mdl-js-button mdl-button__raised"
	    onClick={
		evt => {
		    if(updatehandler) {
			updatehandler()
		    }
		    document.querySelector(`#${id}`).close();
		}
	    }>
	    Update
	    </button>
	    <button className="mdl-button mdl-js-button mdl-button__raised"
	    onClick={
		_ => {
		    if(closehandler)
			closehandler();
		    document.querySelector(`#${id}`).close();
		}
	    }>
	    Cancel
	    </button>
	    </div>
	    </dialog>)
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

	this.updateWords();
    }
    
    updateWords() {
	let updateState = (prop, property) => {
	    return data => {
//		console.log(`setting words to ${data}`)
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
//		console.log("add finished");
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
			return portions.map(({label:title}, i) => {
			    return ( <a key={i} className="mdl-navigation__link" onClick={scroll(id(title))} >{title}</a> )
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
		    return sections.map(({label:title,words,db,del}, i) => {
			return (<div key={i} className="mdl-cell mdl-cell--12-col">
				<span>{title}</span>
				
				<Table title={title} words={words} del={del} update={this.updateWords.bind(this)} edit={
				    id => {
					return evt => {
					    console.log(`looking for ${id}`)
					    let word = words.filter(({_id}) => _id === id)
					    if(word.length > 0) {
						this.setState({kana_example:word[0].kana_example, english_example:word[0].english_example,update_id:id,update_db:db})
						
					    }
					    document.querySelector('#example-dialog').showModal()
					}
				    }
				}/>
				<br/>
			 	<button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-button--mini-fab"
				onClick={this.clickAdd.bind(this)}
				data-db={db}>
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

		<TextField id="kanji" value={this.state.kanji} changehandler={this.setKanji.bind(this)} label="Kanji..."/>
		<TextField id="Kana" value={this.state.kana} changehandler={this.setKana.bind(this)} label="Kana..."/>		
		<TextField id="english" value={this.state.english} changehandler={this.setEnglish.bind(this)} label="English..." />

		</form>
		</div>
		<div className="mdl-dialog__actions mdl-dialog__actions--full-width">
		<button className="mdl-button mdl-js-button" onClick={this.addEntry.bind(this)}>Add</button>
		<button className="mdl-button mdl-js-button close" onClick={this.close.bind(this)} >Cancel</button>
		</div>
		</dialog>

		<RenderEditDialog id="example-dialog"
		kana_example={this.state.kana_example}
		example_kana_handler={this.handleKanaExample.bind(this)}
		english_example={this.state.english_example}
		example_english_handler={this.handleEnglishExample.bind(this)}
		updatehandler={this.handleExampleUpdate.bind(this)}/>
		closehandler={
		    evt => {
			this.setState({kana_example:"",english_example:"",update_id:undefined,update_db:undefined})
		    }
		}
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

    handleKanaExample(evt) {
	this.setState({kana_example:evt.currentTarget.value})
    }

    handleEnglishExample(evt) {
	this.setState({english_example:evt.currentTarget.value})
    }

    handleExampleUpdate(evt) {
	let updater;
	switch(this.state.update_db) {
	case "words": {
	    updater = Words.update({_id:this.state.update_id,kana_example:this.state.kana_example,english_example:this.state.english_example})
	}
	    break;
	case "vivid": {
	    updater = Vivid.update({_id:this.state.update_id,kana_example:this.state.kana_example,english_example:this.state.english_example})
	}
	    break;
	case "nanoha": {
	    updater = Nanoha.update({_id:this.state.update_id,kana_example:this.state.kana_example,english_example:this.state.english_example})
	}
	    break;
	}
	updater.subscribe(
	    _ => {
	    },
	    err => {
		alert(err)
	    },
	    _ => {
		this.setState({kana_example:"",english_example:"",update_id:undefined,update_db:undefined})
		this.updateWords()
	    })
    }
}

document.addEventListener('DOMContentLoaded', _ => {
    ReactDOM.render(<Main words={Words} vivid={Vivid} nanoha={Nanoha} action={Actions}/>, document.querySelector('#content'));
})


export { Main as default };
