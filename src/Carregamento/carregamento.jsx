import styles from './carregamento.module.css'
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';

export default function Carregamento(){

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
          setProgress(progress => progress + 1);
        }, 100);
    
        return () => clearInterval(intervalId);
      }, []);
    
    
    return (
        <>
            <div className={styles.container}>
                <img className={styles.img} src="images/logoMis.webp"/>
                <img className={styles.img2} src="images/vetorLogoConectoBranco.webp"/>
            </div>
            <div className={styles.container2}>
                <h2 className={styles.h2}>Carregando...</h2>
                <motion.div
                    style={{ width: '100%', height: 8, background: '#ddd' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}>
                </motion.div>
            </div>
        </>
    )
}