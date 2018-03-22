import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import RecipeDrawer from '../components/homepage/RecipeDrawer';

describe('RecipeDrawer Component', () => {
    const wrapper = shallow(<RecipeDrawer />);
    const preventDefault = jest.fn();
    it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('renders state initially', () => {
        expect(wrapper.state().username).toEqual('');
        expect(wrapper.state().password).toEqual('');
    })
});