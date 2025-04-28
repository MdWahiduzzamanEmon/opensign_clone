import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CBasicTable from '../../../ui-component/CBasicTable/CBasicTable';
const InProgress = () => {
  const columns = [
    // Title	Note	Folder	File	Signers
    { headerName: 'Title', field: 'title' },
    { headerName: 'Note', field: 'note' },
    { headerName: 'Folder', field: 'folder' },
    { headerName: 'File', field: 'file' },
    { headerName: 'Signers', field: 'signers' },
  ];
  const rows = [
    {
      id: 1,
      title: 'Document 1',
      note: 'Please sign this document.',
      folder: 'Folder A',
      file: 'document1.pdf',
      signers: 'Jane Smith, Bob Johnson',
    },
    {
      id: 2,
      title: 'Document 2',
      note: 'Urgent signature required.',
      folder: 'Folder B',
      file: 'document2.pdf',
      signers: 'Mike Davis, Emily Wilson',
    },
  ];

  return (
    <MainCard title="In Progress Documents">
      <CBasicTable columns={columns} rows={rows} />
    </MainCard>
  );
};

export default InProgress;
