import React from 'react'
import Main from '../src/index'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { Observable } from 'rxjs/Rx'
const { from } = Observable;

describe('<Main />', function() {
    it('create', function() {
	const obj = mount(<Main words={
	    {
		label:"Words Test",
		words: from([{}])
	    }
	} vivid={
	    {
		label:"Vivid Strike Test",
		words: from([{}])
	    }
	} nanoha={
	    {
		label:"Nanoha Test",
		words: from([{}])
	    }
	} actions={
	    {
		label:"Actions Test",
		words: from([{}])
	    }
	}/>)
	expect(obj).to.not.be.null;
    })
})
