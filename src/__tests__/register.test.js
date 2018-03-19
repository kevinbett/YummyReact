import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import Register from '../components/user/Register';

describe('Register Component', () => {
    const wrapper = shallow(<Register />);
    it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('renders state initially', () => {
        expect(wrapper.state().username).toEqual('');
        expect(wrapper.state().email).toEqual('');        
        expect(wrapper.state().password).toEqual('');
    })
});