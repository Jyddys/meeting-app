import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  function showDetailsHandler() {
    router.push('/' + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        { user &&
          <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
        }
        
      </Card>
    </li>
  );
}

export default MeetupItem;
