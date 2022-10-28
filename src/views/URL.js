let URL;
if (process.env.NODE_ENV === "development") {
  URL = "http://localhost:9292";
} else {
  URL = "https://globify-backend.herokuapp.com";
}

export default URL;
