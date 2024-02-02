import { Column, Model, Table, PrimaryKey, Unique, HasMany } from 'sequelize-typescript';
import { DataTypes,  } from 'sequelize';
import { Books } from 'src/books/models/book.model';
import { BookSubscription } from 'src/bookSubscription/models/book-subscription.model';


@Table({
    tableName: 'student',
    timestamps: true,
    paranoid: true,
    underscored: true
})
export class Student extends Model{

    @PrimaryKey
    @Column({
        type: DataTypes.BIGINT,
        autoIncrement: true,
        field: 'id'
    })
    id: number

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name'
    })
    name: string;

    @Unique
    @Column({ 
        allowNull: false,
        field: 'email'
    })
    email: string;

    @Column({
        allowNull: false,
        field: 'password'
    })
    password: string;

    @HasMany(() => Books)
    books: Books[];

    @HasMany(() => BookSubscription)
    bookSubscription: BookSubscription[];
}

