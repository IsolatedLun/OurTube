"use client";

import Input from '@/components/Interactibles/TextInput'
import FileInput from '@/components/Interactibles/FileInput'
import { useFormHook } from '@/hooks/formHook';
import { evalMinLength } from '@/utils/input/validators'
import { useState } from 'react'

export default function Home() {
  const [userForm, setUserForm] = useState({
    'username': "",
    'email_address': ""
  });
  const [userFormHook, isValid] = useFormHook(userForm);

  return (
    <main>
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
        <FileInput input={{
          label: 'File',
          name: 'file',
          validators: [],
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
