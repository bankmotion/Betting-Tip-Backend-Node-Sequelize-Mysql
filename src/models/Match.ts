import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { MatchStatus } from "../const/match.const";
import { League } from "./League";
import { Odd } from "./Odd";
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

  @BelongsTo(() => Team, { as: "homeTeam", foreignKey: "homeTeamId" })
  homeTeam!: Team;

  @ForeignKey(() => Team)
  @Column({ type: DataType.INTEGER, allowNull: false })
  awayTeamId!: number;

  @BelongsTo(() => Team, { as: "awayTeam", foreignKey: "awayTeamId" })
  awayTeam!: Team;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  matchTimestamp!: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  dataUpdateTimestamp!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: MatchStatus.Upcoming,
  })
  matchStatus!: string;

  @HasMany(() => Odd, { foreignKey: "matchId" })
  odds!: Odd[];
}
