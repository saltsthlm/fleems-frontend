import { createFileRoute } from '@tanstack/react-router'
import TripLogs from '../components/TripLogs'

export const Route = createFileRoute('/logs')({
  component: () => <div><TripLogs /></div>
})