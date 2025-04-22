import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { League } from "./League";
import { Match } from "./Match";

@Table({ tableName: "teams" })
export class Team extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  teamId!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  logo!: string;

  @HasMany(() => Match)
  matches!: Match[];
}
