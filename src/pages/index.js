import Contacts from '@/components/contacts'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })


const Home = () => {
    return (
        <div>
            <Contacts className="absolute float-left" />
        </div>
    )
}

export default Home
