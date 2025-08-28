export default function PollPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1>Poll Details</h1>
      <p>Poll ID: {params.id}</p>
      {/* Poll details and voting will go here */}
    </div>
  );
}