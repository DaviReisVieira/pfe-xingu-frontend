import styles from "../styles/components/LoadingBox.module.css";

interface LoadingBoxProps {
  text?: string;
}

export function LoadingBox({ text = 'Carregando...' }: LoadingBoxProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.shadow}></div>
      <div className={styles.shadow}></div>
      <div className={styles.shadow}></div>
      <span>{text}</span>
    </div>
  );
}