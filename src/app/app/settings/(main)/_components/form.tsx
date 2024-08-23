'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { updateProfile } from '../actions'
import { updateProfileSchema } from '../schema'
import { toast } from '@/components/ui/use-toast'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { SheetFooter } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Session } from 'next-auth'

type ProfileFormProps = {
  defaultValues: Session['user']
}

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      email: defaultValues?.email ?? '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await updateProfile(data)
    router.refresh()

    console.log(data)

    toast({
      title: 'Success!',
      description: 'Your profile has been updated successfully.',
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8 h-screen">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormDescription>
                This will be the publicity displayed name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" readOnly {...field} />
              </FormControl>
              <FormDescription>
                Please contact email contact@micro-saas.com to change the email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SheetFooter className="mt-auto">
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </form>
    </Form>
  )
}
