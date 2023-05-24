import styles from "/styles/Home.module.scss";

export default function Home({ apiURL }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          Edit as you like, or go to the <b>dashboard</b> branch to get a table
          with filters, search and sorting!
        </div>
      </div>
    </>
  );
}
export async function getStaticProps(context) {
  const apiURL = process.env.API_URL;
  return {
    props: {
      apiURL,
    },
  };
}
