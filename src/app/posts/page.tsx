'use client'

import { supabase } from '@/supabase/supabase'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Posts() {
  const [posts, setPosts] = useState<
    Array<{ id: number; title: string; content: string }>
  >([])

  const fetchData = async () => {
    const { data: posts, error } = await supabase.from('posts').select('*')
    setPosts(posts ?? [])
  }

  useEffect(() => {
    fetchData()
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
