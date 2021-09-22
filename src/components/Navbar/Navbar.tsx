import React from 'react';

import {Link} from "react-router-dom";
import {Menu} from "antd";
import {
    PlayCircleOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    SettingOutlined,
    MessageOutlined
} from '@ant-design/icons';


const Navbar: React.FC = () => {
    return (<Menu
            theme="dark" mode="inline">
            <Menu.Item key="1" icon={<UserOutlined/>}>
                <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<MessageOutlined/>}>
                <Link to="/dialogs">Messages</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined/>}>
                <a href='#'>News</a>
            </Menu.Item>
            <Menu.Item key="4" icon={<PlayCircleOutlined/>}>
                <a href='#'>Music</a>
            </Menu.Item>
            <Menu.Item key="5" icon={<SettingOutlined/>}>
                <a href='#'>Settings</a>
            </Menu.Item>
            <Menu.Item key="6" icon={<TeamOutlined/>}>
                <Link to="/users">Find Users</Link>
            </Menu.Item>
        </Menu>
    )
};

export default Navbar;