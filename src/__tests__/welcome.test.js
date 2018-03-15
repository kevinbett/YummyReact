import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import Welcome from '../homepage/welcome';

describe('Welcome Component', () => {
    const wrapper = shallow(<Welcome />);
    it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});