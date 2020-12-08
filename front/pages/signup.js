import React, { useCallback, useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';

import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 5,
    },
  },
};

const Signup = () => {
  // const [passwordCheck, setPasswordCheck] = useState('');
  // const [term, setTerm] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);
  // const [termError, setTermError] = useState(false);

  // const [email, onChangeEmail] = useInput('');
  // const [nick, onChangeNick] = useInput('');
  // const [password, onChangePassword] = useInput('');
  // const dispatch = useDispatch();
  // const { me, signUpDone, signUpError, signUpLoading } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (me && me.id) {
  //     Router.replace('/');
  //   }
  // }, [me && me.id]);

  // useEffect(() => {
  //   if (signUpDone) {
  //     Router.replace('/');
  //   }
  // }, [signUpDone]);

  // useEffect(() => {
  //   if (signUpError) {
  //     alert(signUpError);
  //   }
  // }, [signUpError]);

  // const onSubmit = useCallback(() => {
  //   if (password !== passwordCheck) {
  //     return setPasswordError(true);
  //   }
  //   if (!term) {
  //     return setTermError(true);
  //   }
  //   return dispatch({
  //     type: SIGN_UP_REQUEST,
  //     data: {
  //       email,
  //       password,
  //       nickname: nick,
  //     },
  //   });
  // }, [email, nick, password, passwordCheck, term]);

  // const onChangePasswordCheck = useCallback((e) => {
  //   setPasswordError(e.target.value !== password);
  //   setPasswordCheck(e.target.value);
  // }, [password]);

  // const onChangeTerm = useCallback((e) => {
  //   setTermError(false);
  //   setTerm(e.target.checked);
  // }, []);

  // return (
  //   <AppLayout>
  //     <Head>
  //       <title>회원가입</title>
  //     </Head>
  //     <Form onFinish={onSubmit} style={{ padding: 10 }}>
  //       <div>
  //         <label htmlFor="user-email">이메일</label>
  //         <br />
  //         <Input name="user-email" value={email} required onChange={onChangeEmail} />
  //       </div>
  //       <div>
  //         <label htmlFor="user-nick">닉네임</label>
  //         <br />
  //         <Input name="user-nick" value={nick} required onChange={onChangeNick} />
  //       </div>
  //       <div>
  //         <label htmlFor="user-password">비밀번호</label>
  //         <br />
  //         <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
  //       </div>
  //       <div>
  //         <label htmlFor="user-password-check">비밀번호체크</label>
  //         <br />
  //         <Input
  //           name="user-password-check"
  //           type="password"
  //           value={passwordCheck}
  //           required
  //           onChange={onChangePasswordCheck}
  //         />
  //         {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
  //       </div>
  //       <div>
  //         <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관에 동의합니다.</Checkbox>
  //         {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
  //       </div>
  //       <div style={{ marginTop: 10 }}>
  //         <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
  //       </div>
  //     </Form>
  //   </AppLayout>
  // );

  const [email, onChangeEmail] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();
  const { me, signUpDone, signUpError, signUpLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const onSubmit = useCallback(() => {
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        nickname: nick,
      },
    });
  }, [email, nick, password]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSubmit} style={{ padding: 10 }} scrollToFirstError {...formItemLayout}>
        <br />
        <Form.Item
          name="user-id"
          label="ID"
          rules={[
            {
              required: true,
              message: 'Please input your ID!',
            },
          ]}
        >
          <Input name="user-id" value={email} required onChange={onChangeEmail} />
        </Form.Item>
        <Form.Item
          name="user-nick"
          label="Nickname"
          rules={[
            {
              required: true,
              message: 'Please input your Nickname!',
            },
          ]}
        >
          <Input name="user-nick" value={nick} required onChange={onChangeNick} />
        </Form.Item>
        <Form.Item
          name="user-password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input name="user-password" value={password} required onChange={onChangePassword} />
        </Form.Item>
        <Form.Item
          name="user-password-check"
          label="Password-check"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('user-password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
          hasFeedback
        >
          <Input
            name="user-password-check"
            type="password"
            required
          />
        </Form.Item>
        <Form.Item
          {...tailFormItemLayout}
          name="user-term"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('Should accept agreement'),
            },
          ]}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = 'None';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default Signup;