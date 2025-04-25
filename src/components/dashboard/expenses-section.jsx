import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';

const ExpensesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Travel Expenses",
      amount: "$1,250.75",
      job: "Hurricane Damage Assessment",
      status: "Pending Approval",
      submittedBy: "John Smith",
      date: "April 20, 2025",
      category: "Travel",
      description: "Expenses for site visit to Lake Charles for hurricane damage assessment. Includes airfare, rental car, and meals for 3 days.",
      receiptUrl: "https://example.com/receipts/travel-1.pdf",
      approver: "Pending",
      paymentMethod: "Corporate Card",
      paymentDate: "Pending",
      notes: "Awaiting manager approval. All receipts have been submitted."
    },
    {
      id: 2,
      title: "Equipment Rental",
      amount: "$3,500.00",
      job: "Flood Restoration",
      status: "Approved",
      submittedBy: "Sarah Johnson",
      date: "April 15, 2025",
      category: "Equipment Rental",
      description: "Rental of industrial dehumidifiers, water pumps, and fans for flood restoration project in New Orleans.",
      receiptUrl: "https://example.com/receipts/equipment-2.pdf",
      approver: "Robert Chen",
      paymentMethod: "Company Check",
      paymentDate: "April 22, 2025",
      notes: "Equipment rented for 2 weeks. Approved by project manager."
    },
    {
      id: 3,
      title: "Supplies",
      amount: "$875.25",
      job: "Fire Damage Cleanup",
      status: "Paid",
      submittedBy: "Mike Williams",
      date: "April 5, 2025",
      category: "Supplies",
      description: "Purchase of cleaning supplies, protective equipment, and specialized chemicals for fire damage cleanup at Baton Rouge Business Center.",
      receiptUrl: "https://example.com/receipts/supplies-3.pdf",
      approver: "Lisa Rodriguez",
      paymentMethod: "Corporate Card",
      paymentDate: "April 12, 2025",
      notes: "All supplies used on site. Payment processed and reimbursed."
    },
    {
      id: 4,
      title: "Contractor Payment",
      amount: "$4,200.00",
      job: "Storm Debris Removal",
      status: "Approved",
      submittedBy: "Sarah Johnson",
      date: "April 18, 2025",
      category: "Contractor Payment",
      description: "Payment to ABC Hauling for debris removal services in Lafayette. Includes heavy equipment operation and disposal fees.",
      receiptUrl: "https://example.com/receipts/contractor-4.pdf",
      approver: "Robert Chen",
      paymentMethod: "Bank Transfer",
      paymentDate: "Pending",
      notes: "Invoice verified and approved. Payment scheduled for April 25."
    },
    {
      id: 5,
      title: "Fuel Costs",
      amount: "$320.50",
      job: "Structural Assessment",
      status: "Pending Approval",
      submittedBy: "John Smith",
      date: "April 22, 2025",
      category: "Fuel",
      description: "Fuel expenses for company vehicles used during structural assessment project in Shreveport. Multiple site visits required.",
      receiptUrl: "https://example.com/receipts/fuel-5.pdf",
      approver: "Pending",
      paymentMethod: "Corporate Card",
      paymentDate: "Pending",
      notes: "Receipts submitted for all fuel purchases. Awaiting approval from finance department."
    },
    {
      id: 6,
      title: "Accommodation",
      amount: "$950.00",
      job: "Water Damage Restoration",
      status: "Paid",
      submittedBy: "Mike Williams",
      date: "April 10, 2025",
      category: "Accommodation",
      description: "Hotel accommodations for restoration team in Alexandria. 3 rooms for 5 nights during water damage restoration project.",
      receiptUrl: "https://example.com/receipts/hotel-6.pdf",
      approver: "Emily Davis",
      paymentMethod: "Corporate Card",
      paymentDate: "April 15, 2025",
      notes: "Standard per diem rates applied. All expenses within budget guidelines."
    }
  ]);

  // Available jobs for the dropdown
  const availableJobs = [
    "Hurricane Damage Assessment",
    "Flood Restoration",
    "Fire Damage Cleanup",
    "Storm Debris Removal",
    "Structural Assessment",
    "Water Damage Restoration"
  ];

  // Available staff members for the dropdown
  const availableStaff = [
    "John Smith",
    "Sarah Johnson",
    "Mike Williams",
    "Emily Davis",
    "Robert Chen",
    "Lisa Rodriguez"
  ];

  // Expense categories
  const expenseCategories = [
    "Travel",
    "Equipment Rental",
    "Supplies",
    "Contractor Payment",
    "Fuel",
    "Accommodation",
    "Meals",
    "Office Supplies",
    "Miscellaneous"
  ];

  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    job: "",
    submittedBy: "",
    category: "",
    description: "",
    receiptUrl: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (value) => {
    // Remove any non-digit characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, '');

    // Ensure only one decimal point
    const parts = cleanValue.split('.');
    let formattedValue = parts[0];
    if (parts.length > 1) {
      formattedValue += '.' + parts[1].slice(0, 2); // Limit to 2 decimal places
    }

    // Add dollar sign
    if (formattedValue) {
      return '$' + formattedValue;
    }
    return '';
  };

  const handleAmountChange = (e) => {
    const formattedValue = formatCurrency(e.target.value);
    setNewExpense(prev => ({ ...prev, amount: formattedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the current date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const expense = {
      id: expenses.length + 1,
      ...newExpense,
      status: "Pending Approval",
      date: formattedDate
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({
      title: "",
      amount: "",
      job: "",
      submittedBy: "",
      category: "",
      description: "",
      receiptUrl: ""
    });
    setIsModalOpen(false);
  };

  const openStatusModal = (expense) => {
    setSelectedExpense(expense);
    setUpdatedStatus(expense.status);
    setIsStatusModalOpen(true);
  };

  const handleStatusUpdate = () => {
    // Get current user for approver field if status is changing to Approved
    let updatedExpense = { ...selectedExpense, status: updatedStatus };

    // If status is changing to Approved, update approver
    if (updatedStatus === "Approved" && selectedExpense.status !== "Approved") {
      updatedExpense.approver = "Current User"; // In a real app, this would be the logged-in user
    }

    // If status is changing to Paid, update payment date
    if (updatedStatus === "Paid" && selectedExpense.status !== "Paid") {
      const today = new Date();
      updatedExpense.paymentDate = today.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }

    const updatedExpenses = expenses.map(expense =>
      expense.id === selectedExpense.id ? updatedExpense : expense
    );

    setExpenses(updatedExpenses);
    setSelectedExpense(updatedExpense);
    setIsStatusModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Expenses</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto"
        >
          Submit New Expense
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {expenses.map(expense => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onViewDetails={() => {
              setSelectedExpense(expense);
              setIsDetailsModalOpen(true);
            }}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit New Expense"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Expense Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={newExpense.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter expense title"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              value={newExpense.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              {expenseCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium">
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="text"
              required
              value={newExpense.amount}
              onChange={handleAmountChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="$0.00"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="job" className="block text-sm font-medium">
              Related Job
            </label>
            <select
              id="job"
              name="job"
              required
              value={newExpense.job}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a job</option>
              {availableJobs.map((job, index) => (
                <option key={index} value={job}>{job}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="submittedBy" className="block text-sm font-medium">
              Submitted By
            </label>
            <select
              id="submittedBy"
              name="submittedBy"
              required
              value={newExpense.submittedBy}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select staff member</option>
              {availableStaff.map((staff, index) => (
                <option key={index} value={staff}>{staff}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={newExpense.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter expense description"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="receiptUrl" className="block text-sm font-medium">
              Receipt URL (optional)
            </label>
            <input
              id="receiptUrl"
              name="receiptUrl"
              type="url"
              value={newExpense.receiptUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/receipt.jpg"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Submit Expense</Button>
          </div>
        </form>
      </Modal>

      {/* Expense Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title={selectedExpense?.title || "Expense Details"}
      >
        {selectedExpense && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{selectedExpense.title}</h3>
              <span className="text-xl font-bold">{selectedExpense.amount}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                selectedExpense.status === "Paid" ? "bg-green-100 text-green-800" :
                selectedExpense.status === "Approved" ? "bg-blue-100 text-blue-800" :
                selectedExpense.status === "Rejected" ? "bg-red-100 text-red-800" :
                "bg-yellow-100 text-yellow-800"
              }`}>
                {selectedExpense.status}
              </span>
            </div>

            <div className="border-t pt-4">
              <dl className="divide-y divide-gray-200">
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedExpense.category}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedExpense.description}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Related Job</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedExpense.job}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Submitted By</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedExpense.submittedBy}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Date Submitted</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedExpense.date}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Approver</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedExpense.approver}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedExpense.paymentMethod}</dd>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Payment Date</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedExpense.paymentDate}</dd>
                </div>
                {selectedExpense.receiptUrl && (
                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-gray-500">Receipt</dt>
                    <dd className="text-sm text-blue-600 col-span-2">
                      <a href={selectedExpense.receiptUrl} target="_blank" rel="noopener noreferrer">
                        View Receipt
                      </a>
                    </dd>
                  </div>
                )}
                <div className="py-3 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Notes</dt>
                  <dd className="text-sm text-gray-900 col-span-2">{selectedExpense.notes}</dd>
                </div>
              </dl>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Close
              </Button>
              <Button onClick={() => openStatusModal(selectedExpense)}>Update Status</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Status Update Modal */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Update Expense Status"
      >
        {selectedExpense && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Update the status for <span className="font-medium text-gray-900">{selectedExpense.title}</span>
            </p>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Pending Approval">Pending Approval</option>
                <option value="Approved">Approved</option>
                <option value="Paid">Paid</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsStatusModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleStatusUpdate}>Update Status</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const ExpenseCard = ({ expense, onViewDetails }) => {
  const { title, amount, job, status, submittedBy, date } = expense;

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'paid': return 'bg-green-500';
      case 'approved': return 'bg-blue-500';
      case 'pending approval': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className="text-xl font-bold">{amount}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Job:</span>
            <span>{job}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <div className="flex items-center">
              <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(status)} mr-2`}></span>
              <span>{status}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Submitted By:</span>
            <span>{submittedBy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span>{date}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t flex justify-end">
          <Button variant="outline" size="sm" onClick={onViewDetails}>View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesSection;
