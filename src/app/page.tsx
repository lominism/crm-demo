"use client";
import LeadsTable from "@/components/leads/leads-table";
import { useState } from "react";
import { AddNewCollectionModal } from "@/components/leads/add-new-collection-modal";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton"; // Import ShadCN's Skeleton component

export default function LeadsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddCollectionModalOpen, setIsAddCollectionModalOpen] =
    useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [groups, setGroups] = useState<string[]>([]); // State to store unique group values
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null); // State for selected group
  const [loading, setLoading] = useState(false); // State to track loading

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const openAddCollectionModal = () => {
    setIsAddCollectionModalOpen(true);
  };

  const closeAddCollectionModal = () => {
    setIsAddCollectionModalOpen(false);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleCollectionAdded = (newCollectionName: string) => {
    setSelectedGroup(newCollectionName); // Set the new collection as the selected group
  };

  return (
    <div key={refreshKey} className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
        <div className="flex space-x-4">
          {/* Delete Group Button */}
          <button
            className="bg-destructive text-white hover:bg-red-600 rounded-md px-4 py-2 text-sm font-medium disabled:bg-destructive/50 disabled:cursor-not-allowed"
            onClick={() => {
              // Logic to delete the selected group
              console.log("Deleting group:", selectedGroup);
            }}
            disabled={!selectedGroup || loading} // Disable if no group is selected
          >
            Delete Group
          </button>
          {/* Group Select Dropdown */}
          <Select value={selectedGroup || ""} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Groups" />
            </SelectTrigger>
            <SelectContent>
              {groups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Add Collection Button */}
          <button
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-md px-4 py-2 text-sm font-medium"
            onClick={openAddCollectionModal}
          >
            Add Collection
          </button>

          {/* Add New Lead Button */}
          <button
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium"
            onClick={openAddModal}
          >
            Add New Lead
          </button>
        </div>
      </div>

      {/* Skeleton Loader */}
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        <LeadsTable selectedGroup={selectedGroup} />
      )}
      <AddNewCollectionModal
        isOpen={isAddCollectionModalOpen}
        onClose={closeAddCollectionModal}
        onCollectionAdded={handleCollectionAdded}
      />
    </div>
  );
}
