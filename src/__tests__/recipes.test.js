import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import Recipes from '../components/recipes/Recipes';

describe('Recipes Component', () => {
    const wrapper = shallow(<Recipes match={{ params: {}}}/>);
    it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('renders state initially', () => {
        expect(wrapper.state().recipes).toEqual([]);
    })
});
