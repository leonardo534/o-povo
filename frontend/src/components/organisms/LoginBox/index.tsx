'use client'

import { Input } from "@/components/atoms/Input"
import { Text } from "@/components/atoms/Text"
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import routes from "@/configs/routes";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "@/repositories/api";
import { useRouter } from "next/navigation";

type Inputs = {
    email: string
    password: string
}

export const LoginBox = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await auth(data.email, data.password);
        router.push('/');
    }

    return (
        <div className="relative z-10 overflow-hidden pb-16 pt-6 md:pb-20 lg:pb-28">
            <div className="mx-auto max-w-[500px] rounded-sm bg-white px-6 py-10 shadow-3xl dark:bg-dark sm:p-[60px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Text as='h2' className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">Entre na sua conta</Text>
                        <Text as='p' className="mb-11 text-center text-base text-body-color dark:text-body-color-dark">Faça login na sua conta e gerencie suas postagens.</Text>
                    </div>
                    <div>
                        <Input {...register("email", { required: true })}
                            className={`${errors.email && '!mb-2'}`}
                            placeholder="jonh.doe@mail.com"
                            type="email"
                            label="Seu email"
                            name="email" />
                        {errors.email && <Text className="font-bold text-red-500 mb-8">Insira um email</Text>}

                        <Input {...register("password", { required: true })}
                            className={`${errors.password && '!mb-2'}`}
                            type="password"
                            placeholder="********"
                            label="Sua senha"
                            name="password" />
                        {errors.password && <Text className="font-bold text-red-500 mb-8">Insira uma senha</Text>}

                    </div>
                    <Button className={`${(!errors.email && !errors.password) && 'disabled:cursor-not-allowed'} w-full mb-6`} type="submit">Entrar</Button>
                </form>
                <Text as="p" className="mb-2 text-center text-base text-body-color dark:text-body-color-dark">Você não tem uma conta? <Link href={routes.AUTH.REGISTER} className="text-primary">Cadastre-se já!</Link></Text>
            </div>
        </div>

    )
}
