import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
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
    getRecords(
    ) {
        return this.recordService.getRecords()
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Put()
    update(
        @Body() dto: UpdateRecordDTO
    ) { }




}
