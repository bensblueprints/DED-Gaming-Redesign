import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Calendar, Star, ShoppingBag, Save, Camera, Check } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { useApp } from '@/context/AppContext'
import MembershipCard from '@/components/MembershipCard'
import { membershipTiers } from '@/data/memberships'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'bookings', label: 'My Bookings', icon: Calendar },
  { id: 'membership', label: 'Membership', icon: Star },
  { id: 'orders', label: 'Order History', icon: ShoppingBag },
]

const mockBookings = [
  { id: '1', date: 'June 15, 2026', time: '7:00PM', station: 'PC-12', type: 'Gaming Session', status: 'Upcoming' as const },
  { id: '2', date: 'May 28, 2026', time: '5:00PM', station: 'Console-A', type: 'Coaching', status: 'Completed' as const },
  { id: '3', date: 'May 10, 2026', time: '3:00PM', station: 'PC-05', type: 'Gaming Session', status: 'Cancelled' as const },
]

const mockOrders = [
  { id: '1', date: 'May 20, 2026', items: 'Coca-Cola, Pizza Slice', total: 6.48, status: 'Completed' as const },
  { id: '2', date: 'May 15, 2026', items: 'Chicken Tenders, Monster Energy', total: 12.48, status: 'Pending' as const },
]

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile')
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
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-[280px] flex-shrink-0">
              <div className="bg-ded-surface rounded-xl border border-ded-border p-2 sticky top-24">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-ded-surface-light text-white border-l-[3px] border-ded-accent-blue'
                        : 'text-ded-text-secondary hover:bg-ded-surface-light hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Profile */}
              {activeTab === 'profile' && (
                <div className="bg-ded-surface rounded-xl border border-ded-border p-6 md:p-8">
                  <h2 className="font-display text-xl font-semibold text-white mb-6">Profile</h2>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ded-accent-blue to-ded-accent-cyan flex items-center justify-center text-white font-display font-bold text-2xl">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
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
              )}

              {/* Bookings */}
              {activeTab === 'bookings' && (
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
              )}

              {/* Membership */}
              {activeTab === 'membership' && (
                <div>
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
                  <div className="grid grid-cols-3 gap-4">
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
              )}

              {/* Order History */}
              {activeTab === 'orders' && (
                <div className="bg-ded-surface rounded-xl border border-ded-border p-6 md:p-8">
                  <h2 className="font-display text-xl font-semibold text-white mb-6">Order History</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="border-b border-ded-border text-left">
                          <th className="pb-3 text-xs text-ded-text-muted font-medium">Date</th>
                          <th className="pb-3 text-xs text-ded-text-muted font-medium">Items</th>
                          <th className="pb-3 text-xs text-ded-text-muted font-medium">Total</th>
                          <th className="pb-3 text-xs text-ded-text-muted font-medium">Status</th>
                          <th className="pb-3 text-xs text-ded-text-muted font-medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockOrders.map(order => (
                          <tr key={order.id} className="border-b border-ded-border">
                            <td className="py-3 text-sm text-white">{order.date}</td>
                            <td className="py-3 text-sm text-ded-text-secondary">{order.items}</td>
                            <td className="py-3 text-sm text-white">${order.total.toFixed(2)}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                order.status === 'Completed' ? 'bg-ded-surface-light text-ded-text-muted' : 'bg-ded-accent-blue text-white'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3">
                              {order.status === 'Completed' && (
                                <button className="px-3 py-1 text-xs border border-ded-accent-blue text-ded-accent-blue rounded hover:bg-ded-accent-blue hover:text-white transition-all">Reorder</button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

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
