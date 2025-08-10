import styles from "./page.module.css";

export default function About() {
  return (
    <div className={`container--narrow flex-center ${styles.container}`}>
      <h1>Hi</h1> <br />
      <p>
        Just a chill guy from The Netherlands, born in 2003 who enjoys games,
        tech and working out.
      </p>
      <p>
        Studying for a Bachelor of Applied Computer Sciences in Rotterdam. With
        how things are going right now it seems like I'm leaning more towards
        the web dev route, but anything else still interests me very much.
      </p>
      <p>
        This website is made so I have one centralized place to showcase/put all
        of my stuff on. You can expect this place to gradually grow bigger with
        more features and fun stuff.
      </p>
      <p>
        Not sure what else to put in here, I guess just hit me up if there's
        anything you'd like to know.
      </p>
    </div>
  );
}
