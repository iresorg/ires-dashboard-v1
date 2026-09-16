import React from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
    label: string;
    path: string;
    icon?: React.ReactNode;
}

interface SidebarProps {
    items: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
    return (
        <aside className="w-64 h-screen bg-gray-800 text-white fixed left-0 top-0">
            <div className="p-4">
                <h1 className="text-2xl font-bold">IRES Dashboard</h1>
            </div>
            <nav className="mt-8">
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.path}
                                className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                            >
                                {item.icon && <span className="mr-3">{item.icon}</span>}
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar; 