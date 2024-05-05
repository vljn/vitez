import RegisterForm from '../ui/registerForm';
import Title from '../ui/title';

export default async function Page() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 min-h-svh">
        <Title>Витез</Title>
        <RegisterForm />
      </div>
    </>
  );
}
