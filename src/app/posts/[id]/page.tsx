'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState({})
  useEffect(() => {
    fetch(`http://dummyjson.com/posts/${id}`)
      .then((res) => res.json())
      .then((res) => setPost(res))
  }, [])

  return (
    <>
      <div>{id}번 게시글 상세</div>
      <div>{post.title}</div>
      <div>{post.body}</div>
    </>
  )
}
