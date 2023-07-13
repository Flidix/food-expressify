import { IsEmail, MinLength, IsString, IsPhoneNumber, IsBoolean } from 'class-validator'
import { Column } from 'typeorm'

export class AuthDto {
	@IsEmail()
	email:string
	@MinLength(6, {
		message: 'неменше 6 символів'
	})
	@IsString()
	password:string

	@IsString()
	name:string

	@IsPhoneNumber()
	telephoneNumber: string


}
