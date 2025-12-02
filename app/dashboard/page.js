import React, { useState } from 'react';
import { 
  TrendingUp, LogOut, Plus, Calendar, DollarSign, 
  PieChart, ArrowUpRight, ArrowDownRight, Users,
  ExternalLink, Linkedin, Mail, Phone, Award
} from 'lucide-react';

export default function Dashboard() {
  const [transactionType, setTransactionType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Sample data
  const transactions = [
    { id: 1, type: 'income', amount: 45000, category: 'Freelance', description: 'Web Development Project', date: '2024-12-02' },
    { id: 2, type: 'expense', amount: 3500, category: 'Transport', description: 'Matatu - CBD to Karen', date: '2024-12-02' },
    { id: 3, type: 'expense', amount: 1200, category: 'Food', description: 'Lunch at Java', date: '2024-12-01' },
    { id: 4, type: 'income', amount: 120000, category: 'Salary', description: 'Monthly Salary', date: '2024-12-01' },
    { id: 5, type: 'expense', amount: 5000, category: 'Mama Mboga', description: 'Groceries for the week', date: '2024-11-30' },
  ];

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const advisors = [
    {
      name: "Sarah Mwangi",
      title: "Certified Financial Planner",
      specialty: "Investment & Retirement Planning",
      experience: "12 years",
      linkedin: "https://linkedin.com/in/sarahmwangi",
      email: "sarah.mwangi@example.com",
      phone: "+254 700 123 456",
      image: "SM"
    },
    {
      name: "John Kamau",
      title: "Tax Consultant",
      specialty: "Tax Optimization & Compliance",
      experience: "8 years",
      linkedin: "https://linkedin.com/in/johnkamau",
      email: "john.kamau@example.com",
      phone: "+254 700 234 567",
      image: "JK"
    },
    {
      name: "Grace Achieng",
      title: "Wealth Manager",
      specialty: "Portfolio Management",
      experience: "15 years",
      linkedin: "https://linkedin.com/in/graceachieng",
      email: "grace.achieng@example.com",
      phone: "+254 700 345 678",
      image: "GA"
    }
  ];

  const handleAddTransaction = () => {
    // In your actual implementation, this would save to Supabase
    console.log('Adding transaction:', { transactionType, amount, category, description, date });
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-bold tracking-tight">FinanceTracker</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm text-slate-400">Welcome back,</p>
              <p className="font-semibold">Resident of Galilee</p>
            </div>
            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-linear-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-xs text-emerald-400 font-medium">+12.5%</span>
            </div>
            <p className="text-sm text-slate-300 mb-1">Total Income</p>
            <p className="text-3xl font-bold">KES {totalIncome.toLocaleString()}</p>
          </div>

          <div className="bg-linear-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <ArrowDownRight className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-xs text-red-400 font-medium">-3.2%</span>
            </div>
            <p className="text-sm text-slate-300 mb-1">Total Expenses</p>
            <p className="text-3xl font-bold">KES {totalExpenses.toLocaleString()}</p>
          </div>

          <div className={`bg-linear-to-br ${balance >= 0 ? 'from-cyan-500/20 to-blue-600/20 border-cyan-500/30' : 'from-orange-500/20 to-orange-600/20 border-orange-500/30'} border rounded-xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${balance >= 0 ? 'bg-cyan-500/20' : 'bg-orange-500/20'} rounded-lg flex items-center justify-center`}>
                <DollarSign className={`w-6 h-6 ${balance >= 0 ? 'text-cyan-400' : 'text-orange-400'}`} />
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-1">Current Balance</p>
            <p className="text-3xl font-bold">KES {balance.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Transactions & Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Add Transaction Form */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                Add Transaction
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="type" 
                      value="expense" 
                      checked={transactionType === 'expense'}
                      onChange={(e) => setTransactionType(e.target.value)}
                      className="text-emerald-500" 
                    />
                    <span className="text-sm font-medium">Expense</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="type" 
                      value="income"
                      checked={transactionType === 'income'}
                      onChange={(e) => setTransactionType(e.target.value)}
                      className="text-emerald-500" 
                    />
                    <span className="text-sm font-medium">Income</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Amount (KES)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 focus:border-emerald-500 focus:outline-none transition-colors"
                  >
                    <option value="">Category</option>
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Rent</option>
                    <option>Mama Mboga</option>
                    <option>M-Pesa</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 focus:border-emerald-500 focus:outline-none transition-colors"
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 focus:border-emerald-500 focus:outline-none transition-colors"
                />

                <button 
                  onClick={handleAddTransaction}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-lg py-3 font-semibold transition-colors"
                >
                  Add Transaction
                </button>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                Recent Transactions
              </h2>
              
              <div className="space-y-3">
                {transactions.map(transaction => (
                  <div
                    key={transaction.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      transaction.type === 'income' 
                        ? 'border-emerald-500 bg-emerald-500/5' 
                        : 'border-red-500 bg-red-500/5'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{transaction.category}</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-400">{transaction.date}</span>
                        </div>
                        <p className="text-sm text-slate-400">{transaction.description}</p>
                      </div>
                      <p className={`text-lg font-bold ml-4 ${
                        transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}KES {transaction.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Advisors & Chart */}
          <div className="space-y-8">
            {/* Financial Advisors */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  Financial Advisors
                </h2>
              </div>

              <div className="space-y-4 mb-4">
                {advisors.map((advisor, index) => (
                  <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-emerald-500/50 transition-all duration-300 group">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold shrink-0">
                        {advisor.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 flex items-center gap-2">
                          {advisor.name}
                          <Award className="w-4 h-4 text-emerald-400" />
                        </h3>
                        <p className="text-xs text-emerald-400 mb-1">{advisor.title}</p>
                        <p className="text-xs text-slate-400 mb-2">{advisor.specialty}</p>
                        <div className="flex flex-wrap gap-2">
                          <a 
                            href={advisor.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded transition-colors"
                            title="LinkedIn Profile"
                          >
                            <Linkedin className="w-3 h-3" />
                          </a>
                          <a 
                            href={`mailto:${advisor.email}`}
                            className="inline-flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded transition-colors"
                            title="Email"
                          >
                            <Mail className="w-3 h-3" />
                          </a>
                          <a 
                            href={`tel:${advisor.phone}`}
                            className="inline-flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded transition-colors"
                            title="Call"
                          >
                            <Phone className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <a 
                href="https://www.linkedin.com/search/results/people/?keywords=financial%20advisor%20kenya" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-slate-900/50 hover:bg-slate-900 border border-slate-700 hover:border-emerald-500/50 rounded-lg py-3 text-sm font-medium transition-all duration-300"
              >
                Find More on LinkedIn
                <ExternalLink className="w-4 h-4" />
              </a>

              <p className="text-xs text-slate-400 mt-4 text-center">
                Connect with certified professionals who understand your financial goals
              </p>
            </div>

            {/* Spending Chart Placeholder */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-emerald-400" />
                Spending Breakdown
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm">Food</span>
                  </div>
                  <span className="font-semibold">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span className="text-sm">Transport</span>
                  </div>
                  <span className="font-semibold">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Rent</span>
                  </div>
                  <span className="font-semibold">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Utilities</span>
                  </div>
                  <span className="font-semibold">12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    <span className="text-sm">Other</span>
                  </div>
                  <span className="font-semibold">8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              <span className="font-bold">FinanceTracker</span>
            </div>
            
            <div className="flex gap-4">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
            
            <p className="text-sm text-slate-400">
              © 2024 Built with precision by Westley
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}