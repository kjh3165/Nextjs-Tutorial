'use client'

import { supabase } from '@/supabase/supabase'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  created_at: string
  title: string
  content: string
}

interface Comment {
  id: number
  created_at: string
  content: string
}

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const router = useRouter()

  const fetchPost = async () => {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id as string)
      .single()
    setPost(post)
  }

  const fetchComments = async () => {
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id as string)
    setComments(comments ?? [])
  }

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [])

  if (!post) {
    return <div> loading... </div>
  }

  const handleOnDelete = async (id: number) => {
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) {
      alert(error.message)
    } else {
      alert('삭제 성공!')
      router.push('/posts')
    }
  }
  return (
    <>
      <div>{id}번 게시글 상세</div>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>- {comment.content}</li>
        ))}
      </ul>
      <button
        className="p-2 rounded border-2 border-gray-200"
        onClick={() => handleOnDelete(post.id)}
      >
        삭제
      </button>
    </>
  )
}
