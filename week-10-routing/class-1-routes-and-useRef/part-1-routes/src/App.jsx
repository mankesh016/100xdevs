import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/neet/class-11" element={<Class11 />} />
            <Route path="/neet/class-12" element={<Class12 />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Header() {
  return (
    <div>
      <Link to="/"> Home </Link>
      <Link to="/neet/class-11"> Class 11 </Link>
      <Link to="/neet/class-12"> Class 12 </Link>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "10px" }}>
        <Outlet />
      </div>
    </div>
  );
}

function Landing() {
  return <div>Welcome back!</div>;
}

function Class11() {
  return <div>Class 11 programs</div>;
}

function Class12() {
  const navigate = useNavigate();

  function redirectToHome() {
    navigate("/");
  }
  return (
    <div>
      <div>Class 12 programs</div>
      <button onClick={redirectToHome}>Go back to Home page!</button>
    </div>
  );
}

function ErrorPage() {
  return <div>404 Page Not Found : /</div>;
}

export default App;
