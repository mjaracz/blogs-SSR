import Layout, {siteTitle} from "@/components/layout";
import Head from "next/head";
import Link from "next/link";
import Date from "@/components/date";
import utilStyles from "@/styles/utils.module.css";
import { getSortedPostsData } from "@/lib/posts";

interface PropsHome {
  allPostsData: { id: string, date: string, title: string }[]
}
export default function Home({ allPostsData }: PropsHome) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          hello, I{`'`}m Michal. I{`'`}m software engineer and private investor.
          You can contact me via email: michaljaracz2@gmail.com
        </p>
      </section>
      <br />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date date={date} />
            </small>
          </li>
        ))}
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData =  getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  }
}
