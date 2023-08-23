import React, { FC } from 'react'
import loader from '../../../assets/loader.svg'
import styles from './Preloader.module.css'

const Preloader: FC = () => {
    return (
        <img className={styles.loader} src={loader} />
    )
}

export default Preloader