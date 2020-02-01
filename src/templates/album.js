import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsAlbum.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsAlbum.title}</h1>
        <p className="sheet__lead">{data.datoCmsAlbum.description}</p>
        <div className="sheet__slider">
          <Slider infinite={true} slidesToShow={2} arrows>
            {data.datoCmsAlbum.images.map(({ fluid }) => (
              <img alt={data.datoCmsAlbum.title} key={fluid.src} src={fluid.src} />
            ))}
          </Slider>
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsAlbum.descriptionNode.childMarkdownRemark.html,
          }}
        />
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query AlbumQuery($slug: String!) {
    datoCmsAlbum(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      description
      images {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
    }
  }
`
