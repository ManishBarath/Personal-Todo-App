"use client";

import { LOGIN_MUTATION } from "@/src/graphql/queries";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from '../src/styles/login.module.css'
import Link from "next/link";
export default function Login(){
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    const [login ,{ error }] = useMutation(LOGIN_MUTATION);
    const router = useRouter();


    const handleLogin = async (e:any) => {
      e.preventDefault();
        try {
          console.log("hello....");
            const { data } = await login({ variables: { email, password: pass } });
            localStorage.setItem('authToken', data.login);
            router.push('/Home');
            console.log("logged in successfully")
        } catch (err) {
            console.log("Login failed....");
        }
    }

    return (
      <div className={styles.container}>
      <div className={styles.paper}>
        <div className={styles.title}>Login</div>
        <form onSubmit={handleLogin}>
          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
          <div className={styles.noaccount} > <p>Don't have an account? <Link href="/register">Sign up</Link></p></div>
        </form>

        {error && (
          <div className={styles.alert}>
            {error.message}
          </div>
        )}
      </div>
    </div>
    )
} 