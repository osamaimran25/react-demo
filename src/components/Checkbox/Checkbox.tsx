// Checkbox.tsx

import React, { useState, useEffect } from 'react';

interface CheckboxProps {
  pid: number;
  token: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ pid, token }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Load the selected IDs from local storage
    const storedIdsString = localStorage.getItem(token);
    const storedIds = storedIdsString ? JSON.parse(storedIdsString) : [];

    // Update the checkbox state based on the stored IDs
    setIsChecked(storedIds.includes(pid));
  }, [pid, token]);

  const handleCheckboxChange = () => {
    // Toggle the checkbox state
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    // Load the selected IDs from local storage
    const storedIdsString = localStorage.getItem(token);
    const storedIds = storedIdsString ? JSON.parse(storedIdsString) : [];

    // Update the stored IDs based on the checkbox state
    const updatedIds = newCheckedState
      ? [...storedIds, pid]
      : storedIds.filter((storedId: number) => storedId !== pid);

    // Save the updated IDs to local storage
    localStorage.setItem(token, JSON.stringify(updatedIds));
  };

  return (
    <input
      type="checkbox"
      className=''
      checked={isChecked}
      onChange={handleCheckboxChange}
    />
  );
};

export default Checkbox;
