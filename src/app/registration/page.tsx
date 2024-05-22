import {Footer, NavBar} from "@/app/page";

function Main(){
    return(
      <div className={"registrationForm"}>
          <h1>Register</h1>
          <p><hr/></p>
          <form>
              <p/><label htmlFor={"nickName"}>Nickname</label>
              <p/><input type={"text"} name={"nickName"}/>
              <p/><label htmlFor={"email"}>E-mail address</label>
              <p/><input type={"email"} name={"email"}/>
              <p/><label htmlFor={"password"}>Password</label>
              <p/><input type={"password"} name={"password"}/>
              <p/><label htmlFor={"confirmPassword"}>Confirm password</label>
              <p/><input type={"password"} name={"confirmPassword"}/>
          </form>
      </div>
    );
}

export default function Page() {
    return (
        <body>
        <NavBar />
            <main>
                <Main/>
            </main>
            <Footer />
        </body>
    );
}

