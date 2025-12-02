'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import TransactionForm from '../components/TransactionForm'
import SpendingChart from '../components/SpendingChart'

export default function Dashboard() {
    const [user, setUser] = useState(null)
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            router.push('/login')
        } else {
            setUser(user)
            fetchTransactions()
        }
        setLoading(false)
    }

    const fetchTransactions = async () => {
        const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .order('date', { ascending: false })

        if (!error) {
            setTransactions(data)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    // Calculate totals
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0)

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0)

    const balance = totalIncome - totalExpenses

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-black">Finance Tracker</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-green-100 p-6 rounded-lg">
                        <p className="text-sm text-gray-600">Total Income</p>
                        <p className="text-2xl font-bold text-green-700">KES {totalIncome.toFixed(2)}</p>
                    </div>
                    <div className="bg-red-100 p-6 rounded-lg">
                        <p className="text-sm text-gray-600">Total Expenses</p>
                        <p className="text-2xl font-bold text-red-700">KES {totalExpenses.toFixed(2)}</p>
                    </div>
                    <div className={`p-6 rounded-lg ${balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
                        <p className="text-sm text-gray-600">Balance</p>
                        <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                            KES {balance.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/*Charts*/}
                    <div className="mt-8">
                        <SpendingChart transactions={transactions} />
                    </div>
                    {/* Transaction Form */}
                    <TransactionForm onTransactionAdded={fetchTransactions} />

                    {/* Recent Transactions */}
                    <div className="bg-black/80 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {transactions.length === 0 ? (
                                <p className="text-gray-500">No transactions yet. Add one to get started!</p>
                            ) : (
                                transactions.map(transaction => (
                                    <div
                                        key={transaction.id}
                                        className={`p-4 rounded-lg border-l-4 ${transaction.type === 'income' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-semibold text-black">{transaction.category}</p>
                                                <p className="text-sm text-gray-600">{transaction.description}</p>
                                                <p className="text-xs text-gray-500">{transaction.date}</p>
                                            </div>
                                            <p className={`text-lg font-bold ${transaction.type === 'income' ? 'text-green-700' : 'text-red-700'
                                                }`}>
                                                {transaction.type === 'income' ? '+' : '-'}KES {parseFloat(transaction.amount).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}