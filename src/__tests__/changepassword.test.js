import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ChangePassword from '../components/user/Change_password';

describe('Change Password Component', () => {
    const wrapper = shallow(<ChangePassword />);
    it('renders without crashing', () => {
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});