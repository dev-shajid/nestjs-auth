import { Role } from "src/utils/enums/role.enum";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import * as argon2 from 'argon2';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: [Role.USER], array: true, type: 'enum', enum: Role })
    roles: Role[];

    @Column({ nullable: true })
    refreshToken: string;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }
}