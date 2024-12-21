import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

// @Entity({ name: 'files' })
@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 's3_key', type: 'jsonb' })
  public s3Key: string;

  @Column({ type: 'jsonb' })
  public bucket: string;

  @Column({ type: 'jsonb' })
  public mime: string;

  @Column({ nullable: true, type: 'text' })
  public comment: string;

//   @CreateDateColumn({ name: 'created_at' })
//   public createdAt: Date;

//   @UpdateDateColumn({ name: 'updated_at' })
//   public updatedAt: Date;
}
