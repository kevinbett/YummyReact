import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import Navigation from '../components/homepage/Home';

describe('Navigation Component', () => {
    const wrapper = shallow(<Navigation />);
    it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});