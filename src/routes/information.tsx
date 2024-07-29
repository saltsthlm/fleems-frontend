import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/information')({
  component: () => <div>Hello /information!</div>
})