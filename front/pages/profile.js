import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/dist/next-server/server/router';
import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }
  
  return (
    <AppLayout>
      <NicknameEditForm />
      <FollowList
        header="팔로잉"
        data={me.Followings}
      />
      <FollowList
        header="팔로워"
        data={me.Followers}
      />
    </AppLayout>
  );
};

export default Profile;
