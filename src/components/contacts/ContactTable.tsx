
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Contact } from '@/types/contact';

interface Agent {
  id: string;
  name: string;
}

interface Campaign {
  id: string;
  name: string;
}

interface ContactTableProps {
  contacts: Contact[];
  agents: Agent[];
  campaigns: Campaign[];
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
  onContactClick: (contact: Contact) => void;
}

export const ContactTable = ({ contacts, agents, campaigns, onEdit, onDelete, onContactClick }: ContactTableProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-6">
          <div className="text-gray-400 text-4xl">👥</div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No contacts yet</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          You haven't added any contacts yet. Start by adding one.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 hover:bg-gray-800">
            <TableHead className="text-gray-300 font-semibold">Name</TableHead>
            <TableHead className="text-gray-300 font-semibold">Email</TableHead>
            <TableHead className="text-gray-300 font-semibold">Phone</TableHead>
            <TableHead className="text-gray-300 font-semibold">Tags</TableHead>
            <TableHead className="text-gray-300 font-semibold">Created On</TableHead>
            <TableHead className="text-gray-300 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow 
              key={contact.id} 
              className="border-gray-700 hover:bg-gray-700/50 cursor-pointer"
              onClick={() => onContactClick(contact)}
            >
              <TableCell className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                {contact.name}
              </TableCell>
              <TableCell className="text-gray-300">{contact.email}</TableCell>
              <TableCell className="text-gray-300">{contact.phone}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {contact.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-gray-300">{formatDate(contact.createdOn)}</TableCell>
              <TableCell>
                <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onContactClick(contact)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(contact)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(contact.id)}
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
