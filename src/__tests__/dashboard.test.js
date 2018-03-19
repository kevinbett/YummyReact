import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import Dashboard from '../components/homepage/Dashboard';

describe('DashboardComponent', () => {
    const wrapper = shallow(<Dashboard />);
    it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});