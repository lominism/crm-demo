import mongoose from 'mongoose';

export interface ILead {
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  temperature: string;
  source: string;
  value: string;
  lastContact: string;
  assignedTo: string;
  group: string;
  notes: string;
}

const LeadSchema = new mongoose.Schema<ILead>({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  status: { type: String, required: true },
  temperature: { type: String, required: true },
  source: { type: String },
  value: { type: String },
  lastContact: { type: String },
  assignedTo: { type: String },
  group: { type: String },
  notes: { type: String }
}, {
  timestamps: true
});

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
