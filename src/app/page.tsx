"use client";

import styles from './page.module.css'
import Input from '@/components/Interactibles/Input'
import { useFormHook } from '@/hooks/formHook';
import { evalMinLength } from '@/utils/input/validators'
import { useEffect, useState } from 'react'

export default function Home() {
  const [userForm, setUserForm] = useState({
    'username': "",
    'email_address': ""
  });
  const [userFormHook, isValid] = useFormHook();

  return (
    <main className={styles.main}>
      <form onSubmit={(e) => {
        e.preventDefault(); alert(isValid)
      }}>
        <Input input={{
          label: 'Username',
          name: 'username',
          validators: [evalMinLength(2)],
          inputType: 'text',
          onInput: (e) => userFormHook(e, setUserForm),
        }} />
        <Input input={{
          label: 'Email Address',
          name: 'email_address',
          validators: [evalMinLength(1)],
          inputType: 'text',
          onInput: (e) => userFormHook(e, setUserForm),
        }} />

        <button type='submit'>Submit</button>
      </form>

      {
        <div>
          <p>Hello</p>
          <p>{userForm.username}</p>
          <p>{userForm.email_address}</p>
        </div>
      }
    </main>
  )
}
