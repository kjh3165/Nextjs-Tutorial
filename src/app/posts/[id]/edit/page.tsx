'use client'

import { supabase } from '@/supabase/supabase'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditPost() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const fetchPost = async () => {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id as string)
      .single()
    setTitle(post.title)
    setContent(post.content)
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', id)
      .select()
    if (error) {
      alert(error.message)
    } else if (!data || data.length === 0) {
      alert('권한이 없습니다.')
    } else {
      alert('수정 성공!')
      router.push(`/posts/${id}`)
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
      <button className="p-2 rounded border-2 border-gray-200">수정</button>
    </form>
  )
}
