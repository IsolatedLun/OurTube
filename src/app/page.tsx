"use client";

import Image from 'next/image'
import styles from './page.module.css'
import Input from '@/components/Interactibles/Input'
import { evalSpecialCharacters } from '@/utils/input/validators'
import { useEffect } from 'react'

export default function Home() {
  return (
    <main className={styles.main}>
      <Input input={{
        label: 'text',
        name: 'text',
        validators: [],
        inputType: 'text'
      }} />
    </main>
  )
}
