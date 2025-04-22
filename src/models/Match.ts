import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { League } from "./League";
import { Team } from "./Team";

@Table({ tableName: "matches" })
export class Match extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ type: DataType.INTEGER })
  fixtureId!: number;

  @ForeignKey(() => League)
  @Column({ type: DataType.INTEGER, allowNull: false })
  leagueId!: number;

  @BelongsTo(() => League)
  league!: League;

  @ForeignKey(() => Team)
  @Column({ type: DataType.INTEGER, allowNull: false })
  homeTeamId!: number;

  @BelongsTo(() => Team)
  homeTeam!: Team;

  @ForeignKey(() => Team)
  @Column({ type: DataType.INTEGER, allowNull: false })
  awayTeamId!: number;

  @BelongsTo(() => Team)
  awayTeam!: Team;
}
