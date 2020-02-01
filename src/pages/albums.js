import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const IndexPage = ({ data }) => (
  <Layout>
    <Masonry className="showcase">
      {data.allDatoCmsAlbum.edges.map(({ node: album }) => (
        <div key={album.id} className="showcase__item">
          <figure className="card">
            <Link to={`/albums/${album.slug}`} className="card__image">
              <Img fluid={album.coverImage.fluid} />
            </Link>
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link to={`/albums/${album.slug}`}>{album.title}</Link>
              </h6>
              <div className="card__description">
                <p>{album.description}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsAlbum(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          description
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
