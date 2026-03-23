'use client'

import { supabase } from '@/supabase/supabase'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  created_at: string
  title: string
  content: string
}

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)

  const fetchPost = async () => {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id as string)
      .single()
    setPost(post)
  }

  useEffect(() => {
    fetchPost()
  }, [])

  if (!post) {
    return <div> loading... </div>
  }

  return (
    <>
      <div>{id}번 게시글 상세</div>
      <div>{post.title}</div>
      <div>{post.content}</div>
    </>
  )
}
