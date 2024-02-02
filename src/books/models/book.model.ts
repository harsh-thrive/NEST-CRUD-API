import { Column, Model, Table, PrimaryKey, Unique, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Student } from 'src/student/models/student.model';
import { BookSubscription } from 'src/bookSubscription/models/book-subscription.model';


@Table({
    tableName: 'books',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [{
        fields: ['authorId', 'id'], 
    }]
})
export class Books extends Model{

    @PrimaryKey
    @Column({
        type: DataTypes.BIGINT,
        autoIncrement: true
    })
    id: number

    @Unique
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name'
    })
    name: string;

    @Column({
        type: DataTypes.TEXT,
        field: 'content'
    })
    content: string

    @ForeignKey(() => Student)
    @Column({
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'authorId',
    })
    authorId: number

    @BelongsTo(() => Student,{
        as: 'student',
        foreignKey: 'authorId'
    })
    student: Student

    @HasMany(() => BookSubscription)
    bookSubscription: BookSubscription[];
}

