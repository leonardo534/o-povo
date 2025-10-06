'use client'
import { useState } from "react";
import { Input } from "@/components/atoms/Input"
import { Text } from "@/components/atoms/Text"
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import routes from "@/configs/routes";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    name: string
    email: string
    password: string
}

export const RegisterBox = () => {
    const [name, setName] = useState(String);
    const [email, setEmail] = useState(String);
    const [password, setPassword] = useState(String);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <div className="relative z-10 overflow-hidden pb-16 pt-6 md:pb-20 lg:pb-28">
            <div className="mx-auto max-w-[500px] rounded-sm bg-white px-6 py-10 shadow-3xl dark:bg-dark sm:p-[60px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Text as='h2' className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">Crie sua conta</Text>
                        <Text as='p' className="mb-11 text-center text-base text-body-color dark:text-body-color-dark">É totalmente gratuito e super fácil</Text>
                    </div>
                    <div>
                        <Input className={`${errors.name && '!mb-2'}`} {...register("name", { required: true })} onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Jonh Doe" label="Seu nome completo" />
                        {errors.name && <Text className="font-bold text-red-500 mb-8">Insira um nome</Text>}

                        <Input className={`${errors.email && '!mb-2'}`} {...register("email", { required: true })} onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="jonh.doe@mail.com" label="Seu email" />
                        {errors.email && <Text className="font-bold text-red-500 mb-8">Insira um email</Text>}

                        <Input className={`${errors.password && '!mb-2'}`} {...register("password", { required: true })} onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="********" label="Sua senha" />
                        {errors.password && <Text className="font-bold text-red-500 mb-8">Insira um senha</Text>}

                    </div>
                    <Button className="w-full mb-6" type="submit">Cadastrar</Button>
                </form>
                <Text as="p" className="mb-2 text-center text-base text-body-color dark:text-body-color-dark">Já possui uma conta? <Link href={routes.AUTH.LOGIN} className="text-primary">Entre já!</Link></Text>
            </div>
        </div>

    )
}
