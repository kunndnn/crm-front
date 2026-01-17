import { useEffect, useState } from "react";
import { Plus, Search, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { customerService } from "../../services/customer.service";
import type { Customer } from "../../services/customer.service";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Avatar } from "../../components/ui/avatar";
import { Dropdown } from "../../components/ui/dropdown";
import { Loader } from "../../components/ui/loader";
import { EmptyState } from "../../components/ui/empty-state";
import { Pagination } from "../../components/ui/pagination";
import { Select } from "../../components/ui/select";
import { CustomerDialog } from "./customer-dialog";

export function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>(
    undefined,
  );

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data, total } = await customerService.getCustomers(
        page,
        pageSize,
        debouncedSearch,
      );
      setCustomers(data);
      setTotal(total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchCustomers();
  }, [page, pageSize, debouncedSearch]);

  const handleSave = async (customer: Customer | Omit<Customer, "id">) => {
    if ("id" in customer && customer.id) {
      await customerService.updateCustomer(customer.id, customer);
    } else {
      await customerService.createCustomer(customer);
    }
    await fetchCustomers();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      await customerService.deleteCustomer(id);
      await fetchCustomers();
    }
  };

  const openCreate = () => {
    setEditingCustomer(undefined);
    setDialogOpen(true);
  };

  const openEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader size="lg" />
        </div>
      ) : customers.length === 0 ? (
        <EmptyState
          title="No customers found"
          description={
            search
              ? "Try adjusting your search terms."
              : "Get started by creating a new customer."
          }
          action={
            !search && (
              <Button onClick={openCreate}>
                <Plus className="mr-2 h-4 w-4" /> Add Customer
              </Button>
            )
          }
        />
      ) : (
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={`https://i.pravatar.cc/150?u=${customer.email}`}
                        fallback={customer.name.substring(0, 2).toUpperCase()}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{customer.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {customer.email} • {customer.company}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.status === "active"
                          ? "success"
                          : customer.status === "lead"
                            ? "warning"
                            : "secondary"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.lastContact}</TableCell>
                  <TableCell className="text-right">
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      }
                      align="right"
                      items={[
                        {
                          label: "Edit",
                          icon: <Pencil />,
                          onClick: () => openEdit(customer),
                        },
                        {
                          label: "Delete",
                          icon: <Trash />,
                          onClick: () => handleDelete(customer.id),
                          disabled: false,
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between p-4 border-t">
            <div className="w-[180px]">
              <Select
                value={{ value: pageSize, label: `${pageSize} per page` }}
                onChange={(option) => {
                  setPageSize(Number(option.value));
                  setPage(1);
                }}
                options={[
                  { value: 10, label: "10 per page" },
                  { value: 25, label: "25 per page" },
                  { value: 50, label: "50 per page" },
                  { value: 100, label: "100 per page" },
                ]}
              />
            </div>

            <Pagination
              currentPage={page}
              totalPages={Math.ceil(total / pageSize)}
              onPageChange={setPage}
            />
          </div>
        </div>
      )}

      <CustomerDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        customer={editingCustomer}
        onSave={handleSave}
      />
    </div>
  );
}
