"use client";

import Image from 'next/image'
import styles from './page.module.css'
import Input from '@/components/Interactibles/Input'
import { evalMaxLength, evalMinLength, evalMinMaxLength, evalSpecialCharacters } from '@/utils/input/validators'
import { useEffect } from 'react'

export default function Home() {
  return (
    <main className={styles.main}>
      <Input input={{
        label: 'Text',
        name: 'text',
        validators: [evalMinMaxLength(1, 5), evalMinLength(1), evalMaxLength(4)],
        inputType: 'text',
        onInput: (e) => null,
      }} />
    </main>
  )
}
