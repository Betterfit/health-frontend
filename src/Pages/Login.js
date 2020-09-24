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
<<<<<<< HEAD

    // PLAIN HTML WILL WORK , HOWEVER IN REACT WE WANT TO WRITING AND USING REUSABLE COMPONENTS! :D 
    // WHENEVER YOU SEE SOMETHING AND THINK , HEY I COULD RE USE THIS IN SOME WAY , WRITE A COMPONENT , SOMETIMES YOU DON'T NEED TO BE WRITING 10000000 COMPONENTS SO KEEP THAT IN MIND AS WELL
    // WE ARE USING TAILWIND REACT UI IN THIS PROJECT , WHICH HAS TAILWIND REACT COMPONENTS THAT USE TAILWIND THAT ARE ALREADY MADE FOR US :D HERE IS THE LINK https://emortlock.github.io/tailwind-react-ui/#documentation
=======
>>>>>>> login-page-styling
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