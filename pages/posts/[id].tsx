import { getAllPostIds, getPostsData } from "@/lib/posts";
import Layout from "@/components/layout";
import Date from "@/components/date";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";

export interface Post {
  id: string;
  title: string;
  date: string;
}

export interface PostData extends Post {
  contentHtml: string;
}
interface Props {
  params: Params;
}

interface Params {
  id: string;
}

export async function getStaticProps({ params }: Props) {
  const postData = await getPostsData(params.id);

  return {
    props: {
      postData,
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  }
}

export default function Post({ postData }: { postData: PostData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date date={postData.date}/>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <br />
    </Layout>
  )
}