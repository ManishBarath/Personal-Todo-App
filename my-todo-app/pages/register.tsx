"use client";

import { REGISTER_MUTATION } from "@/src/graphql/queries";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from '../src/styles/login.module.css'
import Link from "next/link";

export default function Register(){
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    const [register,{error}] = useMutation(REGISTER_MUTATION);
    const router = useRouter();

    const handleRegister = async (e:any) => {
        e.preventDefault();
        try {
            const { data } = await register({ variables: { email, password: pass } });
            localStorage.setItem('authToken', data.register);
            router.push('/Home');
        } catch (err) {
            console.error('Registration failed:', err);
        }
    };
    
    return (
        <div className={styles.container}>
        <div className={styles.paper}>
          <div className={styles.title}>Register</div>
          <form onSubmit={handleRegister}>
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
              Register
            </button>
            <div className={styles.noaccount} > <p>Already have an account? <Link href="/login">Login</Link></p></div>
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

