import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Icon, Checkbox, Button, Card } from 'antd';
import { setCookie, checkAuth, getCookie } from 'utils';
import router from 'umi/router';
import styles from './Login.less';

@connect(({ auth }) => ({
  auth,
}))
class Login extends Component {
  componentDidMount() {
    const { auth } = this.props;
    if (auth.auth === 1) {
      console.log('已登录');
      router.push('/family');
    } else {
      const username = getCookie('username');
      const password = getCookie('password');
      const remember = getCookie('remember');
      if (remember) {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
          username,
          password,
          remember,
        });
      }
    }
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        const { username, password, remember } = values;
        if (remember) {
          setCookie('username', username);
          setCookie('password', password);
          setCookie('remember', true);
        }
        if (checkAuth(username, password)) {
          dispatch({ type: 'auth/setauth', payload: { auth: 1 } });
          router.replace('/family');
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.root}>
        <div className={styles.loginForm}>
          <Card>
            <Form className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入你的用户名!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入你的密码!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>记住登录状态</Checkbox>)}
                <Button type="primary" onClick={this.handleSubmit} className={styles.loginButton}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}
export default Form.create()(Login);
