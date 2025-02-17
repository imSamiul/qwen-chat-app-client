import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuthMutation } from '@/services/mutations/auth-mutation';
import { Label } from '@radix-ui/react-label';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/authentication/register')({
  component: RouteComponent,
});

function RouteComponent() {
  const [authCredentials, setAuthCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { signupMutation } = useAuthMutation();
  const { mutate, isSuccess } = signupMutation;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAuthCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate(authCredentials, {
      onSuccess: () => {
        console.log('success');
      },
    });
  };
  if (isSuccess) {
    return <div>Success</div>;
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign Up</CardTitle>
          <CardDescription>
            Enter your email below to Sign Up to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='userName'>Username</Label>
                <Input
                  type='text'
                  placeholder='abc'
                  required
                  onChange={handleInputChange}
                  value={authCredentials.username}
                  name='username'
                  autoComplete='username'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  type='email'
                  placeholder='m@example.com'
                  required
                  onChange={handleInputChange}
                  value={authCredentials.email}
                  name='email'
                  autoComplete='email'
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input
                  type='password'
                  required
                  onChange={handleInputChange}
                  value={authCredentials.password}
                  name='password'
                  autoComplete='new-password'
                />
              </div>
              <Button type='submit' className='w-full '>
                Sign Up
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link
                to='/authentication/login'
                className='underline underline-offset-4'
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
