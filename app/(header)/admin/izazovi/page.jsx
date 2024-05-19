import ChallengeEditor from '@/app/ui/admin/challengeEditor';

export default function Page() {
  const date = new Date();
  return <ChallengeEditor date={date} />;
}
