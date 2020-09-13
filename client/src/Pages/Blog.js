import React from "react";
import useCancellablePromise from "Hooks/useCancellablePromise.js";
import Api from "Api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "Styles/blog.module.scss";
import Footer from "Components/Footer";
import Spinner from "Components/Spinner";
import NavBar from "Components/Navbar";
import readCountImg from "assets/count.png";
import currentlyReadingImg from "assets/currentlyReading.png";

const Blog = ({ match }) => {
  const history = useHistory();
  const { cancellablePromise } = useCancellablePromise();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const slug = match && match.params && match.params.slug;
    sendRequest(slug);
  }, []);

  const sendRequest = async (slug) => {
    try {
      /*Just primary check to find whether user is present or not. route is protected anyways*/
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || (user && !user.id)) throw { err: "Forbidden" };

      const url = Api.story + "/" + slug;
      const resp = await cancellablePromise(
        fetch(url, {
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
        setData(data);
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
      <section className="relative">
        <div className={styles.article_body}>
          <h1>{data.title}</h1>
          {data.content && (
            <div className={`lg:absolute flex lg:block my-8 md:my-auto ${styles.side_banner}`}>
              <div className="flex lg:m-8">
                <img src={readCountImg} alt="currently reading" />{" "}
                <span className="inline-block ml-2">
                  {data.currentlyViewing}
                </span>
              </div>
              <div className="flex lg:m-8 mx-4 md:mx-0">
                <img src={currentlyReadingImg} alt="read count" />{" "}
                <span className="inline-block ml-2">{data.readCount}</span>
              </div>
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Blog;
