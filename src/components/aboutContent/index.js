import React from 'react'
import styles from './index.module.css'
import PageInfoHeader from '../pageInfoHeader'

const AboutContent = () => (
  <main className={styles.aboutWrapper}>
    <PageInfoHeader headline="About RahatCodes" />
    <p>Hi! I'm Rahat a Full Stack Web Developer from New York City. I started this series of streams initially just to practice speaking about code. As I started streaming more I realized how much fun I was having and how doing this in public has been improving my skills as a developer. </p>
    <p>I love working with JavaScript, CSS, HTML, NodeJS, SQL, MongoDB, React and GraphQL. My plan is to also slowly expand into more backend technologies to further expand on my knowledge. I even have an episode where I dabble in Golang!</p>
    <p>All of my episodes are live streamed Monday nights at 9:30 PM EST on Twitch. I hope to see you there on a stream!</p>
  </main>
);

export default AboutContent