export interface IFolderDataTypes {
  id: string;
  name: string;
  parent: string;
  children: IFolderDetailsDataType[];
}
export interface IFolderDetailsDataType
  extends Omit<IFolderDataTypes, "parent" | "children"> {}

export interface IFolderCreateDataType
  extends Omit<IFolderDataTypes, "id" | "children"> {}
