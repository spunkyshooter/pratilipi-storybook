import React from "react";

import ArticleCard from "./ArticleCard.js";
import "./articles.scss";

/*
articles = [
  {id:"",
  createdAt:"",
  name:"",
  slug:"",
  description:""}
]
*/

const ArticleCards = ({
  sectionId,
  articles,
  baseUrl,
  LoadingComponent = null,
}) => {
  return (
    <section className="pt-16 px-8 lg:px-40" id={sectionId}>
      {/* //TODO: heading */}
      {LoadingComponent}
      <div className="mx-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {articles.map((item) => (
          <ArticleCard
            key={item._id}
            id={item._id}
            createdAt={item.createdAt}
            name={item.title}
            slug={item.slug}
            baseUrl={baseUrl}
            image={item.imageUrl}
            tags={item.tags}
            authorName={item.author && item.author.name}
          />
        ))}
      </div>
    </section>
  );
};

export default ArticleCards;
