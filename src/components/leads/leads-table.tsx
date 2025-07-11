"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LeadDetailsModal } from "./lead-details-modal";
import { Lead } from "./lead-details-modal";

// Mock Data
const mockLeads: Lead[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@techcorp.com",
    phone: "123-456-7890",
    company: "Tech Corp",
    project: "Website Redesign",
    status: "New",
    temperature: "Hot",
    assignedTo: "Sarah Manager",
    value: 50000,
    lastContact: "2025-07-10",
    source: "Website",
    notes: "Interested in complete digital transformation",
    group: "Sales",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@innovate.co",
    phone: "098-765-4321",
    company: "Innovate Co",
    project: "Mobile App Development",
    status: "Qualified",
    temperature: "Warm",
    assignedTo: "Mike Sales",
    value: 75000,
    lastContact: "2025-07-09",
    source: "Referral",
    notes: "Looking for iOS and Android development",
    group: "Marketing",
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@global.com",
    phone: "555-555-5555",
    company: "Global Industries",
    project: "ERP Implementation",
    status: "Negotiation",
    temperature: "Hot",
    assignedTo: "Sarah Manager",
    value: 150000,
    lastContact: "2025-07-08",
    source: "LinkedIn",
    notes: "Need complete system overhaul",
    group: "Sales",
  },
];

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  Qualified: "bg-purple-100 text-purple-800",
  Proposal: "bg-amber-100 text-amber-800",
  Negotiation: "bg-orange-100 text-orange-800",
  "Closed Won": "bg-green-100 text-green-800",
  "Closed Lost": "bg-red-100 text-red-800",
};

const temperatureColors: Record<string, string> = {
  Hot: "bg-red-100 text-red-800",
  Warm: "bg-amber-100 text-amber-800",
  Cold: "bg-blue-100 text-blue-800",
};

export default function LeadsTable({
  selectedGroup,
}: {
  selectedGroup: string | null;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [temperatureFilter, setTemperatureFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  // Function to open the modal with a specific lead
  const openLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  // Function to update the selectedLead
  const updateLead = (updatedLead: Lead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    );
    setSelectedLead(updatedLead);
  };

  // Function to delete a lead
  const handleDeleteLead = (leadId: string) => {
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
  };

  // Filter leads based on search term and filters
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;
    const matchesSource =
      sourceFilter === "all" || lead.source === sourceFilter;
    const matchesTemperature =
      temperatureFilter === "all" || lead.temperature === temperatureFilter;

    return (
      matchesSearch && matchesStatus && matchesSource && matchesTemperature
    );
  });

  // Get unique statuses, sources, and temperatures for filters
  const statuses = Array.from(new Set(leads.map((lead) => lead.status)));
  const sources = Array.from(new Set(leads.map((lead) => lead.source)));
  const temperatures = Array.from(
    new Set(leads.map((lead) => lead.temperature))
  );

  return (
    <Card className="max-w-dvw mx-auto">
      <CardHeader>
        {/* <CardTitle>Leads</CardTitle> was removed for now*/}
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Status:</span>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-1">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Temp:</span>
            </div>
            <Select
              value={temperatureFilter}
              onValueChange={setTemperatureFilter}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="All Temperatures" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Temperatures</SelectItem>
                {temperatures.map((temp) => (
                  <SelectItem key={temp} value={temp}>
                    {temp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-1">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Source:</span>
            </div>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border max-w-full mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Temp</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.company}</TableCell>
                  <TableCell className="whitespace-normal break-words max-w-[200px]">
                    {lead.project || "N/A"}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {lead.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        statusColors[lead.status] || "bg-gray-100 text-gray-800"
                      }
                    >
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={temperatureColors[lead.temperature]}>
                      {lead.temperature}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.assignedTo}</TableCell>
                  <TableCell className="text-right">
                    ฿{lead.value.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(lead.lastContact).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openLeadDetails(lead)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteLead(lead.id)} // Call deleteLead
                        >
                          Delete Lead
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredLeads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No leads found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <LeadDetailsModal
        lead={selectedLead}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdateLead={updateLead} // Pass the update function
      />
    </Card>
  );
}
