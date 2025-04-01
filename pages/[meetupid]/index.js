import MeetupDetail from "../../components/meetups/MeetupDetail";
export default function MeetupDetailsPage({meetupData}) {
  return (
    <>
      <MeetupDetail
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          meetupid: "m1",
        },
      },
      {
        params: {
          meetupid: "m2",
        },
      },
    ],
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupid;
  console.log(meetupId);
  // fetch data for a single meetup
  return {
    props: {
      meetupData: {
        id: meetupId,
        title: "Meetup 1",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1200px-Flag_of_Canada_%28Pantone%29.svg.png",
        address: "Meetup 1",
        description: "Meetup 1",
      },
    },
  };
}