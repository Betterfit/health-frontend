import React , {useState} from 'react'

import Input_Field from '../Components/Forms/Input_Field';
import Button from '../Components/Button'
import Logo from '../Components/Logo'

const Login = () => {
    // usestate to save user and pass
    const [{user,pass} , setAuthData] = useState({
        user:'',
        pass:'',
    });
    return(
    <div class="min-h-screen bg-gray-700 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
            <div class="bg-white px-20 shadow rounded-sm">
                <Logo></Logo>
                <form class = "pb-24" action="#" method="POST">
                    <div>
                        <Input_Field id_tag="email" name="Email"></Input_Field>
                    </div>
                    <div class="mt-3">
                        <Input_Field id_tag="password" name="Password" type="password"></Input_Field>
                    </div>
                    <div class="mt-6">
                        <Button text="Login"></Button>
                    </div>

                    <div class="mt-6 flex justify-center">
                        <div class="text-base leading-5">
                        <a href="#" class="font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:underline transition ease-in-out duration-150">
                        Forgot password?
                        </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    )
}

export default Login