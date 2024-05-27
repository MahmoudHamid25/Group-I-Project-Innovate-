import Image from 'next/image';

function LoginForm() {
    return (
      <div className={"loginForm"}>
        <Image src="/icon.svg" alt="StudyHub Logo" width={50} height={50} />
        <h1>Sign in to StudyHub</h1>
        <form>
          <p/><label htmlFor={"email"}>E-mail Address</label>
          <p/><input type={"email"} name={"email"} />
          <p/><label htmlFor={"password"}>Password</label>
          <p/><input type={"password"} name={"password"} />
          <p/><a href={"/forgot-password"}>Forgot your password?</a>
        </form>
        <button className={"indexButton"}><a href={""}>Sign in</a></button>
      </div>
    );
  }
  
  export default LoginForm;

