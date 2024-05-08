/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback, useMemo } from 'react';
import DataGrid, { Column, SortColumn } from 'react-data-grid';
import Lottie from 'lottie-react';
import 'react-data-grid/lib/styles.css';
import Loader from './Loader';
import noData from '../assets/lottie/nodata.json';

interface EPropsData {
  rows: any[];
  columns:  Column<any>[];
  groupBy?: any;
  isResizeHeight?: boolean;
  rowKeyGetter?: (row: any) => any;
  rowGrouper?: any;
  expandedGroupIds?: any;
  onExpandedGroupIdsChange?: any;
  selectedRows?: any;
  onSelectedRowsChange?: any;
  headerRowHeight?: number;
  loading?: boolean;
  rowHeight?: number;
  height?: number;
}

const EDataGrid: React.FC<EPropsData> = ({
  rows,
  columns,
  groupBy,
  isResizeHeight,
  rowGrouper,
  expandedGroupIds,
  onExpandedGroupIdsChange,
  selectedRows,
  onSelectedRowsChange,
  rowKeyGetter,
  headerRowHeight = 35,
  loading,
  rowHeight = 50,
  height,
}) => {
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);
  const { document } = window;
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSortColumnsChange = useCallback((sortColumnss: SortColumn[]) => {
    setSortColumns(sortColumnss.slice(-1));
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement && !document.fullscreenElement &&
      !document.fullscreenElement) {
      setIsFullScreenMode(false);
    } else {
      setIsFullScreenMode(true);
    }
  };


  const sortedRows = useMemo(():  any[] => {
    if (sortColumns.length === 0) return rows;
    const { columnKey, direction } = sortColumns[0];

    let sortedRow: any[] = [...rows];

    if (direction === 'ASC') {
      sortedRow = sortedRow.sort((a, b) => a[columnKey].localeCompare(b[columnKey]));
    }

    return direction === 'DESC' ? sortedRow.reverse() : sortedRow;
  }, [rows, sortColumns]);


  function EmptyRowsRenderer() {
    return (
      <div style={{ textAlign: 'center', gridColumn: '1/-1', marginTop: 20 }}>
        {loading ? (
          <Loader />
        ) : (
          <div className="mt-2 text-center items-center justify-content-center flex flex-col ">
            <Lottie animationData={noData} loop autoplay style={{ width: '150px' }} className="" />
            <span className="mt-3">Aucune données</span>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="p-0">
      <DataGrid
        columns={columns}
        rows={sortedRows}
        renderers={{ noRowsFallback: <EmptyRowsRenderer /> }}
        className={`fill-grid rdg-light card shadow-xl`}
        defaultColumnOptions={{ sortable: true, resizable: true }}
        direction="ltr"
        style={{ height: isResizeHeight ? height || 550 : isFullScreenMode ? 800 : height || 650 }}
        rowHeight={rowHeight}
        // expandedGroupIds={expandedGroupIds}
        // onExpandedGroupIdsChange={onExpandedGroupIdsChange}
        sortColumns={sortColumns}
        // onSortColumnsChange={onSortColumnsChange}
        selectedRows={selectedRows}
        onSelectedRowsChange={onSelectedRowsChange}
        rowKeyGetter={rowKeyGetter}
        headerRowHeight={headerRowHeight}
        // sortDirection="ASC"
        // on
      />
    </div>
  );
};

export default EDataGrid;
