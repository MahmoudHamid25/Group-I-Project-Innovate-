
function Main(){
    return(
      <div className={"registrationForm"}>
          <div className={"containerFormRegister"}>
              <h1>Register</h1>
              <div className="coloredLine"></div>
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
              <div className={"centeringElementsLoginForm"}>
              <button className={"indexButtonLogin"}><a href={""}>Register</a></button>
              </div>
          </div>
      </div>
    );
}

export default function Page() {
    return (
        <Main/>
    );
}

