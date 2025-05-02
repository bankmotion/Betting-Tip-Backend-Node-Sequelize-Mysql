import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Match } from "./Match";

@Table({ tableName: "odds" })
export class Odd extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  fixtureId!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  dataUpdateTimestamp!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  betType!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  betSubType!: number;

  @Column({ type: DataType.JSON, allowNull: false, defaultValue: [] })
  odds!: number[];

  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
  probability!: number;

  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
  roi!: number;

  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
  ev!: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  tipValid!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isReadyPublish!: number;

  @ForeignKey(() => Match)
  @Column({ type: DataType.INTEGER, allowNull: false })
  matchId!: number;

  @BelongsTo(() => Match)
  match!: Match;
}
