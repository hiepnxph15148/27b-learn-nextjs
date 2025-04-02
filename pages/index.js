//import { useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
export default function HomePage(props) {
  //const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   // send a network request to fetch data
  //   setLoadedMeetups(props.meetups);
  // }, []);
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
export async function getStaticProps() {
  // fetch data from an API
  const uri = "mongodb://localhost:27017/";
  let client;
  try {
    client = await MongoClient.connect(uri);
  } catch (error) {
    return {
      props: {
        meetups: [],
      },
    };
  }
  const db = client.db("test");
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}).toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      })),
    },
    revalidate: 1,
  };
}
