'use client'

import { supabase } from '@/supabase/supabase'
import Link from 'next/link'
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
  const [comment, setComment] = useState<string>('')
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

  const handleOnDeletePost = async (id: number) => {
    const { data, error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
      .select()
    if (error) {
      alert(error.message)
    } else if (!data || data.length === 0) {
      alert('권한이 없습니다.')
    } else {
      alert('삭제 성공!')
      router.push('/posts')
    }
  }

  const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id: id, content: comment }])
      .select()
    if (error) {
      alert(error.message)
    } else if (!data || data.length === 0) {
      alert('권한이 없습니다.')
    } else {
      alert('댓글 작성 성공!')
      setComment('')
      fetchComments()
    }
  }

  const handleOnDeleteComment = async (id: number) => {
    const { data, error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)
      .select()
    if (error) {
      alert(error.message)
    } else if (!data || data.length === 0) {
      alert('권한이 없습니다.')
    } else {
      alert('댓글 삭제 성공!')
      fetchComments()
    }
  }

  return (
    <>
      <div>{id}번 게시글 상세</div>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="comment"
          value={comment}
          placeholder="댓글 입력"
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="p-2 rounded border-1">댓글 작성</button>
      </form>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>
            - {comment.content}
            <button
              className="p-1 rounded border-1"
              onClick={() => handleOnDeleteComment(comment.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <button
        className="p-2 rounded border-1 hover:bg-gray-200"
        onClick={() => handleOnDeletePost(post.id)}
      >
        삭제
      </button>
      <Link
        href={`/posts/${post.id}/edit`}
        className="p-3 rounded border-1 hover:bg-gray-200"
      >
        수정
      </Link>
    </>
  )
}
