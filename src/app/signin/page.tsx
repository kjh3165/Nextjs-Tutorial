'use client'

import { useState } from 'react'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email, password)
  }

  return (
    <form className="flex flex-col gap-2 items-start" onSubmit={handleOnSubmit}>
      <input
        type="email"
        name="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>로그인</button>
    </form>
  )
}
