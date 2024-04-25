import axios from "axios";
import Input from "@/components/input";
import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
// import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
const auth = () => {
    // const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [variant, setvariant] = useState("login");
    const togglevariant = useCallback(
        () => {
            setvariant((current) => current == "login" ? "register" : "login")
        },
        [],
    );
    
    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            })

        } catch (error) {
            console.log(error)
        }
    }, [email, name, password]);

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                callbackUrl: '/profiles'
            })
            // router.push('/')
        } catch (error) {
            console.log(error)
        }
    }, [email, password]);

    return (
        <div className="w-full h-full relative bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-fixed bg-center">
            <div className="bg-black h-full w-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="images/logo.png" alt="" className="h-9" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 self-center mt-2 px-16 py-16 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === "login" ? "Sign In" : "Register"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                                <Input
                                    id="name"
                                    type="text"
                                    label="Username"
                                    value={name}
                                    onChange={(e: any) => setName(e.target.value)}
                                />
                            )}
                            <Input
                                id="email"
                                type="email"
                                label="Email address or phone number"
                                value={email}
                                onChange={(e: any) => setEmail(e.target.value)}
                            />
                            <Input
                                type="password"
                                id="password"
                                label="Password"
                                value={password}
                                onChange={(e: any) => setPassword(e.target.value)}
                            />
                        </div>
                        <button onClick={variant === "login" ? login : register} className="py-3 bg-red text-white w-full mt-10 bg-red-600 hover:bg-red-700 rounded-md transition">
                            {variant === "login" ? "Login" : "Sign up"}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div onClick={()=>signIn('google', {callbackUrl:'/profiles'})} className="
                            w-10
                            h-10
                            bg-white
                            flex
                            justify-center
                            rounded-full
                            items-center
                            cursor-pointer
                            hover:opacity-80
                            transition
                            ">
                                <FcGoogle size={30}/>
                            </div>
                            <div onClick={()=>signIn('github', {callbackUrl:'/profiles'})} className="
                            w-10
                            h-10
                            bg-white
                            flex
                            justify-center
                            rounded-full
                            items-center
                            cursor-pointer
                            hover:opacity-80
                            transition
                            ">
                                <FaGithub size={30}/>
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant === "login" ? "First time using Netflix?" : "Already have an account?"}
                            <span onClick={togglevariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === "login" ? "Create an account" : "Login"}
                            </span>

                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default auth

// import axios from "axios";
// import Input from "@/components/input";
// import { useState, useCallback } from "react";
// const auth = () => {
//     const [email, setemail] = useState("");
//     const [name, setname] = useState("");
//     const [password, setpassword] = useState("");
//     const [variant, setvariant] = useState("login");
//     const togglevariant = useCallback(
//         () => {
//             setvariant((current) => current == "login" ? "register" : "login")
//         },
//         [],
//     );
//     const register = useCallback(async () => {
//            try {
//              await axios.post('/api/register', {
//                 email,
//                 name,
//                 password
//              })
//            } catch (error) {
//             console.log(error)
//            }
//         },[email, name, password]);

//     return (
//         <div className="w-full h-full relative bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-fixed bg-center">
//             <div className="bg-black h-full w-full lg:bg-opacity-50">
//                 <nav className="px-12 py-5">
//                     <img src="images/logo.png" alt="" className="h-9" />
//                 </nav>
//                 <div className="flex justify-center">
//                     <div className="bg-black bg-opacity-70 self-center mt-2 px-16 py-16 lg:w-2/5 lg:max-w-md rounded-md w-full">
//                         <h2 className="text-white text-4xl mb-8 font-semibold">
//                             {variant == "login" ? "Sign In" : "Register"}
//                         </h2>
//                         <div className="flex flex-col gap-4">
//                             {variant == "register" && (
//                                 <Input id="name" type="text" label="Username" onChange={(ev: any) => setname(ev.target.value)} value={name} />
//                             )}
//                             <Input id="email" type="email" label="Email"  onChange={(ev: any) => setemail(ev.target.value)} value={email} />

//                             <Input id="password" label="Password" type="password" onChange={(ev: any) => setpassword(ev.target.value)} value={password} />
//                         </div>
//                         <button onClick={register} className="py-3 bg-red text-white w-full mt-10 bg-red-600 hover:bg-red-700 rounded-md transition">
//                             {variant == "login" ? "Login" : "Sign up"}
//                         </button>
//                         <p className="text-neutral-500 mt-12">
//                             {variant == "login" ? "First time using Netflix?" : "Already have an account?"}
//                             <span onClick={togglevariant} className="text-white ml-1 hover:underline cursor-pointer">
//                                 {variant == "login" ? "Create an account" : "Login"}
//                             </span>

//                         </p>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// }

// export default auth