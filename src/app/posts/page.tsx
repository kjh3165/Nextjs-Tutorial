'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function PostList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then((res) => res.json())
      .then((res) => setPosts(res.posts))
  }, [])

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            {post.id} / {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
