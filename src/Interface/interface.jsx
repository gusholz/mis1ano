import { useState } from 'react'
import style from './interface.module.css'
import { motion } from 'framer-motion';

export default function Interface(){

    const [isOpen,setIsOpen] = useState(false);


    function handleClick(){
        setIsOpen(!isOpen)
    }

    console.log(isOpen);

    return(
        <>
            {isOpen ? <motion.div>
                <p className={style.textoSuporte}>
                    Ao verificar o marcador especial na pagina do livro, aponte a câmera
                    do seu celular para o marcador para ver a tela da interação abrindo,
                    ao clicar nela, você será redirecionado para a interação!
                </p>
            </motion.div> : null}
            <img onClick={handleClick} src="images/questionMark.png" className={style.img}   />
            <h2 className={style.h2}>Aponte a câmera para um dos marcadores do livro</h2>
        </>
    )
}