import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';


export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className='user-div'>
        <img className='user-img' src={user.picture} alt={user.name} />
        <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        </div>
      </div>
    )
  );
}