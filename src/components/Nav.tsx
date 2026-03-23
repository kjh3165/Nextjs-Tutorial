'use client'

import { supabase } from '@/supabase/supabase'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // 인증상태(로그인, 로그아웃) 변경을 감지하는 리스너
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })
    // 클린업 함수 > 컴포넌트가 언마운트 되거나 useEffect가 재실행되기 전
    // 이벤트 리스너 중복 호출 방지
    return () => data.subscription.unsubscribe()
  }, [])

  const router = useRouter()

  const handleOnLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert(error.message)
    } else {
      alert('로그아웃 성공!')
      router.push('/signin')
    }
  }

  return (
    <nav className="flex">
      <Link href="/" className="p-2 rounded hover:bg-gray-200">
        메인
      </Link>
      <Link href="/posts" className="p-2 rounded hover:bg-gray-200">
        글목록
      </Link>

      {user ? (
        <>
          <div className="p-2 rounded">{user.email}님 반갑습니다</div>
          <button
            onClick={handleOnLogout}
            className="p-2 rounded hover:bg-gray-200"
          >
            로그아웃
          </button>
        </>
      ) : (
        <>
          <Link href="/signup" className="p-2 rounded hover:bg-gray-200">
            회원가입
          </Link>
          <Link href="/signin" className="p-2 rounded hover:bg-gray-200">
            로그인
          </Link>
        </>
      )}
    </nav>
  )
}
