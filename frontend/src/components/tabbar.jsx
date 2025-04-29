import React from 'react';
import { tabBarStyles } from '../styles/componets/tabbarStyle';
const TabBar = ({ activeTab, onTabChange }) => {
  return (
    <div style={tabBarStyles.container}>
      <div 
        style={{
          ...tabBarStyles.tab, 
          ...activeTab === 'List' ? tabBarStyles.activeTab : null
        }}
        onClick={() => onTabChange('List')}
      >
        <span style={activeTab === 'List' ? tabBarStyles.activeText : null}>List</span>
      </div>
      <div 
        style={{
          ...tabBarStyles.tab, 
          ...activeTab === 'Table' ? tabBarStyles.activeTab : null
        }}
        onClick={() => onTabChange('Table')}
      >
        <span style={activeTab === 'Table' ? tabBarStyles.activeText : null}>Table</span>
      </div>
    </div>
  );
};

export default TabBar;