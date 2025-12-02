'use client'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B9D']

export default function SpendingChart({ transactions }) {
  // Group expenses by category
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const cat = t.category
      acc[cat] = (acc[cat] || 0) + parseFloat(t.amount)
      return acc
    }, {})

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2))
  }))

  if (data.length === 0) {
    return (
      <div className="bg-black/80 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Spending by Category</h2>
        <p className="text-gray-500">No expenses to display yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-black/80 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}