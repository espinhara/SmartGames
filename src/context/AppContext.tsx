import React, {createContext} from 'react';

import {Dimensions, Linking, Platform, ShareOptions, View} from 'react-native';

import ChildrenProps from '../types/children';
type DataContextType = {};
export const DataContext = createContext<DataContextType>(
  {} as DataContextType,
);
export function AppProvider({children}: ChildrenProps) {
  return <DataContext.Provider value={{}}></DataContext.Provider>;
}
