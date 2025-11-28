"use client";

import Button from "@/components/ui/Button";

interface QuickActionsProps {
  onViewProfile?: () => void;
  onMessageCaregiver?: () => void;
  onViewProgressReports?: () => void;
  onPaymentHistory?: () => void;
}

export default function QuickActions({
  onViewProfile,
  onMessageCaregiver,
  onViewProgressReports,
  onPaymentHistory,
}: QuickActionsProps) {
  return (
    <div className="rounded-lg shadow-xl border p-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Decorative bubbles */}
      <div className="absolute top-[-10px] right-[-10px] w-16 h-16 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
      <div className="absolute bottom-[-15px] left-[-15px] w-12 h-12 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-4 pb-3 border-b-2" style={{ color: '#212529', borderColor: '#00A3A3' }}>Quick Actions</h3>
      <div className="space-y-2">
        <Button
          variant="outline"
          fullWidth
          className="justify-start"
          onClick={onViewProfile}
        >
          View Full Profile
        </Button>
        <Button
          variant="outline"
          fullWidth
          className="justify-start"
          onClick={onMessageCaregiver}
        >
          Message Caregiver
        </Button>
        <Button
          variant="outline"
          fullWidth
          className="justify-start"
          onClick={onViewProgressReports}
        >
          View Progress Reports
        </Button>
        <Button
          variant="outline"
          fullWidth
          className="justify-start"
          onClick={onPaymentHistory}
        >
          Payment History
        </Button>
        </div>
      </div>
    </div>
  );
}

