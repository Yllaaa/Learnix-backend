import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import {
  JoinUsFormDto,
  VisitorMessageDto,
  WaitListFormDto,
} from './dto/forms.dto';
import { joinUsForm, waitListForm } from '../drizzle/schemas/contact/forms';
import { vistorMessages } from '../drizzle/schemas/contact/vistors-messages';
@Injectable()
export class ContactRepository {
  constructor(private readonly drizzleService: DrizzleService) {}
  async createJoinUsForm(dto: JoinUsFormDto) {
    const [record] = await this.drizzleService.db
      .insert(joinUsForm)
      .values({
        email: dto.email,
      })
      .returning();
    return record;
  }

  async createWaitListForm(dto: WaitListFormDto) {
    const [record] = await this.drizzleService.db
      .insert(waitListForm)
      .values({
        email: dto.email,
      })
      .returning();
    return record;
  }

  async createVisitorMessage(dto: VisitorMessageDto) {
    const [record] = await this.drizzleService.db
      .insert(vistorMessages)
      .values({
        name: dto.name,
        email: dto.email,
        subject: dto.subject,
        message: dto.message,
      })
      .returning();
    return record;
  }
}
