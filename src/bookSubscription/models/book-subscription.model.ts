import { DataTypes } from 'sequelize';
import { Column, Model, Table, PrimaryKey, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Books } from 'src/books/models/book.model';
import { Student } from 'src/student/models/student.model';


@Table({
    tableName: 'book_subscription',
    paranoid: true,
    underscored: true,
    timestamps: true,
    indexes: [{
        fields: ['bookId', 'studentId']
    },{
        fields: ['studentId', 'bookId']
    }]
})
export class BookSubscription extends Model {

    @PrimaryKey
    @Column({
        autoIncrement: true,
        field: 'subscriptionId'
    })
    susbsciptionId: number

    @ForeignKey(() => Books)
    @Column({
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'bookId',
    })
    bookId: number

    @BelongsTo(() => Books,{
        as: 'book',
        foreignKey: 'bookId'
    })
    book: Books

    @ForeignKey(() => Student)
    @Column({
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'studentId',
    })
    studentId: number

    @BelongsTo(() => Student,{
        as: 'student',
        foreignKey: 'studentId'
    })
    student: Student

    @Column({
        type: DataTypes.DATE,
        allowNull: true,
        field: 'dueDate'
    })
    dueDate: string
}