"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Ban, CheckCircle2, Filter, ShieldCheck, Hourglass } from "lucide-react"
import AnalyticsDashboard from "@/components/analytics-dashboard"
import Header from "@/components/header"
import * as React from 'react';
import type { Role, User as UserType } from '@/lib/types';
import Link from "next/link"


const mockUsers = [
  { id: 'usr_1', phone: '9876543210', kycStatus: 'verified', bookings: 5, totalSpent: 12500 },
  { id: 'usr_2', phone: '8765432109', kycStatus: 'pending', bookings: 1, totalSpent: 800 },
  { id: 'usr_3', phone: '7654321098', kycStatus: 'rejected', bookings: 0, totalSpent: 0 },
  { id: 'usr_4', phone: '6543210987', kycStatus: 'verified', bookings: 12, totalSpent: 45000 },
]

const mockBookings = [
    {id: 'bk_1', service: 'Modern Web App Development', user: '9876543210', provider: 'Pixel Perfect Inc.', amount: 2500, status: 'completed', payment: 'cleared'},
    {id: 'bk_2', service: 'SEO & Digital Marketing', user: '8765432109', provider: 'Growth Hackers', amount: 800, status: 'in progress', payment: 'in escrow'},
    {id: 'bk_3', service: 'Cloud Infrastructure Setup', user: '6543210987', provider: 'InfraCloud Solutions', amount: 3000, status: 'cancelled', payment: 'refunded'},
    {id: 'bk_4', service: 'Mobile App Design', user: '9876543210', provider: 'Creative Minds', amount: 1200, status: 'requested', payment: 'pending'},
]


export default function AdminPage() {
  const [role, setRole] = React.useState<Role>('buyer');
  const [user, setUser] = React.useState<UserType | null>(null);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/20">
       <Header
        role={role}
        setRole={setRole}
        user={user}
        onLoginClick={() => {}}
        onLogoutClick={() => {}}
      />
      <main className="flex flex-1 flex-col gap-8 p-4 md:gap-8 md:p-10">
        <div className="flex items-center">
            <ShieldCheck className="h-10 w-10 mr-4 text-primary"/>
            <div>
                <h1 className="font-headline text-4xl">Admin Dashboard</h1>
                <p className="text-muted-foreground font-body text-lg">Oversee all platform activity.</p>
            </div>
        </div>

        <AnalyticsDashboard />

        <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-card/60 backdrop-blur-xl shadow-lg border-border/20 rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-headline text-2xl">User Management</CardTitle>
                     <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User ID</TableHead>
                                <TableHead>KYC Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockUsers.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium font-body">{user.phone}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.kycStatus === 'verified' ? 'default' : user.kycStatus === 'pending' ? 'secondary' : 'destructive'} className="capitalize">
                                             {user.kycStatus === 'verified' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                                             {user.kycStatus === 'pending' && <Hourglass className="mr-1 h-3 w-3" />}
                                             {user.kycStatus === 'rejected' && <Ban className="mr-1 h-3 w-3" />}
                                            {user.kycStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon"><CheckCircle2 className="h-4 w-4 text-green-500" /></Button>
                                        <Button variant="ghost" size="icon"><Ban className="h-4 w-4 text-red-500" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-xl shadow-lg border-border/20 rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-headline text-2xl">Booking & Payment Overview</CardTitle>
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Payment</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockBookings.map(booking => (
                                <TableRow key={booking.id}>
                                    <TableCell className="font-medium font-body">{booking.service}</TableCell>
                                    <TableCell><Badge variant="outline" className="capitalize">{booking.status}</Badge></TableCell>
                                    <TableCell><Badge variant="secondary" className="capitalize">{booking.payment}</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  )
}
