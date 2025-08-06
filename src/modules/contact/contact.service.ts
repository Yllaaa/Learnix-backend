import { Injectable } from '@nestjs/common';
import { ContactRepository } from './contact.repository';
import {
  JoinUsFormDto,
  WaitListFormDto,
  VisitorMessageDto,
} from './dto/forms.dto';

@Injectable()
export class ContactService {
  constructor(private readonly repo: ContactRepository) {}
  createJoinUsForm(dto: JoinUsFormDto) {
    return this.repo.createJoinUsForm(dto);
  }

  createWaitListForm(dto: WaitListFormDto) {
    return this.repo.createWaitListForm(dto);
  }

  createVisitorMessage(dto: VisitorMessageDto) {
    return this.repo.createVisitorMessage(dto);
  }
}
