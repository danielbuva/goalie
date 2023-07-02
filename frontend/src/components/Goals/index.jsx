import Post from "../Post";

export default function Goals({ goals }) {
  if (!goals || goals.length < 1) return null;

  return (
    <div>
      {goals.map((goal) => (
        <Post
          key={goal.id}
          title={goal.title}
          doit={goal.doit}
          createdAt={goal.createdAt}
          body={goal.body}
          user={goal.user}
        />
      ))}
    </div>
  );
}
