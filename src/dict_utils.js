import React from 'react';

function id(target) {
    if(target)
	return target.replace(/ /g, '-') + "-id";
}   

class Display extends React.Component {
    constructor(props) {
	super(props)
	this.state = { currentdisplay: props.kana, currenttoggle: false }
	this.forceUpdate()
    }

    componentDidMount() {

	componentHandler.upgradeDom();
    }



    render() {
	let check_id = `${this.props.id}-check` ;
	return (<td className={this.props.class_usage}>
		<span className="usage" >{this.state.currentdisplay}</span>
		<label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={check_id}>
	    <input type="checkbox" id={check_id} className="mdl-checkbox__input" value={this.state.currenttoggle}
		onChange={
		    evt => {
			let display;
			if(evt.currentTarget.checked) {
			    display = this.props.english
			}
			else
			    display = this.props.kana
			this.setState({currenttoggle:evt.currentTarget.checked,currentdisplay:display})
		    }
		}></input>
		<span className="mdl-switch__label"></span>
		</label>
		</td>)
    }
}

function Table({title,words,del,update,edit}) {
//    console.log(`Rendering ${title} is words observable: ${words.operator}`)
    return (<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp words" id={id(title)}>
	    <thead>
	    <tr>
	    <th className="mdl-data-table__cell-non-numeric">Kanji ( if applicable )</th>
	    <th>Meaning</th>
	    <th>Usage</th>
	    <th></th>
	    <th></th>
	    </tr>
	    </thead>
	    <tbody>
 	    {(_ => {
		if(words) {
		    return words.map(items => {
			
			return (<tr  key={items._id} data-id={items._id}>
				<td className="mdl-data-table__cell-non-numeric kanji" >
				{items[0] || items.kanji}
				</td>
				
				<Display id={`${items._id}-kana`} kana={items[1] || items.kana} english={items[2] || items.english} class_usage="kana"/>
				<Display id={`${items._id}-example`} kana={items[3] || items.kana_example} english={items[4] || items.english_example} class_usage="example"/>
				
				<td>
				<button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab" onClick={edit ? edit(items._id) : evt => {}}>
				<i className="material-icons">mode_edit</i>
				</button>
				</td>
				
				<td>
				<button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab" onClick={(
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
