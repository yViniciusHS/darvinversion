// src/features/industry/MultiSelectFilter.js
import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';

const MultiSelectFilter = ({ options, selectedIds, onChange, title }) => {
    const handleSelect = (id) => {
        const newSelectedIds = selectedIds.includes(id)
            ? selectedIds.filter(item => item !== id)
            : [...selectedIds, id];
        onChange(newSelectedIds);
    };

    const toggleText = selectedIds.length > 0 ? `${title} (${selectedIds.length})` : title;

    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                {toggleText}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {options.map(option => (
                    <div key={option.id} className="px-2">
                        <Form.Check 
                            type="checkbox"
                            id={`check-${option.id}`}
                            label={option.name}
                            checked={selectedIds.includes(option.id)}
                            onChange={() => handleSelect(option.id)}
                        />
                    </div>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default MultiSelectFilter;