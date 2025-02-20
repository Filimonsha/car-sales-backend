import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    level: string; // Уровень лога (info, error, warn и т.д.)

    @Column("varchar")
    message: string; // Сообщение лога

    @Column({type: "varchar", nullable: true})
    context?: string; // Дополнительный контекст (например, тело запроса)

    @CreateDateColumn()
    timestamp: Date; // Время создания лога
}