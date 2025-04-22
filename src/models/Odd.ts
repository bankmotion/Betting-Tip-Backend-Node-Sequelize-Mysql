import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "odds" })
export class Odd extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  fixtureId!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  bookmakerId!: number;

  // 1. Match result(1X2)
  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  matchWinner_1_home!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  matchWinner_1_draw!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  matchWinner_1_away!: number;

  // 2. Double Chance (1X, X2, 12)
  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  doubleChance_12_1x!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  doubleChance_12_x2!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  doubleChance_12_12!: number;

  // 3. Over/Under Total Goals (1.5, 2.5, 3.5)
  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  goalsOverUnder_5_over1_5!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  goalsOverUnder_5_under1_5!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  goalsOverUnder_5_over2_5!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  goalsOverUnder_5_under2_5!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  goalsOverUnder_5_over3_5!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  goalsOverUnder_5_under3_5!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  goalsOverUnder_5_over0_5!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  goalsOverUnder_5_under0_5!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  goalsOverUnder_5_over4_5!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  goalsOverUnder_5_under4_5!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  goalsOverUnder_5_over5_5!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  goalsOverUnder_5_under5_5!: number;

  // 4. Both Teams to Score (BTTS)

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  bothTeamsScore_8_yes!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  bothTeamsScore_8_no!: number;

  // 5. Team Total Goals Over 1,5

  // 6. Handicap (Asian/European)
  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  handicapResult_9_homePlus2!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  handicapResult_9_drawPlus2!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  handicapResult_9_awayPlus2!: number;

  // 7. Goal in Both Halves (Any Team) 113

  // 8. Half-Time / Full-Time (HT/FT – 1/1 or 2/2 only)
  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  htFtDouble_7_homeDraw!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  htFtDouble_7_homeAway!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  htFtDouble_7_drawAway!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  htFtDouble_7_drawDraw!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  htFtDouble_7_homeHome!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  htFtDouble_7_drawHome!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  htFtDouble_7_awayHome!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  htFtDouble_7_awayDraw!: number;

  @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
  htFtDouble_7_awayAway!: number;
}
