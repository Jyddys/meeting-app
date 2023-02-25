import { connectDatabase, getAllDocuments } from '@/helpers/db-util';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  
  const client = await connectDatabase()

  const meetups = await getAllDocuments(client, 'meetups', {_id: -1}, {})

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1
  }; 
}

export default HomePage;
