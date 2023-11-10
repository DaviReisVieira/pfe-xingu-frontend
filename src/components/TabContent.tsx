import React from "react";

import styles from "../styles/components/TabContent.module.css";

interface TabContentProps {
    tabName: string;
    isActive: boolean;
    children: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ tabName, isActive, children }) => {
    return isActive ? (
        <div className={styles.tabContent}>
            {children}
        </div>
    ) : null;
};

export default TabContent;
