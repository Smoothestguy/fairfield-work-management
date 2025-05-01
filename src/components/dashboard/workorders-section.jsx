import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import Papa from 'papaparse'; // For CSV export
import SignatureCanvas from 'react-signature-canvas'; // Import signature canvas
import { useRef, useCallback } from 'react'; // Import useRef and useCallback
import { useDropzone } from 'react-dropzone'; // Import useDropzone
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Import Leaflet components
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

// Placeholder data for subcontractors (replace with actual data fetching)
const placeholderSubcontractors = [
  { id: 1, name: "ABC Contractors" },
  { id: 2, name: "Water Damage Pros" },
  { id: 3, name: "Cleanup Specialists" },
  { id: 4, name: "Building Experts Inc." },
  { id: 5, name: "Interior Solutions" },
  { id: 6, name: "Restoration Masters" },
  { id: 7, name: "Emergency Response Team" },
  { id: 8, name: "Quality Construction Co." },
];

const WorkOrdersSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedProgress, setUpdatedProgress] = useState(0);
  const [subcontractors, setSubcontractors] = useState(placeholderSubcontractors);

  // Ref for signature canvas
  const sigCanvasRef = useRef({});

  // State to store signature data URL (for demo)
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);

  // State for uploaded files (for demo)
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [workOrders, setWorkOrders] = useState([
    // ... existing work order data ...
     {
      id: 1,
      title: "Roof Repair",
      assignedToId: 1,
      assignedToName: "ABC Contractors",
      status: "In Progress",
      dueDate: "2025-05-05", // Use YYYY-MM-DD for sorting
      job: "Hurricane Damage Assessment",
      progress: 65,
      // ... other fields
    },
    {
      id: 2,
      title: "Water Extraction",
      assignedToId: 2,
      assignedToName: "Water Damage Pros",
      status: "Completed",
      dueDate: "2025-04-22",
      job: "Flood Restoration",
      progress: 100,
      // ... other fields
    },
    {
      id: 3,
      title: "Debris Removal",
      assignedToId: 3,
      assignedToName: "Cleanup Specialists",
      status: "Pending",
      dueDate: "2025-05-10",
      job: "Storm Debris Removal",
      progress: 0,
      // ... other fields
    },
  ]);

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Define columns for the table
  const columns = useMemo(() => [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'assignedToName', header: 'Assigned To' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'dueDate', header: 'Due Date' },
    { accessorKey: 'job', header: 'Job' },
    { accessorKey: 'progress', header: 'Progress (%)' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => openDetailsModal(row.original)}>
              View
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDeleteWorkOrder(row.original.id)}>
              Delete
            </Button>
        </div>
      ),
    },
  ], []);

  // Filter out deleted work orders for the table
  const activeWorkOrders = useMemo(() => workOrders.filter(order => !order.isDeleted), [workOrders]);

  const table = useReactTable({
    data: activeWorkOrders, // Use filtered data
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Function to handle CSV export
  const handleExportCSV = () => {
    const csvData = workOrders.map(wo => ({
      ID: wo.id,
      Title: wo.title,
      'Assigned To': wo.assignedToName,
      Status: wo.status,
      'Due Date': wo.dueDate,
      Job: wo.job,
      'Progress (%)': wo.progress,
      Description: wo.description,
      Location: wo.location,
      'Start Date': wo.startDate,
      'Estimated Hours': wo.estimatedHours,
      'Completed Hours': wo.completedHours,
      // Add other relevant fields
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'work_orders.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Available jobs for the dropdown
  const availableJobs = [
    "Hurricane Damage Assessment",
    "Flood Restoration",
    "Fire Damage Cleanup",
    "Storm Debris Removal",
    "Structural Assessment",
    "Water Damage Restoration"
  ];

  const [newWorkOrder, setNewWorkOrder] = useState({
    title: "",
    assignedToId: "",
    status: "Pending",
    dueDate: "",
    job: "",
    progress: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkOrder(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignedSub = subcontractors.find(sub => sub.id === parseInt(newWorkOrder.assignedToId));
    const assignedToName = assignedSub ? assignedSub.name : 'Unknown';
    const workOrder = {
      id: workOrders.length + 1,
      ...newWorkOrder,
      assignedToId: parseInt(newWorkOrder.assignedToId),
      assignedToName: assignedToName,
      progress: newWorkOrder.status === "Completed" ? 100 : (newWorkOrder.status === "In Progress" ? 30 : 0)
    };
    setWorkOrders([workOrder, ...workOrders]);
    setNewWorkOrder({
      title: "",
      assignedToId: "",
      status: "Pending",
      dueDate: "",
      job: "",
      progress: 0
    });
    setIsModalOpen(false);
  };

  const openDetailsModal = (workOrder) => {
      setSelectedWorkOrder(workOrder);
      setIsDetailsModalOpen(true);
  }

  const openStatusModal = (workOrder) => {
    setSelectedWorkOrder(workOrder);
    setUpdatedStatus(workOrder.status);
    setUpdatedProgress(workOrder.progress);
    setIsStatusModalOpen(true);
  };

  const handleStatusUpdate = () => {
    let completedHours = Math.round((selectedWorkOrder.estimatedHours || 0) * (updatedProgress / 100));
    let finalStatus = updatedStatus;
    let finalProgress = updatedProgress;
    if (finalProgress === 100 && finalStatus !== "Completed") { finalStatus = "Completed"; }
    if (finalStatus === "Completed" && finalProgress !== 100) { finalProgress = 100; completedHours = selectedWorkOrder.estimatedHours || 0; }
    if (finalStatus === "Pending" && finalProgress !== 0) { finalProgress = 0; completedHours = 0; }

    const updatedWorkOrder = {
      ...selectedWorkOrder,
      status: finalStatus,
      progress: finalProgress,
      completedHours: completedHours
    };
    const updatedWorkOrders = workOrders.map(order =>
      order.id === selectedWorkOrder.id ? updatedWorkOrder : order
    );
    setWorkOrders(updatedWorkOrders);
    setSelectedWorkOrder(updatedWorkOrder);
    setIsStatusModalOpen(false);
    // Also close details modal if open, as data is now stale
    if (isDetailsModalOpen) {
        setIsDetailsModalOpen(false);
    }
  };

  // Function to handle soft delete
  const handleDeleteWorkOrder = (id) => {
    // Add confirmation dialog here in a real application
    console.log(`Soft deleting work order with id: ${id}`);
    setWorkOrders(prevWorkOrders =>
      prevWorkOrders.map(order =>
        order.id === id ? { ...order, isDeleted: true } : order
      )
    );
    // Optionally add audit log entry here
  };

  // Signature Canvas handlers
  const clearSignature = () => {
    sigCanvasRef.current.clear();
    setSignatureDataUrl(null); // Also clear saved data if any
  };

  const saveSignature = () => {
    if (sigCanvasRef.current.isEmpty()) {
      alert("Please provide a signature first.");
      return;
    }
    const dataUrl = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
    setSignatureDataUrl(dataUrl);
    // In a real app, you would save this dataUrl to the work order record
    console.log("Signature saved (data URL):", dataUrl.substring(0, 50) + "...");
    // Optionally add audit log entry for signature capture
  };

  // Dropzone handler
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files (e.g., upload to server, add to state)
    console.log("Accepted files:", acceptedFiles);
    setUploadedFiles(prevFiles => [
      ...prevFiles,
      ...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
    ]);
    // In a real app, you would likely upload these files and store references
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Work Orders</h2>
        <div className="flex gap-2">
          <Button onClick={handleExportCSV} variant="outline">Export CSV</Button>
          <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
            Create Work Order
          </Button>
        </div>
      </div>

      {/* Global Filter Input */}
      <div className="mb-4">
          <Input
            placeholder="Search all columns..."
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(String(e.target.value))}
            className="max-w-sm"
          />
      </div>

      {/* TanStack Table Implementation */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals remain largely the same */}
      {/* Create Work Order Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Work Order">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields ... */}
           <div className="space-y-2">
            <Label htmlFor="title">Work Order Title</Label>
            <Input id="title" name="title" type="text" required value={newWorkOrder.title} onChange={handleInputChange} placeholder="Enter work order title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job">Related Job</Label>
            <select id="job" name="job" required value={newWorkOrder.job} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select a job</option>
              {availableJobs.map((job, index) => (<option key={index} value={job}>{job}</option>))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedToId">Assign To</Label>
            <select id="assignedToId" name="assignedToId" required value={newWorkOrder.assignedToId} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select a subcontractor</option>
              {subcontractors.map((sub) => (<option key={sub.id} value={sub.id}>{sub.name}</option>))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input id="dueDate" name="dueDate" type="date" required value={newWorkOrder.dueDate} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select id="status" name="status" value={newWorkOrder.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Create Work Order</Button>
          </div>
        </form>
      </Modal>

      {/* Work Order Details Modal */}
      <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title={selectedWorkOrder?.title || "Work Order Details"}>
        {selectedWorkOrder && (
          <div className="space-y-4">
             {/* Modal content uses selectedWorkOrder */}
             <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{selectedWorkOrder.title}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                selectedWorkOrder.status === "Completed" ? "bg-green-100 text-green-800" :
                selectedWorkOrder.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                "bg-yellow-100 text-yellow-800"
              }`}>
                {selectedWorkOrder.status}
              </span>
            </div>
            <div className="w-full bg-gray-200 h-4 rounded-full">
              <div
                className={`h-4 rounded-full ${
                  selectedWorkOrder.progress === 100 ? "bg-green-500" :
                  selectedWorkOrder.progress > 50 ? "bg-blue-500" :
                  selectedWorkOrder.progress > 0 ? "bg-yellow-500" :
                  "bg-gray-300"
                }`}
                style={{ width: `${selectedWorkOrder.progress}%` }}
              ></div>
            </div>
            <div className="text-right text-sm font-medium">{selectedWorkOrder.progress}% Complete</div>
             <div className="border-t pt-4">
              <dl className="divide-y divide-gray-200">
                 {/* Displaying details from selectedWorkOrder */}
                 <div className="py-3 grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-500">Description</dt><dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.description || 'N/A'}</dd></div>
                 <div className="py-3 grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-500">Related Job</dt><dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.job || 'N/A'}</dd></div>
                 <div className="py-3 grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-500">Assigned To</dt><dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.assignedToName || 'N/A'}</dd></div>
                 <div className="py-3 grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-500">Location</dt><dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.location || 'N/A'}</dd></div>
                 <div className="py-3 grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-500">Start Date</dt><dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.startDate || 'N/A'}</dd></div>
                 <div className="py-3 grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-500">Due Date</dt><dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.dueDate || 'N/A'}</dd></div>
                 <div className="py-3 grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-500">Estimated Hours</dt><dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.estimatedHours || 'N/A'}</dd></div>
                 <div className="py-3 grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-500">Completed Hours</dt><dd className="text-sm text-gray-900 col-span-2">{selectedWorkOrder.completedHours || 'N/A'}</dd></div>
                 {/* Add other fields as needed */}
              </dl>
            </div>

            {/* Map Section */}
            {selectedWorkOrder.location && (
                    <div className="border-t pt-4">
              <h4 className="text-md font-medium mb-2">Location Map</h4>
              {/* TODO: Implement geocoding to get coordinates from selectedWorkOrder.location */}
              {/* Example: const coordinates = await geocode(selectedWorkOrder.location); */}
              {/* Using placeholder coordinates for now */}
              const mapCenter = [51.505, -0.09]; // Replace with actual coordinates
              <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false} style={{ height: '200px', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapCenter}>
                  <Popup>
                    {selectedWorkOrder.location} <br /> (Approximate location)
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            )}

            {/* Signature Capture Section */}
            <div className="border-t pt-4">
              <h4 className="text-md font-medium mb-2">Completion Signature</h4>
              {signatureDataUrl ? (
                <div>
                  <p className="text-sm text-green-600 mb-2">Signature Saved:</p>
                  <img src={signatureDataUrl} alt="Saved Signature" className="border border-gray-300 rounded-md" />
                  <Button variant="outline" size="sm" onClick={() => setSignatureDataUrl(null)} className="mt-2">Clear Saved Signature</Button>
                </div>
              ) : (
                <div>
                  <div className="border border-gray-300 rounded-md overflow-hidden" style={{ width: 300, height: 150 }}>
                    <SignatureCanvas
                      ref={sigCanvasRef}
                      penColor='black'
                      canvasProps={{width: 300, height: 150, className: 'sigCanvas'}}
                    />
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <Button variant="outline" size="sm" onClick={clearSignature}>Clear</Button>
                    <Button size="sm" onClick={saveSignature}>Save Signature</Button>
                  </div>
                </div>
              )}
            </div>

            {/* Document Upload Section */}
            <div className="border-t pt-4">
                <h4 className="text-md font-medium mb-2">Attachments</h4>
                <div {...getRootProps()} className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
                {uploadedFiles.length > 0 && (
                    <aside className="mt-4">
                        <h5 className="text-sm font-medium mb-2">Uploaded Files:</h5>
                        <ul className="list-disc list-inside space-y-1">
                            {uploadedFiles.map(file => (
                                <li key={file.path} className="text-sm">
                                    {file.path} - {file.size} bytes
                                </li>
                            ))}
                        </ul>
                        <Button variant="outline" size="sm" onClick={() => setUploadedFiles([])} className="mt-2">Clear Uploads</Button>
                    </aside>
                )}
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <Button variant="outline" onClick={() => openStatusModal(selectedWorkOrder)}>Update Status/Progress</Button>
              <Button variant="outline" onClick={() => setIsDetailsModalOpen(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Status Update Modal */}
      <Modal isOpen={isStatusModalOpen} onClose={() => setIsStatusModalOpen(false)} title={`Update Status - ${selectedWorkOrder?.title}`}>
        {selectedWorkOrder && (
          <div className="space-y-4">
            {/* Status and Progress inputs ... */}
             <div className="space-y-2">
              <Label htmlFor="statusUpdate">Status</Label>
              <select id="statusUpdate" value={updatedStatus} onChange={(e) => setUpdatedStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="progress">Progress: {updatedProgress}%</Label>
              <input id="progress" type="range" min="0" max="100" step="5" value={updatedProgress} onChange={(e) => setUpdatedProgress(parseInt(e.target.value))} className="w-full" />
              {/* Progress Bar Visual */}
              <div className="w-full bg-gray-200 h-2 rounded-full"><div className={`h-2 rounded-full ${updatedProgress === 100 ? "bg-green-500" : updatedProgress > 50 ? "bg-blue-500" : updatedProgress > 0 ? "bg-yellow-500" : "bg-gray-300"}`} style={{ width: `${updatedProgress}%` }}></div></div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setIsStatusModalOpen(false)}>Cancel</Button>
              <Button onClick={handleStatusUpdate}>Update Status</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Remove WorkOrderCard component as it's replaced by the table
// const WorkOrderCard = ({ workOrder, onViewDetails }) => { ... };

export default WorkOrdersSection;
