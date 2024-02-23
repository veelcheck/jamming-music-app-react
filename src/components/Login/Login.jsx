import './Login.css';

function Login ({ onClick }) {
  return (
    <div className='container'>
      <button 
        aria-label='Login with Spotify' 
        onClick={onClick}>
          Login with Spotify
      </button>
    </div>
  )
}

export default Login;