"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useRouter } from "next/navigation";

// Zod schema
const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type Credential = z.infer<typeof signInSchema>;

const Login = () => {
  const [error, setError] = useState<string>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Credential>({
    resolver: zodResolver(signInSchema),
  });
  const onSubmit = async (loginCredential: Credential) => {
    setError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(loginCredential),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setError(`Login success: ${data.message || "Welcome admin"}`);
        router.push("/addproduct");
        reset();
      } else {
        setError(`Login failed: ${data.error || "Invalid credentials"}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
      <form
        className="w-80 flex flex-col shadow-sm justify-center items-center gap-4 p-4 bg-white border border-gray-200 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold">ADMIN LOGIN</h1>
        <p className="text-center text-xs">
          Login to Add Product, Delete Product and all other mutations
        </p>
        <Input
          placeholder="Enter Email"
          {...register("username")}
          error={errors.username?.message}
        />
        <Input
          placeholder="Enter Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        {error && (
          <h1 className="text-red-500 border p-2 border-gray-200 rounded-xl">
            {error}
          </h1>
        )}
        <Button type="submit" name="LOGIN" />
      </form>
    </div>
  );
};

export default Login;
