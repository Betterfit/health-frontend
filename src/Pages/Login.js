import React , {useState} from 'react'
import logo from 'Images/logo.png'
import Input_Field from 'Components/Forms/Input_Field';


const Login = () => {
    // usestate to save user and pass
    const [{user,pass} , setAuthData] = useState({
        user:'',
        pass:'',
    });
    // PLAIN HTML WILL WORK , HOWEVER IN REACT WE WANT TO WRITING AND USING REUSABLE COMPONENTS! :D 
    // WHENEVER YOU SEE SOMETHING AND THINK , HEY I COULD RE USE THIS IN SOME WAY , WRITE A COMPONENT , SOMETIMES YOU DON'T NEED TO BE WRITING 10000000 COMPONENTS SO KEEP THAT IN MIND AS WELL
    // WE ARE USING TAILWIND REACT UI IN THIS PROJECT , WHICH HAS TAILWIND REACT COMPONENTS THAT USE TAILWIND THAT ARE ALREADY MADE FOR US :D HERE IS THE LINK https://emortlock.github.io/tailwind-react-ui/#documentation
    
    return(
    <div class="min-h-screen bg-gray-700 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
            <div class="bg-white px-20 shadow rounded-sm">
                <div class="sm:mx-auto sm:w-full sm:max-w-md pt-20 pb-10">
                    <img class="mx-auto h-20 w-auto" src={logo} alt="Bettefit Logo"/> 
                </div>
            <form class = "pb-24" action="#" method="POST">
                <div>
                    <Input_Field id_tag="email" name="Email"></Input_Field>
                </div>

                <div class="mt-3">
                    <Input_Field id_tag="password" name="Password" type="password"></Input_Field>
                </div>
                <div class="mt-6">
                <span class="block w-full shadow-sm">
                    <button type="submit" class="w-full flex justify-center py-4 border border-transparent text-lg font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out uppercase">
                    Login
                    </button>
                </span>
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