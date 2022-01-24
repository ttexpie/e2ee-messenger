import '../App.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../App';

function LoginForm() {
    const emailLogin = async (e, p) => {
        await signInWithEmailAndPassword(auth, e, p);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <form>
                <input className='loginInfo'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email' />
            </form>
            <form>
                <input className='loginInfo'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password' />
            </form>
            <button className='loginButton'
                onClick={() => emailLogin(email, password)}
                disabled={!email || !password}>
                Login
            </button>
        </>
    );
}

export default LoginForm;