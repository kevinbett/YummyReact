import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import Dashboard from '../homepage/dashboard';

describe('DashboardComponent', () => {
    const wrapper = shallow(<Dashboard />);
    it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});