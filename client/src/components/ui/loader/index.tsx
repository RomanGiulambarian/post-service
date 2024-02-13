import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div className={styles.Loader__box}>
      <div className={styles.Loader}></div>
    </div>
  );
}

export default Loader;
