import LoginForm from '../ui/login-form';
import TitleToHome from '../ui/titleToHome';

export default function Page() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 min-h-svh">
        <TitleToHome />
        <LoginForm />
      </div>
    </>
  );
}
