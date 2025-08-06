import { Body, Controller, Post } from '@nestjs/common';
import {
  JoinUsFormDto,
  WaitListFormDto,
  VisitorMessageDto,
} from './dto/forms.dto';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}
  @Post('join-us')
  createJoinUs(@Body() dto: JoinUsFormDto) {
    return this.service.createJoinUsForm(dto);
  }

  @Post('waitlist')
  createWaitList(@Body() dto: WaitListFormDto) {
    return this.service.createWaitListForm(dto);
  }

  @Post('get-in-touch')
  createVisitorMessage(@Body() dto: VisitorMessageDto) {
    return this.service.createVisitorMessage(dto);
  }
}
