import { cn } from '@/lib/utils'
import { DashboardSidebarGenericProps } from './sidebar'

export type DashboardPageGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

export function DashboardPage({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <section className={cn(['h-screen', className])}>{children}</section>
}

export function DashboardPageHeader({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return (
    <header
      className={cn([
        'px-6 py-3 border-b border-border flex items-center justify-between',
        className,
      ])}
    >
      {children}
    </header>
  )
}

export function DashboardPageHeaderTitle({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return (
    <span
      className={cn(['text-md text-muted-foreground uppercase', className])}
    >
      {children}
    </span>
  )
}

export function DashboardPageHeaderNav({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <nav className={cn(['', className])}>{children}</nav>
}

export function DashboardPageMain({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <main className={cn(['p-6', className])}>{children}</main>
}
