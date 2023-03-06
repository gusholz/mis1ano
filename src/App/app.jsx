import '@nextcss/reset';
import { useEffect, useState } from 'react';
import Carregamento from '../Carregamento/carregamento';
import Camera from '../Camera/camera';
import Interface from '../Interface/interface';
import styles from './app.module.css'

export default function App() {
  const [width, setWidth] = useState(null);
  const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 10000); // tempo de carregamento em milisegundos
    }, []);

  if (width && width > 1000) {
    return (
      <div>
        <h1>Infelizmente essa interação só é suportada para dispositivos móveis :( </h1>
      </div>
    )
  }

    return (
        <div className={styles.app}>
            {!loaded ? <Carregamento /> : null}
            {loaded ? <Camera/> : null}
            {loaded ? <Interface/> :null}
        </div>
    )
}
