import React, { useState } from 'react';
import type { Responder } from '@/types';
import Button from '@/components/ui/Button';

const RespondersPage: React.FC = () => {
    const [responders] = useState<Responder[]>([]);
    const [statusFilter, setStatusFilter] = useState('all');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Responders</h1>
                <Button>Add Responder</Button>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <div className="mb-4">
                    <select
                        className="border rounded-md px-3 py-2"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="available">Available</option>
                        <option value="busy">Busy</option>
                        <option value="offline">Offline</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {responders.map((responder) => (
                        <div key={responder.id} className="bg-white border rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">{responder.name}</h3>
                                    <p className="text-sm text-gray-500">ID: {responder.id}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full
                  ${responder.status === 'available' ? 'bg-green-100 text-green-800' :
                                        responder.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'}`}>
                                    {responder.status}
                                </span>
                            </div>

                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700">Skills</h4>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {responder.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end space-x-2">
                                <Button variant="secondary" size="sm">View Details</Button>
                                <Button size="sm">Contact</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RespondersPage; 