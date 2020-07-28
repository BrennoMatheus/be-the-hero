import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('incident')
export class Incident {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  value: string

  @Column()
  ong_id: string
}
