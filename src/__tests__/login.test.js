import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import Login from '../login/Login';

describe('Login Component', () => {
    const wrapper = shallow(<Login />);
    const preventDefault = jest.fn();
    it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('renders state initially', () => {
        expect(wrapper.state().username).toEqual('');
        expect(wrapper.state().password).toEqual('');
    })
});