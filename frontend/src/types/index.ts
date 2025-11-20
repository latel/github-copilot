export interface Project {
  id?: number;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Report {
  id?: number;
  name: string;
  description?: string;
  projectId: number;
  layout?: any;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Component {
  id?: number;
  reportId: number;
  type: string;
  properties: any;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  dataSource?: any;
  zIndex: number;
}

export interface ComponentSchema {
  type: string;
  label: string;
  icon: string;
  defaultProps: any;
  schema: any;
}
