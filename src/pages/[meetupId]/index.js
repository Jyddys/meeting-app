import { ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { connectDatabase, getDocumentIdList, getOneDocument } from '@/helpers/db-util';

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
      />
      </Fragment>
  )
}

export async function getStaticPaths() {

  let client

  try {
    client = await connectDatabase()
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error)
  }

  let meetups

  try {
    meetups = await getDocumentIdList(client, 'meetups')
    client.close()
  } catch (error) {
    console.log('Error getting meetup list: ', error)
  }

  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() },
    }))
  }
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await connectDatabase()
  const meetUpIdObj = new ObjectId(meetupId)
  const selectedMeetup = await getOneDocument(client, 'meetups', { _id: meetUpIdObj } )
  client.close()


  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
