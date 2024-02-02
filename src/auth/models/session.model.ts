import { Column, Model, Table, PrimaryKey, Unique, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Student } from 'src/student/models/student.model';
import { sessionStatus } from '../enums/session.enum';


@Table({
    tableName: 'session',
    timestamps: true,
    paranoid: true,
    underscored: true,
})
export class Session extends Model{

    @PrimaryKey
    @Column({
        type: DataTypes.UUID
    })
    sessionId: string

    @Column({
        type: DataTypes.ENUM(...Object.values(sessionStatus)),
        defaultValue: sessionStatus.ACTIVE
    })
    status: sessionStatus

    @Column({
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'studentId',
    })
    studentId: number

    @BelongsTo(() => Student,{
        as: 'student',
        foreignKey : {
            name: 'studentId'
        }
    })
    student: Student

}

