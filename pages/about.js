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
          <p>I’m a Berlin-based software engineer with a background in the embedded systems and cloud solutions. Over the years, I have focused on the serverless concept.</p>
          <p>I'm co-hosting the BlendIt podcast as well where we are talking about IT industry and area around it.</p>
          <p>When I'm not writing a code or stuck in the meetings I enjoy me coffee routine and cooking some high kitchen meals (at least I try).</p>
          <p>Feel free to reach out on LinkedIn in case of any question or just chatting.</p>
        </article>
      </Layout>
    )
  }