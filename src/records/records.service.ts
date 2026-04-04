import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecordDto } from './dtos/create-record.dto';

@Injectable()
export class RecordsService {
    constructor(private prisma: PrismaService) { }

    async createRecord(dto: CreateRecordDto, user: any) {
        try {
            console.log(dto)
            console.log(user)
            return await this.prisma.record.create({
                data: {
                    amount: dto.amount,
                    type: dto.type,
                    category: dto.category,
                    date: new Date(),
                    note: dto.note,
                    createdBy: user.id,

                }
            })
        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async getRecords() {
        return await this.prisma.record.findMany({
            orderBy: { date: 'desc' }
        })

    }
}
