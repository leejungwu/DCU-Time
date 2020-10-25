import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import Link from 'next/link';
// import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import useInput from '../hooks/useInput';
import { LOG_IN_REQUEST } from '../reducers/user';

// const ButtonWrapper = styled.div`
//   margin-top: 10px;
// `;

// const FormWrapper = styled(Form)`
//   padding: 10px;
// `;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, loginError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (loginError) {
      alert(logInError);
    }
  }, [loginError]);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    });
  }, [email, password]);

  return (
    // <FormWrapper onFinish={onSubmitForm}>
    //   <div>
    //     <label htmlFor="user-email">이메일</label>
    //     <br />
    //     <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
    //   </div>
    //   <div>
    //     <label htmlFor="user-password">비밀번호</label>
    //     <br />
    //     <Input
    //       name="user-password"
    //       type="password"
    //       value={password}
    //       onChange={onChangePassword}
    //       required
    //     />
    //   </div>
    //   <ButtonWrapper>
    //     <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
    //     <Link href="/signup"><a><Button>회원가입</Button></a></Link>
    //   </ButtonWrapper>
    // </FormWrapper>
    <Form
      style={{ marginLeft: 10, maxWidth: '400px', padding: 10 }}
      name="normal_login"
      initialValues={{
        remember: true,
      }}
      onFinish={onSubmitForm}
    >
      <Form.Item
        style={{ marginTop: 10 }}
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} type="email" value={email} onChange={onChangeEmail} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword} 
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={logInLoading}>
          Log in
        </Button>
        <br />Or <Link href="/signup"><a>register now!</a></Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
