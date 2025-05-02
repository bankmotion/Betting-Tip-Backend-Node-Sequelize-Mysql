import {
  Table,
  Model,
  DataType,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Country } from "./Country";
import { Match } from "./Match";

@Table({ tableName: "leagues" })
export class League extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  leagueId!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  season!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  logo!: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isActive!: boolean;

  // define foreign key relationship with the country model
  @ForeignKey(() => Country)
  @Column({ type: DataType.INTEGER, allowNull: false })
  countryId!: number;

  @BelongsTo(() => Country)
  country!: Country;

  @HasMany(() => Match)
  matches!: Match[];
}
