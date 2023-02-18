import { useSession, signIn, signOut } from "next-auth/react";

const LoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
        <img
          className="inline-block h-8 w-8 rounded-full"
          src={`${session.user?.image}`}
          alt=""
        />
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export { LoginButton };
