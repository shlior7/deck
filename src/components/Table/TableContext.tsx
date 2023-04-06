import React, { createContext, useContext, useState } from 'react';


type TableContextProps = {
  stopTableDragging: () => void;
  startTableDragging: () => void;
} | null;;


export const TableContext = createContext<TableContextProps>(null);

export const useTableContext = (): TableContextProps => useContext(TableContext);
