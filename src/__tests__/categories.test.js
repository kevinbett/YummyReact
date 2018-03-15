import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import CategoryPost from '../categories/categories';

describe('CategoryPost Component', () => {
    const wrapper = shallow(<CategoryPost />);
    it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('renders state initially', () => {
        expect(wrapper.state().name).toEqual('');
    })
});