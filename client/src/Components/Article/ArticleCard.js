import React from "react";
import SendSVG from "assets/send.svg";
import { getFormatedDate } from "utils/dateTime.js";
import { Link } from "react-router-dom";

const ArticleCard = ({
  id,
  createdAt,
  name,
  baseUrl,
  slug,
  image,
  authorName,
  tags = [],
}) => {
  let _tags = [];
  if (tags.length > 2) {
    _tags = tags.splice(0, 2);
  } else {
    _tags = tags;
  }
  return (
    <div className="blog-card flex flex-col justify-between relative transition-colors duration-200 ease-in-out ">
      <div
        className="blog-image"
        style={{ backgroundImage: `url("${image}")`, height: "45%" }}
      />
      <div className=" p-4" style={{ height: "55%" }}>
        <div>
          <p className="text-secondary text-xs mb-4 font-medium ">
            By {authorName}
          </p>
          <p className="mb-2 font-medium blog-text-primary leading-6 blog-card-title ">
            {name}
          </p>
        </div>

        <div className="absolute bottom-0 mb-4">
          <div className={`blog-card-tags my-2 `}>
            <ul className="capitalize flex flex-no-wrap justify-start  -mx-2 text-grey1">
              {_tags.map((tag, idx) => (
                <li key={`tags-${id}-${idx}`} className="text-xs">
                  {"#" + tag}
                </li>
              ))}
            </ul>
          </div>
          {/* Not encoding, since it is already slugified */}
          <Link to={`${baseUrl}/${slug}`}>
            <div className="rounded-full border blog-border-secondary cursor-pointer rocket">
              <img
                src={SendSVG}
                alt="send"
                style={{ padding: ".2rem", transform: "translateX(-1px)" }}
              />
            </div>
          </Link>
        </div>
        <div className="article-btn btn-bg-variant cursor-default absolute bottom-0 right-0 mr-4 mb-6 text-white text-xs font-medium px-4 py-2">
          {getFormatedDate(createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
