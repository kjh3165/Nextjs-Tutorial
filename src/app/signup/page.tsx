'use client'

import { supabase } from '@/supabase/supabase'
import { useState } from 'react'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      alert(error.message)
    } else {
      alert('회원가입 성공!')
    }
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="eamil"
        name="email"
        placeholder="이메일을 입력하세요"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>회원가입</button>
    </form>
  )
}
