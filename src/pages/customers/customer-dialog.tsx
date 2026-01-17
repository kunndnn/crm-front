import { useState, useEffect } from "react";
import type { Customer } from "../../services/customer.service";
import { Modal } from "../../components/ui/modal";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";

interface CustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: Customer; // If provided, edit mode
  onSave: (customer: Omit<Customer, "id"> | Customer) => Promise<void>;
}

export function CustomerDialog({
  isOpen,
  onClose,
  customer,
  onSave,
}: CustomerDialogProps) {
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: "",
    email: "",
    company: "",
    status: "lead",
    lastContact: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else {
      setFormData({
        name: "",
        email: "",
        company: "",
        status: "lead",
        lastContact: new Date().toISOString().split("T")[0],
      });
    }
  }, [customer, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Cast to correct type for save
      await onSave(formData as Customer);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "lead", label: "Lead" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={customer ? "Edit Customer" : "Add Customer"}
      description={
        customer
          ? "Update customer details."
          : "Add a new customer to your list."
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            required
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <Input
            required
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            placeholder="Acme Inc"
          />
        </div>
        <div>
          <Select
            label="Status"
            value={
              statusOptions.find((o) => o.value === formData.status) || null
            }
            onChange={(option) =>
              setFormData({ ...formData, status: option.value as any })
            }
            options={statusOptions}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : customer ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
