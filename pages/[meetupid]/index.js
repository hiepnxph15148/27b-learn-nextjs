import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

export default function MeetupDetailsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData?.title}</title>
        <meta name="description" content={props.meetupData?.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData?.image}
        title={props.meetupData?.title}
        address={props.meetupData?.address}
        description={props.meetupData?.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const uri = "mongodb://localhost:27017/";
  let client;
  try {
    client = await MongoClient.connect(uri);
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
  const db = client.db("test");
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: "blocking",
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const uri = "mongodb://localhost:27017/";
  let client;
  try {
    client = await MongoClient.connect(uri);
  } catch (error) {
    return {
      props: {
        meetupData: null,
      },
    };
  }
  const db = client.db("test");
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({
    _id: ObjectId.createFromHexString(meetupId),
  });
  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}
