'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

const EXPENSE_CATEGORIES = [
  'Rent', 'Food', 'Transport', 'Utilities', 'Entertainment', 
  'M-Pesa', 'Mama Mboga', 'Matatu', 'Other'
]

const INCOME_CATEGORIES = [
  'Salary', 'Freelance', 'Business', 'Gift', 'Other'
]

export default function TransactionForm({ onTransactionAdded }) {
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    const { error } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: user.id,
          type,
          amount: parseFloat(amount),
          category,
          description,
          date
        }
      ])
    
    if (error) {
      alert('Error adding transaction: ' + error.message)
    } else {
      // Reset form
      setAmount('')
      setCategory('')
      setDescription('')
      onTransactionAdded()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-black/80 p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold">Add Transaction</h2>
      
      <div className="flex gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            value="expense"
            checked={type === 'expense'}
            onChange={(e) => setType(e.target.value)}
            className="mr-2"
          />
          Expense
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="income"
            checked={type === 'income'}
            onChange={(e) => setType(e.target.value)}
            className="mr-2"
          />
          Income
        </label>
      </div>

      <input
        type="number"
        step="0.01"
        placeholder="Amount (KES)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-lg"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-lg"
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-lg"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Add Transaction
      </button>
    </form>
  )
}