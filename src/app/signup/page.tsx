export default function SignUp() {
  return (
    <form>
      <input type="eamil" name="email" placeholder="이메일을 입력하세요" />
      <input
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요"
      />
      <button>회원가입</button>
    </form>
  )
}
