import { Link } from "gatsby"
import Img from "gatsby-image/index"
import React from "react"
import style from "./BlogTile.module.css"

export function BlogTile({ title, fixedImage, link, author, excerpt, date }) {
  return (
    <Link className={style.tile} to={link}>
      <div
        style={{
          position: "relative",
          color: "white",
        }}
      >
        <Img style={{ width: "100%" }} fixed={fixedImage} alt="" />
        <div className={style.infoBar}>
          <span>{author}</span>
          <span>{date}</span>
        </div>
      </div>
      <div style={{ padding: "1rem 1rem 0" }}>
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: excerpt }} />
      </div>
    </Link>
  )
}
