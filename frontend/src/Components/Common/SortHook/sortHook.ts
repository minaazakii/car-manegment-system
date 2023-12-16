import { useState, useEffect } from 'react';
import { DispatchFunction, apiParamsType, billTableData } from '../../Types/types';
import { SortOrder, TableColumn } from 'react-data-table-component';


interface RemoteSortHook {
    (apiFunction: (args:apiParamsType)=>void, dispatch: DispatchFunction, page: number, size: number, searchValue: string, orderType?: string, selectedDate?: Date): {
        handleRemoteSort: (column: TableColumn<billTableData>) => void;
        defState: number;
    };
}

export const useRemoteSort:RemoteSortHook = (apiFunction, dispatch, page, size, searchValue) => {
    const [sortCount, setSortCount] = useState(0);
    const [defState, setdefState] = useState(0);
    const [col, setCol] = useState<string|null|undefined>(null);
    const [dir, setDir] = useState<string|null|undefined>(null);

    const handleRemoteSort = (column:TableColumn<billTableData>,dir?:SortOrder) => {
        const colName = column?.name;
        if (typeof colName === 'string' || colName === null || colName === undefined) {
            if (col === colName && sortCount === 0) {
                setDir('DESC');
                setSortCount(1);
                setdefState(0)
            } else if (col === colName && sortCount === 1) {
                setDir(null);
                setCol(null);
                setSortCount(0);
                setdefState(1)
                // Here, you would reset your data to its original state
            } else {
                setCol(colName);
                setDir('ASC');
                setSortCount(0);
                setdefState(0)
            }
        }
    };

    useEffect(() => {
        dispatch(apiFunction({ page, size, col, dir, searchValue }));
    }, [apiFunction, col, dir, dispatch, page, searchValue, size]);

    return { handleRemoteSort,defState };
};
