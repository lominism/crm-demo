"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  Proposal: "bg-amber-100 text-amber-800",
  Negotiation: "bg-orange-100 text-orange-800",
  "Closed Won": "bg-green-100 text-green-800",
  "Closed Lost": "bg-red-100 text-red-800",
};

import { Lead } from "./lead-details-modal";

interface AddNewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadAdded: (lead: Lead) => void;
  selectedGroup?: string;
}

export function AddNewLeadModal({
  isOpen,
  onClose,
  onLeadAdded,
  selectedGroup,
}: AddNewLeadModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    project: "",
    status: "New",
    temperature: "Warm",
    value: "",
    source: "Website",
    assignedTo: "",
    notes: "",
    group: selectedGroup || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newLead: Lead = {
      id: String(Date.now()),
      ...formData,
      value: Number(formData.value) || 0,
      lastContact: new Date().toISOString(),
    };

    onLeadAdded(newLead);
    onClose();

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      project: "",
      status: "New",
      temperature: "Warm",
      value: "",
      source: "Website",
      assignedTo: "",
      notes: "",
      group: selectedGroup || "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center justify-between">
            <span>Add New Lead</span>
            <Badge className={statusColors[formData.status]}>
              {formData.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>Enter details for the new lead</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <label htmlFor="project" className="text-sm font-medium">
                    Project
                  </label>
                  <Input
                    id="project"
                    value={formData.project}
                    onChange={(e) =>
                      setFormData({ ...formData, project: e.target.value })
                    }
                    className="w-[500px]"
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSubmit}
                  className="flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label htmlFor="company" className="text-sm font-medium">
                        Company
                      </label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-sm font-medium">
                        Contact Name
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone
                      </label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label htmlFor="status" className="text-sm font-medium">
                        Status
                      </label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) =>
                          setFormData({ ...formData, status: value })
                        }
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Proposal">Proposal</SelectItem>
                          <SelectItem value="Negotiation">
                            Negotiation
                          </SelectItem>
                          <SelectItem value="Closed Won">Closed Won</SelectItem>
                          <SelectItem value="Closed Lost">
                            Closed Lost
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="temperature"
                        className="text-sm font-medium"
                      >
                        Temperature
                      </label>
                      <Select
                        value={formData.temperature}
                        onValueChange={(value) =>
                          setFormData({ ...formData, temperature: value })
                        }
                      >
                        <SelectTrigger id="temperature">
                          <SelectValue placeholder="Select temperature" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hot">Hot</SelectItem>
                          <SelectItem value="Warm">Warm</SelectItem>
                          <SelectItem value="Cold">Cold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="source" className="text-sm font-medium">
                        Source
                      </label>
                      <Input
                        id="source"
                        value={formData.source}
                        onChange={(e) =>
                          setFormData({ ...formData, source: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="value" className="text-sm font-medium">
                        Value (฿)
                      </label>
                      <Input
                        id="value"
                        type="number"
                        value={formData.value.toString()}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="assignedTo"
                        className="text-sm font-medium"
                      >
                        Assigned To
                      </label>
                      <Input
                        id="assignedTo"
                        value={formData.assignedTo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            assignedTo: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Notes</CardTitle>
                  <CardDescription>
                    Important information about this lead
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="min-h-[200px]"
                  placeholder="Enter notes about this lead..."
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
