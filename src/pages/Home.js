import React from 'react'
import { withRouteData, Head } from 'react-static'
import Markdown from 'react-markdown'

export const Home = ({title, description, body}) => (
  <main>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    <Markdown source={body} className="md" />
  </main>
)

export default withRouteData(Home)
