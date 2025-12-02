import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center p-8">
      <div className="text-center text-white max-w-2xl">
        <h1 className="text-5xl font-bold mb-6">Finance Tracker</h1>
        <p className="text-xl mb-8">
          Take control of your money. Track every shilling, see where it goes, 
          and make smarter financial decisions.
        </p>
        <Link
          href="/login"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}