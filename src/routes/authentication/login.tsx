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
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/authentication/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const [authCredentials, setAuthCredentials] = useState({
    email: '',
    password: '',
  });
  const { mutate, isError, error } = useAuthMutation().loginMutation;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAuthCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(authCredentials);
  };
  useEffect(() => {
    if (isError) {
      console.log(error);
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
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                  onChange={handleInputChange}
                  value={authCredentials.email}
                  name='email'
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  required
                  onChange={handleInputChange}
                  value={authCredentials.password}
                  name='password'
                />
              </div>
              <Button type='submit' className='w-full '>
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
