import Link from 'next/link';

import classes from './MainNavigation.module.css';
import { useUser } from '@auth0/nextjs-auth0/client';
import Profile from '@/pages/Profile';

function MainNavigation() {
  const { user, error, isLoading } = useUser();

  return (

    <header className={classes.header}>
      <div className={classes.logo}>Meetups!</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          {user && <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>}
          
          {!user ?  <li>
            <Link href='/api/auth/login'>Login</Link>
            
          </li> :  <><li>
              <Link href='/api/auth/logout'>Logout</Link>
            </li><li>
                <Profile/>
              </li></>}
         
         
          
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
