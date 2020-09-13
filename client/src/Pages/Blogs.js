import React from "react";
import NavBar from "Components/Navbar";
import ArticleCards from "Components/Article/ArticleCards";
import PATHS from "AppRouter/paths";
import useCancellablePromise from "Hooks/useCancellablePromise.js";
import Api from "Api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "Components/Footer";
import Spinner from "Components/Spinner";

const Blogs = () => {
  const [articles, setArticles] = React.useState([]);
  const history = useHistory();
  const { cancellablePromise } = useCancellablePromise();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    //fetch data.
    sendRequest();
  }, []);

  const sendRequest = async () => {
    try {
      /*Just primary check to find whether user is present or not. route is protected anyways*/
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || (user && !user.id)) throw { err: "Forbidden" };

      const resp = await cancellablePromise(
        fetch(Api.story, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
      );

      const data = await resp.json();
      if (data.err) {
        if (data.err === "Forbidden") logoutHander();
        else {
          toast.error("Internal Server Error");
        }
      } else {
        setArticles(data);
      }
      setLoading(false);

      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const logoutHander = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/");
  };
  return (
    <main>
      <NavBar nameInAuth="Logout" onClickHandler={logoutHander} />
      {loading && (
        <div className="h-screen relative">
          <Spinner className="mx-auto absCenter h-16 w-16" />
        </div>
      )}
      <ArticleCards
        sectionId="blogs"
        articles={articles}
        baseUrl={PATHS.blog}
      />
      <Footer />
    </main>
  );
};

export default Blogs;
