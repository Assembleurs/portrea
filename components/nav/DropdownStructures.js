import React, { useState, useEffect } from 'react';
import styles from '../../styles/DropdownStructures.module.css';

const DropdownStructures = ({ items, selectedItem, selectItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const closeDropdown = () => setIsOpen(false);
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  const maxCount = Math.max(...items.map(item => item.count));

  const itemsWithStructures = items.filter(item => item.count > 0);
  const itemsWithoutStructures = items.filter(item => item.count === 0);

  const sortedItems = [...itemsWithStructures, ...itemsWithoutStructures].sort((a, b) => b.count - a.count);

  return (
    <div className={styles["dropdown-container"]}>
        <br></br>
      <button onClick={toggleOpen} className={styles["dropdown-button"]}>
        {(items.find(item => item.id === selectedItem) || {}).displayName || 'Sélectionnner un accompagnement ⤵️'}
      </button>
      {isOpen && (
        <div className={styles["dropdown-content"]} onClick={e => e.stopPropagation()}>
          {sortedItems.map(item => (
            <div className={styles["dropdown-item"]}
              key={item.id} 
              onClick={() => item.count > 0 && selectItem(item.id)}
              style={{cursor: item.count > 0 ? 'pointer' : 'default'}}
            >
              <div
                className={styles["dropdown-item-bar"]}
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                  backgroundColor: item.count > 0 ? '#a4c3b2' : 'transparent',
                }}
              />
              <div className={styles["dropdown-item-text"]}>
                {item.displayName} ({item.count > 0 ? item.count : 'aucune structure'})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownStructures;
