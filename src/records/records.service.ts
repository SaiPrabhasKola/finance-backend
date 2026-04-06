import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecordDto } from './dtos/create-record.dto';
import { UpdateRecordDTO } from './dtos/update-record.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class RecordsService {
    constructor(private prisma: PrismaService) { }

    async createRecord(dto: CreateRecordDto, user: any) {
        try {
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
            throw error
        }

    }

    async getRecords(query: any) {
        const {
            type,
            category,
            search,
            startDate,
            endDate,
            page = 1,
            limit = 10,
        } = query;

        return this.prisma.record.findMany({
            where: {
                type: type || undefined,
                category: category || undefined,

                ...(startDate && endDate && {
                    date: {
                        gte: new Date(startDate),
                        lte: new Date(endDate),
                    }
                }),

                ...(search && {
                    OR: [
                        {
                            category: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            note: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                    ],
                }),
            },

            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit),

            orderBy: {
                date: 'desc',
            },
        });
    }

    async patchRecords(id: string, dto: UpdateRecordDTO) {
        try {
            return await this.prisma.record.update({
                where: { id },
                data: {
                    ...dto,
                    date: dto.date ? new Date(dto.date) : undefined,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') throw new NotFoundException('record not found')
            }
            throw error
        }
    }

    async deleteRecord(id: string) {
        try {
            return this.prisma.record.delete({
                where: { id },
            });

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') throw new NotFoundException('record not found')
            }
            throw error
        }
    }

    async getSummary() {
        try {
            const result = await this.prisma.record.groupBy({
                by: ['type'],
                _sum: {
                    amount: true,
                },
            });

            let income = 0;
            let expense = 0;

            result.forEach((r) => {
                if (r.type === 'income') income = r._sum.amount || 0;
                if (r.type === 'expense') expense = r._sum.amount || 0;
            });

            return {
                totalIncome: income,
                totalExpense: expense,
                netBalance: income - expense,
            };

        } catch (error) {
            throw error
        }
    }

    async categoryBreakdown() {
        try {
            return this.prisma.record.groupBy({
                by: ['category'],
                _sum: {
                    amount: true,
                },
            });

        } catch (error) {
            throw error
        }
    }

    async recentActivity() {
        try {
            return this.prisma.record.findMany({
                orderBy: {
                    date: 'desc',
                },
                take: 5,
            });
        } catch (error) {
            throw error
        }
    }

    async monthlyTrends() {
        try {
            return this.prisma.$queryRaw`
                SELECT DATE_TRUNC('month', date) as month,
                SUM(amount) as total
                FROM "Record"
                GROUP BY month
                ORDER BY month;
                `;
        } catch (error) {
            throw error
        }
    }
}
