import EmailSent from "../components/EmailSent";
import Footer from "../components/Footers";
import QuickLinks from "../components/QuickLinks";
import styles from "./Contact.module.scss";
export default function Contact() {
  return (
    <section id="contato" className={`section ${styles.contact}`}>
      <div className="section__inner">
        <pre className={styles.asciiTitle}>
          {` _____             _        _        
/  __ \\           | |      | |       
| /  \\/ ___  _ __ | |_ __ _| |_ ___  
| |    / _ \\| '_ \\| __/ _\` | __/ _ \\ 
| \\__/\\ (_) | | | | || (_| | || (_) |
 \\____/\\___/|_| |_|\\__\\__,_|\\__\\___/`}
        </pre>

        <div className={styles.cols}>
          <div className={styles.col}>
            <EmailSent />
          </div>

          <div className={styles.col}>
            <QuickLinks
              githubUrl="https://github.com/GustavoAlot"
              whatsappUrl="https://wa.me/+5567998158212"
              emailAddress="gusalot22@gmail.com"
              cvUrl={`${import.meta.env.BASE_URL}assets/GustavoFernandezPTBR.pdf`}
            />
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
}
