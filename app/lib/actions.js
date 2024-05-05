'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

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

  if (!validatedFields.success) {
    return {
      error: 'Унети подаци нису валидни',
    };
  }

  const { username, password } = validatedFields.data;

  try {
    await signIn('credentials', { username, password });
    console.log(a);
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

const UpdateFormSchema = z
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
    id: z.string().min(1, { message: 'Освежите страницу, па покушајте поново' }),
  })
  .refine(
    async (data) => {
      const res =
        await sql`SELECT * FROM korisnici WHERE korisnicko_ime = ${data.username} AND NOT id = ${data.id};`;
      return res.rowCount === 0;
    },
    {
      message: 'Корисник са унетим корисничким именом већ постоји',
      path: ['username'],
    }
  )
  .refine(
    async (data) => {
      const res =
        await sql`SELECT * FROM korisnici WHERE mejl = ${data.email} AND NOT id = ${data.id};`;
      return res.rowCount === 0;
    },
    {
      message: 'Корисник са унетом мејл адресом већ постоји',
      path: ['email'],
    }
  )
  .refine(
    async (data) => {
      const session = await auth();
      return session?.user.id === data.id;
    },
    {
      message: 'Освежите страницу, па покушајте поново',
      path: ['id'],
    }
  );

export async function update(state, formData) {
  const validatedFields = await UpdateFormSchema.safeParseAsync({
    username: formData.get('username'),
    email: formData.get('email'),
    id: formData.get('id'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, email, id } = validatedFields.data;

  try {
    await sql`UPDATE korisnici SET korisnicko_ime = ${username}, mejl = ${email} WHERE id = ${id}`;
    revalidatePath('/profile');
    return {
      messageSuccess: 'Успешно ажуриран профил',
    };
  } catch (error) {
    return {
      message: 'Грешка у бази података',
    };
  }
}

const UpdatePasswordSchema = z
  .object({
    password: z.string().min(1, { message: 'Тренутна лозинка је обавезна' }).trim(),
    newPassword: z
      .string()
      .min(8, { message: 'Нова лозинка мора имати најмање осам карактера' })
      .regex(/[a-zA-Z]/, 'Нова лозинка мора садржати барем једно слово')
      .regex(/[0-9]/, 'Нова лозинка мора садржати барем једну цифру')
      .trim(),
    id: z.string().min(1, { message: 'Освежите страницу, па покушајте поново' }),
  })
  .refine((data) => data.password !== data.confirmPassword, {
    message: 'Нова лозинка не сме бити као стара',
    path: ['newPassword'],
  })
  .refine(
    async (data) => {
      const session = await auth();
      return session?.user.id === data.id;
    },
    {
      message: 'Освежите страницу, па покушајте поново',
      path: ['id'],
    }
  )
  .refine(
    async (data) => {
      const res = await sql`SELECT * FROM korisnici WHERE id = ${data.id}`;
      return bcrypt.compare(data.password, res.rows[0].sifra);
    },
    { message: 'Унета лозинка се не подудара са тренутном', path: ['password'] }
  );

export async function updatePassword(state, formData) {
  const validatedFields = await UpdatePasswordSchema.safeParseAsync({
    password: formData.get('password'),
    newPassword: formData.get('newPassword'),
    id: formData.get('id'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { newPassword, id } = validatedFields.data;
  const newPasswordHashed = await bcrypt.hash(newPassword, 10);

  try {
    await sql`UPDATE korisnici SET sifra = ${newPasswordHashed} WHERE id = ${id}`;
    return {
      messageSuccess: 'Успешно промењена лозинка',
    };
  } catch (error) {
    return {
      message: 'Грешка у бази података',
    };
  }
}
