'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function PostDetail() {
  const { id } = useParams()
  useState({})
  return <>{id}번 게시글 상세</>
}
