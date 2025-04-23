import {
  Table,
  Model,
  DataType,
  Column,
  BeforeUpdate,
  BeforeCreate,
} from "sequelize-typescript";
import bcrypt from "bcryptjs";

@Table({ tableName: "users" })
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({ type: DataType.STRING(191), allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
}
