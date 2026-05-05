import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} Gustavo Fernandez Pascoaleto ·{" "}
        <span>&lt;/&gt; built with passion</span>
      </p>
    </footer>
  );
}
