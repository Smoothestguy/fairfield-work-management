import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

// This component needs access to the main data state (e.g., workOrders)
// In a real app, this would likely come from context or a state management library
const RecycleBin = ({ allWorkOrders = [], onRestoreWorkOrder }) => {

  // Filter for deleted items
  const deletedWorkOrders = useMemo(() => allWorkOrders.filter(order => order.isDeleted), [allWorkOrders]);

  // Define columns for the deleted items table
  const columns = useMemo(() => [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'assignedToName', header: 'Assigned To' },
    { accessorKey: 'status', header: 'Last Status' },
    { accessorKey: 'dueDate', header: 'Due Date' },
    { accessorKey: 'job', header: 'Job' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Button variant="outline" size="sm" onClick={() => onRestoreWorkOrder(row.original.id)}>
          Restore
        </Button>
      ),
    },
  ], [onRestoreWorkOrder]);

  const table = useReactTable({
    data: deletedWorkOrders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recycle Bin - Deleted Work Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {deletedWorkOrders.length === 0 ? (
          <p className="text-gray-500">The recycle bin is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
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
        )}
      </CardContent>
    </Card>
  );
};

export default RecycleBin;

