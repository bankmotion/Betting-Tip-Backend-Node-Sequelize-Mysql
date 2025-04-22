import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { League } from "./League";

@Table({ tableName: "countries" })
export class Country extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  code!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  flag!: string;

  @HasMany(() => League)
  leagues!: League[];
}
