import Layout from '../components/layout'
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import BlendItPodcast from '../components/blend-it-podcast'

export default function Podcast() {
    return (
      <Layout>
        <Head>
          <title>Podcast</title>
        </Head>
        <h2 className={utilStyles.headingMd}>BlendIt Podcast</h2>
        <BlendItPodcast/>
      </Layout>
    )
  }