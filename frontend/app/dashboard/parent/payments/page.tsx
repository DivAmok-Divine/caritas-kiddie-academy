"use client";

import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/useDashboard/DashboardHeader";

export default function PaymentsPage() {
  const router = useRouter();

  // Hardcoded payment history (sorted with latest first)
  const payments = [
    {
      id: "3",
      feeType: "Tuition Fee",
      amount: 500.00,
      dueDate: "2025-01-01",
      paidDate: null,
      status: "Pending",
      paymentMethod: null,
      receiptNumber: null,
    },
    {
      id: "1",
      feeType: "Tuition Fee",
      amount: 500.00,
      dueDate: "2024-12-01",
      paidDate: "2024-11-28",
      status: "Paid",
      paymentMethod: "Bank Transfer",
      receiptNumber: "RCP-2024-001",
    },
    {
      id: "2",
      feeType: "Tuition Fee",
      amount: 500.00,
      dueDate: "2024-11-01",
      paidDate: "2024-10-28",
      status: "Paid",
      paymentMethod: "Bank Transfer",
      receiptNumber: "RCP-2024-002",
    },
  ];

  const totalPaid = payments.filter(p => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#F8F9FA' }}>
      <DashboardHeader />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 pt-24">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 px-4 py-2 rounded-md transition-colors shadow-md"
          style={{ color: '#FFFFFF', backgroundColor: '#210a87' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a0870'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#210a87'}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: '#212529' }}>Payment History</h1>
          <p className="mt-1" style={{ color: '#212529' }}>View and manage your fee payments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg shadow-xl border p-4 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
            {/* Decorative bubbles */}
            <div className="absolute top-[-10px] right-[-10px] w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="absolute bottom-[-15px] left-[-15px] w-16 h-16 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="relative z-10">
              <p className="text-sm mb-2 pb-2 border-b" style={{ color: '#212529', borderColor: '#E0E0E0' }}>Total Paid</p>
              <p className="text-2xl font-bold" style={{ color: '#00A3A3' }}>₵{totalPaid.toFixed(2)}</p>
            </div>
          </div>
          <div className="rounded-lg shadow-xl border p-4 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
            {/* Decorative bubbles */}
            <div className="absolute top-[-10px] right-[-10px] w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="absolute bottom-[-15px] left-[-15px] w-16 h-16 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="relative z-10">
              <p className="text-sm mb-2 pb-2 border-b" style={{ color: '#212529', borderColor: '#E0E0E0' }}>Pending Payment</p>
              <p className="text-2xl font-bold" style={{ color: '#FFA500' }}>₵{totalPending.toFixed(2)}</p>
            </div>
          </div>
          <div className="rounded-lg shadow-xl border p-4 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
            {/* Decorative bubbles */}
            <div className="absolute top-[-10px] right-[-10px] w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="absolute bottom-[-15px] left-[-15px] w-16 h-16 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="relative z-10">
              <p className="text-sm mb-2 pb-2 border-b" style={{ color: '#212529', borderColor: '#E0E0E0' }}>Next Due Date</p>
              <p className="text-2xl font-bold" style={{ color: '#212529' }}>Jan 1, 2025</p>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="rounded-lg shadow-xl border overflow-hidden relative" style={{ backgroundColor: '#F8F9FA' }}>
          {/* Decorative bubbles */}
          <div className="absolute top-[-15px] right-[-15px] w-28 h-28 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
          <div className="absolute bottom-[-20px] left-[-20px] w-20 h-20 rounded-full opacity-10" style={{ backgroundColor: '#00A3A3' }}></div>
          
          <div className="relative z-10">
            <div className="px-6 py-4 border-b-2" style={{ borderColor: '#00A3A3' }}>
              <h2 className="text-xl font-bold" style={{ color: '#212529' }}>Payment History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#00A3A3' }}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#212529' }}>Fee Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#212529' }}>Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#212529' }}>Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#212529' }}>Paid Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#212529' }}>Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: '#212529' }}>Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#E0E0E0' }}>
                {payments.map((payment, index) => (
                  <tr key={payment.id} className="hover:bg-opacity-50" style={{ backgroundColor: index % 2 === 0 ? '#F8F9FA' : '#FFFFFF' }}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#212529' }}>
                      {payment.feeType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#212529' }}>
                      ₵{payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#212529' }}>
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#212529' }}>
                      {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-medium rounded"
                        style={{
                          backgroundColor: payment.status === "Paid" ? '#00A3A3' : '#FFA500',
                          color: '#FFFFFF'
                        }}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#00A3A3' }}>
                      {payment.receiptNumber ? (
                        <button className="hover:underline" onMouseEnter={(e) => e.currentTarget.style.color = '#008080'} onMouseLeave={(e) => e.currentTarget.style.color = '#00A3A3'}>{payment.receiptNumber}</button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>
        </div>

        {/* Make Payment Button */}
        <div className="mt-6">
          <button className="px-6 py-3 text-white rounded-md font-medium shadow-lg" style={{ backgroundColor: '#210a87' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a0870'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#210a87'}>
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
}
