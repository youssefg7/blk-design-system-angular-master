export interface Tournament {
    id?: string;
    name: string;
    userId: string;
    teamsId: string[];
    matchesId: string[];
    startDate:string;
    endDate:string;
    tickets:number;
    doc?: any;
  }