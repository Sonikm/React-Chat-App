
import "./login.css"
import avatar from '../../assets/avatar.png'
function Login() {
  return (
    <div className="login ">
      <div className="item">
        <h2>Welcome back</h2>
        <form>
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button className="bg-primary">Sign In</button>
        </form>
      </div>
      <div className="separator border-r-2 "></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form>
          <label htmlFor="file">
            <img src={avatar} alt="" />
            Uplaod an image
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            placeholder="File"
            name="file"
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button className="bg-primary">{"Sign Up"}</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
