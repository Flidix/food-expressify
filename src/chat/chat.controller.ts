import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/create-chat.dto'

@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}
}
