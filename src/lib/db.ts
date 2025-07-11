import { NextResponse } from 'next/server';
import connectDB from './mongodb';
import Lead from '@/models/Lead';

export async function getLeads(group?: string | null) {
  try {
    await connectDB();
    const query = group ? { group } : {};
    const leads = await Lead.find(query).lean();
    return { leads };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch leads');
  }
}

export async function createLead(leadData: any) {
  try {
    await connectDB();
    const newLead = new Lead(leadData);
    await newLead.save();
    return { lead: newLead };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create lead');
  }
}

export async function updateLead(id: string, updateData: any) {
  try {
    await connectDB();
    const lead = await Lead.findByIdAndUpdate(id, updateData, { new: true });
    if (!lead) throw new Error('Lead not found');
    return { lead };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update lead');
  }
}

export async function deleteLead(id: string) {
  try {
    await connectDB();
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) throw new Error('Lead not found');
    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete lead');
  }
}

export async function getGroups() {
  try {
    await connectDB();
    const groups = await Lead.distinct('group');
    return { groups: groups.filter(Boolean) };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch groups');
  }
}

export async function deleteGroup(groupName: string) {
  try {
    await connectDB();
    const result = await Lead.deleteMany({ group: groupName });
    return { success: true, deletedCount: result.deletedCount };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete group');
  }
}

export async function updateGroupName(oldGroupName: string, newGroupName: string) {
  try {
    await connectDB();
    const result = await Lead.updateMany(
      { group: oldGroupName },
      { $set: { group: newGroupName } }
    );
    return { success: true, modifiedCount: result.modifiedCount };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update group name');
  }
}
