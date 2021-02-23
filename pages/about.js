import Layout from '../components/layout'
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'

export default function About() {
    return (
      <Layout>
        <Head>
          <title>About</title>
        </Head>
        <article>
          <h2 className={utilStyles.headingMd}>About</h2>
          <p>foo</p>
          <p>bar</p>
          <p>bar2</p>
        </article>
      </Layout>
    )
  }