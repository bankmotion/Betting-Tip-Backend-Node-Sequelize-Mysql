import { Model, DataType, Column, Table } from "sequelize-typescript";

@Table({ tableName: 'settings', timestamps: false })
export class Setting extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;
  
  @Column({type: DataType.STRING})
  name!: string;

  @Column({type: DataType.STRING})
  value!: string;

  @Column({type: DataType.STRING})
  description!: string;
}