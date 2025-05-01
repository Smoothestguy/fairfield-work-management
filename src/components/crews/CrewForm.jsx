import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

// Placeholder for Crew Form component
const CrewForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    crewLead: '',
    members: '', // Could be comma-separated or an array of names/IDs
    skills: '', // Could be comma-separated or tags
    certifications: '',
    associatedSubcontractorId: '', // Link to a subcontractor
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add validation
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Edit Crew' : 'Add New Crew'}
      </h2>
      <div>
        <Label htmlFor="crewLead">Crew Lead</Label>
        <Input id="crewLead" name="crewLead" value={formData.crewLead} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="members">Members</Label>
        <Input id="members" name="members" value={formData.members} onChange={handleChange} placeholder="e.g., John Doe, Jane Smith" />
      </div>
      <div>
        <Label htmlFor="skills">Skills</Label>
        <Input id="skills" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g., Carpentry, Electrical" />
      </div>
      <div>
        <Label htmlFor="certifications">Certifications</Label>
        <Input id="certifications" name="certifications" value={formData.certifications} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="associatedSubcontractorId">Associated Subcontractor ID</Label>
        {/* TODO: Replace with a dropdown/selector populated from Subcontractors */}
        <Input id="associatedSubcontractorId" name="associatedSubcontractorId" value={formData.associatedSubcontractorId} onChange={handleChange} />
      </div>
      {/* Add more form fields here */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initialData ? 'Save Changes' : 'Add Crew'}</Button>
      </div>
    </form>
  );
};

export default CrewForm;

