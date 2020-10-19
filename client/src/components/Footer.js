import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import { Icon } from 'antd';
import React from 'react'
const links = [
];

const copyright = (
    <div>
        Copyright <Icon type="copyright" /> {new Date().getFullYear()} Me2Zen服务器部门
    </div>
);

class Footer extends React.Component {
    render() {
        return (
            <div style={{ background: 'white', overflow: 'hidden' }}>
                <GlobalFooter links={links} copyright={copyright} />
            </div>
        );
    }
}

export default Footer;
