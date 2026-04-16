import React from "react";
import {
  Target,
  PhoneCall,
  Clock,
  CheckCircle,
  UserMinus,
  PhoneOff,
  AlertOctagon,
  History,
  PowerOff,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const StatusCard = ({ label, value, icon, color, text }) => (
  <div
    className={`${color} p-5 rounded-[2.2rem] flex flex-col justify-between border border-white/50 shadow-sm active:scale-95 transition-transform`}
  >
    <div className={`p-2.5 bg-white rounded-xl shadow-sm w-fit ${text}`}>
      {icon}
    </div>
    <div className="mt-4">
      <p className="text-2xl font-black text-gray-900">{value || 0}</p>
      <p className="text-[9px] font-black uppercase tracking-wider text-gray-400 mt-1 leading-none">
        {label}
      </p>
    </div>
  </div>
);

const StatusGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Link to="/status/interested">
        <StatusCard
          label="Interested"
          value={data?.interested}
          icon={<Target size={18} />}
          color="bg-emerald-50"
          text="text-emerald-600"
        />
      </Link>

      <Link to="/status/follow-up">
        <StatusCard
          label="Follow-up"
          value={data?.followups}
          icon={<PhoneCall size={18} />}
          color="bg-amber-50"
          text="text-amber-600"
        />
      </Link>

      <Link to="/status/pending">
        <StatusCard
          label="Pending"
          value={data?.pendingLeads}
          icon={<Clock size={18} />}
          color="bg-blue-50"
          text="text-blue-600"
        />
      </Link>

      <Link to="/status/closed">
        <StatusCard
          label="Closed"
          value={data?.closedLeads}
          icon={<CheckCircle size={18} />}
          color="bg-indigo-50"
          text="text-indigo-600"
        />
      </Link>

      <Link to="/status/call-back-due">
        <StatusCard
          label="Callback"
          value={data?.callBackDue}
          icon={<History size={18} />}
          color="bg-violet-50"
          text="text-violet-600"
        />
      </Link>

      <Link to="/status/busy">
        <StatusCard
          label="Busy"
          value={data?.busy}
          icon={<UserMinus size={18} />}
          color="bg-orange-50"
          text="text-orange-600"
        />
      </Link>

      <Link to="/status/not-picked">
        <StatusCard
          label="Not Picked"
          value={data?.notPicked}
          icon={<PhoneOff size={18} />}
          color="bg-rose-50"
          text="text-rose-600"
        />
      </Link>

      <Link to="/status/switch-off">
        <StatusCard
          label="Switch Off"
          value={data?.switchOff}
          icon={<PowerOff size={18} />}
          color="bg-gray-100"
          text="text-gray-500"
        />
      </Link>

      <Link to="/status/invalid-number">
        <StatusCard
          label="Invalid"
          value={data?.invalidNumber}
          icon={<AlertOctagon size={18} />}
          color="bg-red-50"
          text="text-red-600"
        />
      </Link>

      <Link to="/status/not-interested">
        <StatusCard
          label="Not Int."
          value={data?.notInterested}
          icon={<AlertCircle size={18} />}
          color="bg-slate-100"
          text="text-slate-600"
        />
      </Link>
    </div>
  );
};

export default StatusGrid;
