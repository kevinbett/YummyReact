import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import LeftDrawer from '../homepage/drawer';

describe('LeftDrawer Component', () => {
    const wrapper = shallow(<LeftDrawer />);
    it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});