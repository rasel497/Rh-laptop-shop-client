import { GoogleAuthProvider } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';


const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const { signInLogIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const googleProvider = new GoogleAuthProvider();


    // email/password Login
    const handleLogin = data => {
        console.log(data);
        signInLogIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });

            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message)
            });
    }

    // handle with google sign in method
    const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Successfully login')
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-3xl font-bold text-center'>Login</h2>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text-alt">Email</span></label>
                        <input type="text"
                            {...register("email",
                                { required: "Email address is required" })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text-alt">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be 6 characters or long!" }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
                        <label className="label"><span className="label-text-alt">Forget Password?</span></label>
                    </div>
                    <div>
                        {
                            loginError && <p className='text-red-600'>{loginError}</p>
                        }
                    </div>
                    <input className='btn btn-active btn-primary w-full' type="submit" value="Login" />
                </form>
                <div>

                </div>
                <p>Are you new to RH-Laptop? <Link to="/signup" className='text-secondary'>Create a account.</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;