import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import Home from '../components/homepage/Homepage';

describe('Home Component', () => {
    const wrapper = shallow(<Home />);
    it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});