import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/authenticated/chat/$chatId')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const chatId = params.chatId;
  console.log(chatId);

  return <div className='text-5xl'>{chatId}</div>;
}
