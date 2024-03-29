'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'

export function AuthForm() {
  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn('nodemailer', { email: data.email, redirect: false })

      toast({
        title: 'Magic Link Sent',
        description: 'Check your email for the magic link to login',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error ocurred. Please try again.',
      })
    }
  })

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-sm text-neutral-muted">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="w-full max-w-sm space-y-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              {...form.register('email')}
            />
          </div>
          <Button
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Sending...' : 'Send magic link'}
          </Button>
          <Button className="w-full" variant="outline">
            Login with Google
          </Button>
        </form>
      </div>
    </div>
  )
}
