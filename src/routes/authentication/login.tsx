import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useAuthMutation } from '@/services/mutations/auth-mutation';
import { loginSchema, LoginSchema } from '@/types/auth.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const Route = createFileRoute('/authentication/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isError, error } = useAuthMutation().loginMutation;

  const onSubmit: SubmitHandler<LoginSchema> = (data: LoginSchema) => {
    mutate(data);
    reset();
  };

  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error?.message,
      });
    }
  }, [isError, error]);

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  type='email'
                  required
                  placeholder='m@example.com'
                  {...register('email', {
                    required: 'Email is required',
                    validate: {
                      email: (value) =>
                        value.includes('@') || 'Email must include @',
                    },
                  })}
                />
                {errors.email?.message && (
                  <p className='text-red-500 text-sm'>
                    {errors.email.message as string}
                  </p>
                )}
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input
                  type='password'
                  required
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                  })}
                  placeholder='Password'
                />
                {errors.password?.message && (
                  <p className='text-red-500 text-sm'>
                    {errors.password.message as string}
                  </p>
                )}
              </div>
              <Button type='submit' className='w-full ' disabled={isSubmitting}>
                Login
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link
                to='/authentication/register'
                className='underline underline-offset-4'
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
