import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { RecordsService } from './records.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorators';
import { CreateRecordDto } from './dtos/create-record.dto';
import { UpdateRecordDTO } from './dtos/update-record.dto';

@Controller('records')
export class RecordsController {
    constructor(private readonly recordService: RecordsService) { }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post('/create')
    createRecord(@Body() createRecordDto: CreateRecordDto, @Req() req) {
        console.log('hello')
        return this.recordService.createRecord(createRecordDto, req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    getRecords(@Query() query: any) {
        return this.recordService.getRecords(query)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Patch(':id')
    update(
        @Body() dto: UpdateRecordDTO, @Param('id') id: string
    ) {
        return this.recordService.patchRecords(id, dto)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    delete(@Param(':id') id: string) {
        return this.recordService.deleteRecord(id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.ANALYST)
    @Get('summary')
    getSummary() {
        return this.recordService.getSummary()
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('analyst', 'admin')
    @Get('category')
    category() {
        return this.recordService.categoryBreakdown();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('analyst', 'admin')
    @Get('recent')
    recent() {
        return this.recordService.recentActivity();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('analyst', 'admin')
    @Get('monthly')
    monthly() {
        return this.recordService.monthlyTrends();
    }






}
