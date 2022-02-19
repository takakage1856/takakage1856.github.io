const App = () => {
  const Link = ReactRouterDOM.Link;
    return (
        <ReactRouterDOM.BrowserRouter>
          <Link to="/">Home</Link>
          <Link to="/converter">変換</Link>
        <ReactRouterDOM.Routes>
          <ReactRouterDOM.Route path="/" element={<Dashboard />}/>
          <ReactRouterDOM.Route path="/converter" element={<Converter />}/>
        </ReactRouterDOM.Routes>
        </ReactRouterDOM.BrowserRouter>
    );
}