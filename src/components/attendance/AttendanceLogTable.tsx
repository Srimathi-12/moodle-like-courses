
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Card } from '@/components/ui/card'; // Added this import
import { Search, Edit3, MoreHorizontal } from 'lucide-react';
import AttendanceStatusBadge from './AttendanceStatusBadge';
import type { AttendanceRecord } from '@/types/attendance';

interface AttendanceLogTableProps {
  records: AttendanceRecord[];
}

const ITEMS_PER_PAGE = 10;

const AttendanceLogTable: React.FC<AttendanceLogTableProps> = ({ records }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRecords = useMemo(() => {
    return records.filter(record =>
      record.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [records, searchTerm]);

  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);
  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecords.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRecords, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5; // Max direct page links visible (e.g., 1, 2, 3, ..., 10 or 1, ..., 4, 5, 6, ..., 10)

    if (totalPages <= maxVisiblePages + 2) { // Show all pages if not too many
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href="#" isActive={currentPage === i} onClick={(e) => {e.preventDefault(); handlePageChange(i)}}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href="#" isActive={currentPage === 1} onClick={(e) => {e.preventDefault(); handlePageChange(1)}}>1</PaginationLink>
        </PaginationItem>
      );

      // Calculate start and end for middle pages
      let startPage, endPage;
      if (currentPage <= Math.ceil(maxVisiblePages / 2)) { // near the beginning
        startPage = 2;
        endPage = maxVisiblePages -1; // -1 for first page, -1 for last ellipsis
        if (endPage > totalPages -1) endPage = totalPages -1;

      } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) { // near the end
        startPage = totalPages - (maxVisiblePages - 2); // -2 for first ellipsis and last page
        endPage = totalPages - 1;
      } else { // in the middle
        startPage = currentPage - Math.floor((maxVisiblePages-2)/2) ;
        endPage = currentPage + Math.ceil((maxVisiblePages-2)/2) -1 ;

      }
      
      if (startPage > 2) {
         items.push(<PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink href="#" isActive={currentPage === i} onClick={(e) => {e.preventDefault(); handlePageChange(i)}}>
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }

      if (endPage < totalPages - 1) {
        items.push(<PaginationItem key="ellipsis-end"><PaginationEllipsis /></PaginationItem>);
      }
      
      // Always show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href="#" isActive={currentPage === totalPages} onClick={(e) => {e.preventDefault(); handlePageChange(totalPages)}}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };


  return (
    <Card>
      <div className="p-4 flex justify-between items-center border-b">
        <h3 className="text-lg font-semibold">Attendance Log</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by Date or Status..."
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
            className="pl-10 w-64"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedRecords.length > 0 ? paginatedRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.checkIn}</TableCell>
              <TableCell>{record.checkOut}</TableCell>
              <TableCell><AttendanceStatusBadge status={record.status} /></TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                No records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {totalPages > 0 && (
        <div className="p-4 border-t flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <div>
            Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredRecords.length)} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredRecords.length)} of {filteredRecords.length} entries
          </div>
          {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => {e.preventDefault(); handlePageChange(currentPage - 1)}} aria-disabled={currentPage === 1} />
              </PaginationItem>
              {renderPaginationItems()}
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => {e.preventDefault(); handlePageChange(currentPage + 1)}} aria-disabled={currentPage === totalPages} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          )}
        </div>
      )}
    </Card>
  );
};

export default AttendanceLogTable;

