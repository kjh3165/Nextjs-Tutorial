'use client'

import { supabase } from '@/supabase/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewPost() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content }])
      .select()
    if (error) {
      alert(error.message)
    } else if (!data || data.length === 0) {
      alert('권한이 없습니다.')
    } else {
      alert('글쓰기 성공!')
      router.push('/posts')
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-2 items-start">
      <input
        type="text"
        name="title"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="content"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="p-2 rounded border-2 border-gray-200">등록</button>
    </form>
  )
}
