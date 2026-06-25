import Link from "next/link";
import styles from "./style.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.titulo}>Mi App Localidades</h1>

      <p className={styles.descripcion}>
        Sistema para administrar Sexo, Zona y Localidades.
      </p>

      <div className={styles.botones}>
        <Link href="/sexo">
          <button className={styles.boton}>Sexo</button>
        </Link>

        <Link href="/zona">
          <button className={styles.boton}>Zona</button>
        </Link>

        <Link href="/localidades">
          <button className={styles.boton}>Localidad</button>
        </Link>
      </div>
    </main>
  );
}