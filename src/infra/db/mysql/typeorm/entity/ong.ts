import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('ong')
export class Ong {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  whatsapp: string

  @Column()
  city: string

  @Column()
  uf: string
}
