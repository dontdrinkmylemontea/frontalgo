import styles from './index.less';
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import MenuData from './MenuData';
import { Layout, Menu, Icon } from 'antd';
import { getCookie, setCookie, checkAuth } from '@/utils/util';
const { Header, Sider, Content } = Layout;

@connect(({ loading, auth }) => ({
  loadingData: loading,
  auth,
}))
class BasicLayout extends Component {
  componentDidMount() {
    this.checkAuth();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.auth !== this.props.auth.auth) {
      this.checkAuth();
    }
  }

  checkAuth = () => {
    const { dispatch } = this.props;
    if (checkAuth(getCookie('username'), getCookie('password'))) {
      dispatch({ type: 'auth/setauth', payload: { auth: 1 } });
    } else {
      dispatch({ type: 'auth/setauth', payload: { auth: -1 } });
      router.push('/login');
    }
  };

  onClickMenu = ({ key }) => {
    router.push(MenuData.filter(data => String(data.index) === key)[0].path);
  };

  logout = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'auth/setauth', payload: { auth: -1 } });
    setCookie('username', '');
    setCookie('password', '');
    router.push('/login');
  };

  render() {
    const { children, history, auth } = this.props;
    const { pathname } = history.location;
    // if (auth.auth === -1 && pathname !== '/login') {
    //   router.push('/login');
    //   return null;
    // }
    if (auth.auth !== 1 && pathname !== '/login') return null;
    return pathname !== '/login' ? (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
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
            <div style={{ padding: 24, background: '#fff', minHeight: 'calc(100vh - 84px)' }}>
              {auth.auth === 1 ? children : null}
            </div>
          </Content>
        </Layout>
      </Layout>
    ) : (
      children
    );
  }
}

export default BasicLayout;
