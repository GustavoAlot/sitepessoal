import { useEffect, useMemo, useState } from "react";
import AsciiVideo from "../components/AsciiVideo";
import s from "./Sobre.module.scss";

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    const currentWord = words[index];

    let delay = 75;

    if (phase === "pause") delay = 1200;
    if (phase === "deleting") delay = 35;

    const timeout = setTimeout(() => {
      if (phase === "typing") {
        const nextText = currentWord.slice(0, text.length + 1);
        setText(nextText);

        if (nextText === currentWord) {
          setPhase("pause");
        }

        return;
      }

      if (phase === "pause") {
        setPhase("deleting");
        return;
      }

      if (phase === "deleting") {
        const nextText = currentWord.slice(0, text.length - 1);
        setText(nextText);

        if (nextText === "") {
          setPhase("typing");
          setIndex((i) => (i + 1) % words.length);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, phase, index, words]);

  return text;
}

export default function Sobre() {
  const words = useMemo(
    () => ["Full-Stack Developer", "Front-End Developer", "Back-End Developer"],
    [],
  );

  const typed = useTypewriter(words);

  return (
    <section id="sobre" className="section">
      <div className="section__inner">
        <div className={s.layout}>
          <div className={s.text}>
            <pre className={s.ascii}>
              {` _____              _                        
|  __ \\            | |                       
| |  \\/ _   _  ___ | |_   __ _ __   __  ___  
| | __ | | | |/ __|| __| / _\` |\\ \\ / / / _ \\ 
| |_\\ \\| |_| |\\__ \\| |_ | (_| | \\ V / | (_) |
 \\____/ \\__,_||___/ \\__| \\__,_|  \\_/   \\___/ `}
            </pre>

            <pre className={s.ascii}>
              {`______                                       _            
|  ___|                                     | |           
| |_     ___  _ __  _ __    __ _  _ __    __| |  ___  ____ 
|  _|   / _ \\| '__|| '_ \\  / _\` || '_ \\  / _\` | / _ \\|_  /
| |    |  __/| |   | | | || (_| || | | || (_| ||  __/ / / 
\\_|     \\___||_|   |_| |_| \\__,_||_| |_| \\__,_| \\___|/___|`}
            </pre>

            <h2 className={s.role}>
              {typed}
              <span className={s.caret} />
            </h2>

            <p className={s.summary}>
              Olá! Sou Cientista da Computação formado na UNIFAL. Atualemnte no
              cargo de Desenvolvedor JR que adora resolver problemas e desafios.
              Tenho experiências práticas recentes com Node.js, React,
              JavaScript e banco de dados.
            </p>
          </div>

          <div className={s.media}>
            <AsciiVideo />
          </div>
        </div>
      </div>
    </section>
  );
}
