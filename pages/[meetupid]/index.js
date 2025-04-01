import { useRouter } from "next/router";

export default function MeetupDetailsPage() {
  const router = useRouter();
  const { meetupId } = router.query;
  return (
    <>
      <h1>Meetup Details Page</h1>
      <p>{meetupId}</p>
    </>
  );
}
