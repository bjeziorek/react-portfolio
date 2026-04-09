import { ProbablyATable, type TableColumnsColumns, type TableFiltersFilters } from "probably-a-table";
import type { FiltersMock } from "../Dashboard";


interface NewData {
  id: number;
  name: string;
}

function ProbablyATableProject() {
 const newData: NewData[] = [
    {
      "id": 1,
      "name": "Vision Encoder v3",
    },
   
    
  ];

  const colConfig: TableColumnsColumns<NewData> = [
    {
      id: "id",
      label: 'iddddd',
      visible: true,
      render: (model) => <span key={model.id+'id'}>model.id</span> 
    },
    {
      id: "name",
      label: 'nameeee',
      visible: true,
      render: (model) => <span key={model.id+'id'}>model.name</span>
    },
  ]

  const filterMock: TableFiltersFilters<FiltersMock> = {
    name: ''
  };

    return (
        <>
            <p>ProbablyATableProject</p>
            <ProbablyATable
                columns={colConfig}
                data={newData}
                filters={filterMock}
                defaultFilters={filterMock}
            />
        </>
    )
}

export default ProbablyATableProject;