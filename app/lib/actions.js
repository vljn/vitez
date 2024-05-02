'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const RegisterFormSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Корисничко име је обавезно' })
      .min(6, { message: 'Корисничко име мора имати најмање шест карактера' })
      .regex(
        /^[a-zA-Z]+[a-zA-Z0-9_.]*$/,
        'Корисничко име мора почети словом и сме садржати само слова, цифре, тачке и доње црте'
      )
      .max(20, { message: 'Корисничко име може имати максимално 20 карактера' })
      .trim(),
    email: z
      .string()
      .min(1, { message: 'Мејл адреса је обавезна' })
      .email({ message: 'Унета мејл адреса није валидна' }),
    password: z
      .string()
      .min(1, { message: 'Лозинка је обавезна' })
      .min(8, { message: 'Лозинка мора имати најмање осам карактера' })
      .regex(/[a-zA-Z]/, 'Лозинка мора садржати барем једно слово')
      .regex(/[0-9]/, 'Лозинка мора садржати барем једну цифру')
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => !(data.password.length > 0 && data.confirmPassword.length === 0), {
    message: 'Обавезно је потврдити лозинку',
    path: ['confirmPassword'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Лозинке се не подударају',
    path: ['confirmPassword'],
  })
  .refine(
    async (data) => {
      const res = await sql`SELECT * FROM korisnici WHERE korisnicko_ime = ${data.username};`;
      return res.rowCount === 0;
    },
    {
      message: 'Корисник са унетим корисничким именом већ постоји',
      path: ['username'],
    }
  )
  .refine(
    async (data) => {
      const res = await sql`SELECT * FROM korisnici WHERE mejl = ${data.email};`;
      return res.rowCount === 0;
    },
    {
      message: 'Корисник са унетом мејл адресом већ постоји',
      path: ['email'],
    }
  );

export async function register(state, formData) {
  const validatedFields = await RegisterFormSchema.safeParseAsync({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await sql`
    INSERT INTO korisnici (korisnicko_ime, mejl, sifra)
    VALUES (${username}, ${email}, ${hashedPassword})`;
  } catch (error) {
    return {
      message: 'Грешка у бази података',
    };
  }

  redirect('/login');
}

const LoginFormSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(8),
});

export async function login(state, formData) {
  const validatedFields = await LoginFormSchema.safeParseAsync({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  console.log(validatedFields.error);

  if (!validatedFields.success) {
    return {
      error: 'Унети подаци нису валидни',
    };
  }

  const { username, password } = validatedFields.data;

  try {
    const res = await signIn('credentials', { username, password });
    console.log(res);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Погрешно корисничко име или шифра' };
        default:
          return { error: 'Нешто је пошло по злу' };
      }
    }
    throw error;
  }
}
