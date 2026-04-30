import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Calendar, Star, ShoppingBag, Save, Camera, Check, Trophy, Gamepad2 } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Statistic } from 'antd'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as ReTooltip, Legend } from 'recharts'
import PageHeader from '@/components/PageHeader'
import { useApp } from '@/context/AppContext'
import MembershipCard from '@/components/MembershipCard'
import { membershipTiers } from '@/data/memberships'

const mockBookings = [
  { id: '1', date: 'June 15, 2026', time: '7:00PM', station: 'PC-12', type: 'Gaming Session', status: 'Upcoming' as const },
  { id: '2', date: 'May 28, 2026', time: '5:00PM', station: 'Console-A', type: 'Coaching', status: 'Completed' as const },
  { id: '3', date: 'May 10, 2026', time: '3:00PM', station: 'PC-05', type: 'Gaming Session', status: 'Cancelled' as const },
]

const gamesPlayedData = [
  { name: 'FPS', value: 45 },
  { name: 'Battle Royale', value: 25 },
  { name: 'Sports', value: 15 },
  { name: 'Racing', value: 10 },
  { name: 'Other', value: 5 },
]

const PIE_COLORS = ['#2563EB', '#06B6D4', '#A855F7', '#F59E0B', '#64748B']

const achievements = [
  { name: 'First Blood', description: 'Win your first tournament', unlocked: true },
  { name: 'Night Owl', description: 'Game past midnight 10 times', unlocked: true },
  { name: 'Social Gamer', description: 'Attend 5 community events', unlocked: false, progress: 3, total: 5 },
  { name: 'Coachable', description: 'Complete 3 coaching sessions', unlocked: true },
  { name: 'Big Spender', description: 'Spend $100 at the shop', unlocked: false, progress: 68, total: 100 },
]

export default function Account() {
  const { user, logout } = useApp()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const statusBadge = (status: string) => {
    if (status === 'Upcoming') return 'bg-ded-accent-blue text-white'
    if (status === 'Completed') return 'bg-ded-surface-light text-ded-text-muted'
    return 'bg-red-500/20 text-red-400'
  }

  return (
    <div>
      <PageHeader title="My Account" subtitle="Manage your profile, bookings, and membership." />

      <section className="section-padding">
        <div className="container-main">
          {/* Dashboard Stats - MUI Cards + AntD Statistic */}
          <ScrollReveal stagger={0.1} childSelector=".stat-card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { title: 'Hours Played', value: 142, suffix: 'h', icon: Gamepad2 },
                { title: 'Sessions Booked', value: 28, suffix: '', icon: Calendar },
                { title: 'Tournaments', value: 5, suffix: '', icon: Trophy },
                { title: 'Achievements', value: 12, suffix: '', icon: Star },
              ].map((stat, i) => (
                <div key={i} className="stat-card">
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #0B1221 0%, #111D35 100%)',
                      border: '1px solid rgba(30, 58, 138, 0.3)',
                      borderRadius: '12px',
                    }}
                  >
                    <CardContent className="p-5">
                      <stat.icon className="w-5 h-5 text-ded-accent-cyan mb-3" />
                      <Statistic
                        title={<span className="text-ded-text-muted text-xs">{stat.title}</span>}
                        value={stat.value}
                        suffix={stat.suffix}
                        valueStyle={{
                          color: '#FFFFFF',
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontSize: '1.75rem',
                          fontWeight: 700,
                        }}
                      />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="bg-ded-surface border border-ded-border w-full md:w-auto flex flex-wrap justify-start mb-6">
              <TabsTrigger value="profile" className="data-[state=active]:bg-ded-accent-blue data-[state=active]:text-white text-ded-text-secondary gap-2">
                <User className="w-4 h-4" /> Profile
              </TabsTrigger>
              <TabsTrigger value="bookings" className="data-[state=active]:bg-ded-accent-blue data-[state=active]:text-white text-ded-text-secondary gap-2">
                <Calendar className="w-4 h-4" /> Bookings
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-ded-accent-blue data-[state=active]:text-white text-ded-text-secondary gap-2">
                <Trophy className="w-4 h-4" /> Achievements
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-ded-accent-blue data-[state=active]:text-white text-ded-text-secondary gap-2">
                <Star className="w-4 h-4" /> Settings
              </TabsTrigger>
            </TabsList>

            {/* Profile */}
            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                <div className="bg-ded-surface rounded-xl border border-ded-border p-6 md:p-8">
                  <h2 className="font-display text-xl font-semibold text-white mb-6">Profile</h2>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <Avatar className="w-20 h-20 border-2 border-ded-accent-blue">
                        <AvatarImage src="" alt={user?.name || 'User'} />
                        <AvatarFallback className="bg-gradient-to-br from-ded-accent-blue to-ded-accent-cyan text-white font-display font-bold text-2xl">
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 w-7 h-7 bg-ded-surface border border-ded-border rounded-full flex items-center justify-center text-ded-text-muted hover:text-white">
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div>
                      <p className="text-white font-medium">{user?.name || 'Guest User'}</p>
                      <p className="text-sm text-ded-text-muted">{user?.email || 'guest@example.com'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" defaultValue={user?.name?.split(' ')[0] || ''} placeholder="First Name" className="bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none" />
                    <input type="text" defaultValue={user?.name?.split(' ')[1] || ''} placeholder="Last Name" className="bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none" />
                    <input type="email" defaultValue={user?.email || ''} placeholder="Email" className="md:col-span-2 bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none" />
                    <input type="tel" placeholder="Phone" className="bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none" />
                    <input type="text" defaultValue={user?.gamerTag || ''} placeholder="Gamer Tag" className="bg-ded-bg border border-ded-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ded-text-muted focus:border-ded-accent-blue focus:outline-none" />
                  </div>
                  <div className="flex items-center gap-4 mt-6">
                    <button
                      onClick={handleSave}
                      className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        saved
                          ? 'bg-ded-accent-cyan text-white'
                          : 'bg-ded-accent-blue text-white hover:bg-[#3B82F6]'
                      }`}
                    >
                      {saved ? (
                        <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Saved</span>
                      ) : (
                        <span className="flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</span>
                      )}
                    </button>
                    <button className="text-sm text-ded-accent-blue hover:underline">Change Password</button>
                  </div>
                </div>

                {/* Games Played Pie Chart */}
                <div className="bg-ded-surface rounded-xl border border-ded-border p-6 md:p-8">
                  <h2 className="font-display text-lg font-semibold text-white mb-4">Games Played</h2>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={gamesPlayedData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                      >
                        {gamesPlayedData.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <ReTooltip
                        contentStyle={{
                          backgroundColor: '#0B1221',
                          border: '1px solid rgba(30, 58, 138, 0.3)',
                          borderRadius: '8px',
                          color: '#FFFFFF',
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        wrapperStyle={{ color: '#CBD5E1', fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            {/* Bookings */}
            <TabsContent value="bookings">
              <div className="bg-ded-surface rounded-xl border border-ded-border p-6 md:p-8">
                <h2 className="font-display text-xl font-semibold text-white mb-6">My Bookings</h2>
                {mockBookings.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-ded-text-muted mb-4">No upcoming bookings</p>
                    <Link to="/book" className="px-5 py-2 border border-ded-accent-blue text-ded-accent-blue rounded-lg text-sm hover:bg-ded-accent-blue hover:text-white transition-all">Book a Session</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockBookings.map(booking => (
                      <div key={booking.id} className="bg-ded-bg rounded-lg border border-ded-border p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{booking.date}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(booking.status)}`}>{booking.status}</span>
                          </div>
                          <div className="text-sm text-ded-text-muted mt-1">{booking.time} · {booking.station} · {booking.type}</div>
                        </div>
                        <div className="flex gap-2">
                          {booking.status === 'Upcoming' && (
                            <>
                              <button className="px-3 py-1.5 text-xs text-ded-text-secondary hover:text-white border border-ded-border rounded hover:border-ded-accent-blue transition-colors">Reschedule</button>
                              <button className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 border border-ded-border rounded hover:border-red-400 transition-colors">Cancel</button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Achievements */}
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((ach, i) => (
                  <div
                    key={i}
                    className={`bg-ded-surface rounded-xl border p-5 transition-all ${
                      ach.unlocked ? 'border-ded-accent-blue/50 shadow-glow-blue' : 'border-ded-border'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        ach.unlocked ? 'bg-ded-accent-blue text-white' : 'bg-ded-surface-light text-ded-text-muted'
                      }`}>
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${ach.unlocked ? 'text-white' : 'text-ded-text-secondary'}`}>
                          {ach.name}
                        </h4>
                        <p className="text-sm text-ded-text-muted mt-0.5">{ach.description}</p>
                        {!ach.unlocked && ach.progress !== undefined && ach.total !== undefined && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-ded-text-muted mb-1">
                              <span>Progress</span>
                              <span>{ach.progress} / {ach.total}</span>
                            </div>
                            <Progress
                              value={(ach.progress / ach.total) * 100}
                              className="h-1.5 bg-ded-surface-light"
                            />
                          </div>
                        )}
                        {ach.unlocked && (
                          <span className="inline-block mt-2 text-xs text-ded-accent-cyan font-medium">Unlocked</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Settings / Membership */}
            <TabsContent value="settings">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-ded-surface rounded-xl border border-ded-border p-6 md:p-8 mb-6">
                    <h2 className="font-display text-xl font-semibold text-white mb-6">Membership</h2>
                    <MembershipCard tier={membershipTiers[1]} />
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-sm text-ded-text-muted">Renews on July 1, 2026</p>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-ded-accent-blue text-white text-sm rounded-lg hover:bg-[#3B82F6] transition-colors">Upgrade</button>
                        <button onClick={logout} className="px-4 py-2 border border-red-500/50 text-red-400 text-sm rounded-lg hover:bg-red-500/10 transition-colors">Cancel</button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-ded-surface rounded-xl border border-ded-border p-6 md:p-8">
                    <h2 className="font-display text-lg font-semibold text-white mb-4">Notifications</h2>
                    <div className="space-y-3">
                      {['Event reminders', 'New tournament alerts', 'Promotional offers', 'Booking confirmations'].map((label, i) => (
                        <div key={i} className="flex items-center justify-between py-2">
                          <span className="text-sm text-ded-text-secondary">{label}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                            <div className="w-9 h-5 bg-ded-surface-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-ded-accent-blue" />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { value: '12', label: 'Sessions this month' },
                    { value: '1', label: 'Coaching credits' },
                    { value: '3', label: 'Discounts used' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-ded-surface rounded-xl border border-ded-border p-4 text-center">
                      <div className="font-display text-2xl font-bold text-ded-accent-blue">{stat.value}</div>
                      <div className="text-xs text-ded-text-muted mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/book" className="px-5 py-2.5 border border-ded-accent-blue text-ded-accent-blue text-sm rounded-lg hover:bg-ded-accent-blue hover:text-white transition-all flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Book a Session
            </Link>
            <Link to="/coaching" className="px-5 py-2.5 border border-ded-accent-blue text-ded-accent-blue text-sm rounded-lg hover:bg-ded-accent-blue hover:text-white transition-all flex items-center gap-2">
              <Star className="w-4 h-4" /> Find a Coach
            </Link>
            <Link to="/shop" className="px-5 py-2.5 border border-ded-accent-blue text-ded-accent-blue text-sm rounded-lg hover:bg-ded-accent-blue hover:text-white transition-all flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Order Food
            </Link>
            <Link to="/events" className="px-5 py-2.5 border border-ded-accent-blue text-ded-accent-blue text-sm rounded-lg hover:bg-ded-accent-blue hover:text-white transition-all flex items-center gap-2">
              <Calendar className="w-4 h-4" /> View Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
