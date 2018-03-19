import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import Welcome from '../components/homepage/Welcome';

describe('Welcome Component', () => {
    const wrapper = shallow(<Welcome />);
    it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});