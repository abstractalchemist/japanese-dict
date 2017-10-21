import React from 'react'
import { mount } from 'enzyme'
import { Table } from '../src/dict_utils'
import { expect } from 'chai'

describe('<Table />', function() {
    xit('init', function() {
	const obj = mount(<Table title="Test" words={[{},{}]}/>)
	expect(obj).to.not.be.null;
    })
})
