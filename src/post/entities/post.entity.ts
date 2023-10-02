import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;
}
