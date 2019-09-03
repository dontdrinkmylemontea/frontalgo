import styles from './index.less';
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import MenuData from './MenuData';
import { Layout, Menu, Icon, message } from 'antd';
import { getCookie, setCookie, checkAuth } from '@/utils/util';
const { Header, Sider, Content } = Layout;

@connect(({ loading, auth }) => ({
  loadingData: loading,
  auth,
}))
class BasicLayout extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    console.log('checkauth', checkAuth(getCookie('username'), getCookie('password')));
    if (checkAuth(getCookie('username'), getCookie('password'))) {
      dispatch({ type: 'auth/setauth', payload: { auth: 1 } });
      router.push('/');
      console.log('已登录');
    } else {
      dispatch({ type: 'auth/setauth', payload: { auth: -1 } });
    }
  }

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  onClickMenu = ({ key }) => {
    router.push(MenuData.filter(data => String(data.index) === key)[0].path);
  };

  logout = () => {
    const { dispatch } = this.props;
    setCookie('username', '');
    setCookie('password', '');
    dispatch({ type: 'auth/setauth', payload: { auth: -1 } });
    router.push('/login');
  };

  render() {
    const { children, history, auth } = this.props;
    const { pathname } = history.location;
    if (auth.auth === -1 && pathname !== '/login') {
      console.log('not login!!');
      message.error('请先登录');
      router.push('/login');
      return null;
    } else if (auth.auth === 0) {
      return null;
    }
    return pathname !== '/login' ? (
      <div className={styles.normal}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu
              onClick={this.onClickMenu}
              theme="dark"
              defaultSelectedKeys={MenuData.filter(data => data.path === pathname).map(data =>
                String(data.index),
              )}
              mode="inline"
            >
              {MenuData.map(menu => (
                <Menu.Item key={String(menu.index)}>
                  <Icon type={menu.icon} />
                  <span>{menu.name}</span>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                background: '#fff',
                padding: '0 20px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <a onClick={this.logout}>退出登录</a>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
            </Content>
          </Layout>
        </Layout>
      </div>
    ) : (
      children
    );
  }
}

export default BasicLayout;
